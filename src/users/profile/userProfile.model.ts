import {PrismaClient, User} from '@prisma/client';
import {hashPassword} from '../../services/hash';
import {createWriteStream} from 'fs';
import {finished} from 'stream/promises';
import path from 'path';
import {photoUploadHandler} from '../../util/photoUtil/upload.util';
import {client} from '../../services/filesUploader';

const prisma = new PrismaClient();
const users = async ({id}) => {
	const users = await prisma.user.findMany();

	if (!users) return null;

	return users;
};
const userInfo = async ({id}) => {
	if (!id) {
		return {
			user: null,
		};
	}
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			following: true,
			followers: true,
		},
	});
	if (!user) {
		return {
			user: null,
		};
	}
	return {
		...user,
	};
};
const userProfile = async ({userName}) => {
	if (!userName) {
		return {
			isUserExist: false,
			message: 'no valid username provided!!',
			user: null,
		};
	}
	const user = await prisma.user.findUnique({
		where: {
			userName,
		},

		include: {
			following: true,
			followers: true,
		},
	});
	if (!user) {
		return {
			isUserExist: false,
			message: 'no username found!!',
			user: null,
		};
	}
	return {
		isUserExist: true,
		message: 'success!',
		user,
	};
};

const updateProfile = async (payload, user: User) => {
	try {
		const fileUpload = await photoUploadHandler(payload?.avatar, user);

		const uploadPhotoToFilestack = await client.upload(fileUpload);

		const password = payload?.password && (await hashPassword(payload?.password));
		const firstName = payload?.firstName && payload.firstName;
		const lastName = payload?.lastName && payload.lastName;
		const email = payload?.email && payload.email;
		const userName = payload?.userName && payload.userName;
		const bio = payload?.bio && payload.bio;
		const avatarUrl = payload?.avatar && uploadPhotoToFilestack;

		await prisma.user.update({
			where: {id: user?.id},
			data: {
				...user,
				password,
				firstName,
				lastName,
				email,
				userName,
				bio,
				avatar: avatarUrl?.url,
			},
		});
		return {
			isUpdateSuccess: true,
			message: 'upadet has successfully Done!',
		};
	} catch (error) {
		return {
			isUpdateSuccess: false,
			message: 'Something has Going Wrong!!',
			error: error.message,
		};
	}
};

const isMe = async ({id}, {user}) => id === user.id;
const userPhotos = async ({id}) => {
	// const photos = await prisma.user.findUnique({where: {id}}).photos();
	const photos = await prisma.photo.findMany({
		where: {
			userId: id,
		},
		orderBy: {createdAt: 'desc'},
	});
	if (!photos) return null;

	return photos;
};

const isFollowing = async ({id}, {user}) => {
	// const exsist = await prisma.user.findUnique({where: {userName: user.userName}}).following({where: {id}});
	// return exsist.length !== 0;

	const exsist = await prisma.user.count({where: {userName: user.userName, following: {some: {id}}}});
	return exsist !== 0;
};

export default {
	userProfile,
	updateProfile,
	isMe,
	isFollowing,
	userPhotos,
	userInfo,
	users,
};
