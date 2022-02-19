import {PrismaClient, User} from '@prisma/client';
import {hashtagHandler} from '../util/photoUtil/photo.util';

const prisma = new PrismaClient();

const seePhotos = async (user: User) => {
	return await prisma.photo.findMany({where: {userId: user.id}});
};

const searchPhotos = async ({keyword}) => {
	return await prisma.photo.findMany({where: {caption: {startsWith: keyword}}});
};

const uploadPhoto = async ({file, caption}, user: User) => {
	let hashtagsObj = [];
	if (caption) {
		hashtagsObj = hashtagHandler(caption);
	}
	return prisma.photo.create({
		data: {
			user: {
				connect: {id: user.id},
			},
			file,
			caption,
			...(hashtagsObj.length > 0 && {
				hashtags: {
					connectOrCreate: hashtagsObj,
				},
			}),
		},
	});
};

const userPhoto = async ({userId}) => {
	return await prisma.user.findUnique({where: {id: userId}});
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
};
