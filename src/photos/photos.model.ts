import {PrismaClient, User} from '@prisma/client';
import {client} from '../services/filesUploader';
import {hashtagHandler} from '../util/photoUtil/photo.util';
import {photoUploadHandler} from '../util/photoUtil/upload.util';

const prisma = new PrismaClient();

const seePhotos = async (user: User) => {
	return await prisma.photo.findMany({where: {userId: user.id}});
};

const searchPhotos = async ({keyword}) => {
	return await prisma.photo.findMany({where: {caption: {startsWith: keyword}}});
};

const uploadPhoto = async (payload, user: User) => {
	const fileUpload = await photoUploadHandler(payload?.file, user);
	const uploadPhotoToFilestack = await client.upload(fileUpload);

	let hashtagsObj = [];
	if (payload?.caption) {
		hashtagsObj = hashtagHandler(payload?.caption);
	}
	return prisma.photo.create({
		data: {
			user: {
				connect: {id: user.id},
			},
			file: uploadPhotoToFilestack?.url ? uploadPhotoToFilestack?.url : '',
			caption: payload?.caption,
			...(hashtagsObj.length > 0 && {
				hashtags: {
					connectOrCreate: hashtagsObj,
				},
			}),
		},
	});
};

const userPhoto = async ({userId}) => {
	const user = await prisma.user.findUnique({where: {id: userId}});
	return user;
};
const hashtagsPhoto = async ({id}) => {
	return await prisma.hashtag.findMany({where: {photos: {some: {id}}}});
};
const hashtagPhoto = async ({id}, {page}) => {
	return await prisma.hashtag.findUnique({where: {id}}).photos();
	// return await prisma.photo.findMany({where: {hashtags: {some: {id}}}});
};
const totalPhotos = async ({id}) => {
	return await prisma.photo.count({where: {hashtags: {some: {id}}}});
};
const likePhoto = async ({id}, user: User) => {
	const photo = await prisma.photo.findUnique({where: {id}});
	if (!photo) {
		return {
			isLikeSuccess: false,
			error: 'no photo found!',
		};
	}
	try {
		const like = await prisma.like.findUnique({
			where: {
				userId_photoId: {
					userId: user.id,
					photoId: id,
				},
			},
		});
		if (like) {
			await prisma.like.delete({
				where: {
					userId_photoId: {
						userId: user.id,
						photoId: id,
					},
				},
			});
		} else {
			await prisma.like.create({
				data: {
					user: {
						connect: {
							id: user.id,
						},
					},
					photos: {
						connect: {
							id: photo.id,
						},
					},
				},
			});
		}
		return {
			isLikeSuccess: true,
		};
	} catch (error) {
		return {
			isLikeSuccess: false,
			error,
		};
	}
};

const likes = async ({id}) => {
	return await prisma.like.count({where: {photoId: id}});
};
const seePhotoLikes = async ({id}) => {
	const likes = await prisma.like.findMany({where: {photoId: id}, select: {user: true}});
	return likes.map((like) => like.user);
};
const seeFeed = async ({id}) => {
	return await prisma.photo.findMany({
		where: {
			OR: [{user: {followers: {some: {id}}}}, {userId: id}],
		},
		orderBy: {createdAt: 'desc'},
	});
};
const isLiked = async ({id}, user) => {
	if (!user) return false;
	const isLiked = await prisma.like.findUnique({
		where: {
			userId_photoId: {
				userId: user?.id,
				photoId: id,
			},
		},
		select: {
			id: true,
		},
	});
	if (isLiked) return true;
	return false;
};
const commentsNumber = async ({id}) => {
	return await prisma.comment.count({where: {photoId: id}});
};
const comments = async ({id}) => {
	// const comments = await prisma.photo.findUnique({where: {id}}).comments();
	const comments = await prisma.comment.findMany({where: {photoId: id}, include: {user: true}});
	if (!comments) return null;
	return comments;
};

const isMine = async (parent, user) => parent?.userId === user?.id;

export default {
	seePhotos,
	uploadPhoto,
	userPhoto,
	hashtagsPhoto,
	hashtagPhoto,
	totalPhotos,
	searchPhotos,
	likePhoto,
	likes,
	seePhotoLikes,
	seeFeed,
	isLiked,
	commentsNumber,
	isMine,
	comments,
};
