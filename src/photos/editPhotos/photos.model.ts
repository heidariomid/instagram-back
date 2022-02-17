import {PrismaClient, User} from '@prisma/client';
import {hashtagHandler} from '../../util/photoUtil/photo.util';

const prisma = new PrismaClient();

const editPhotos = async ({id, caption}, user: User) => {
	const photo = await prisma.photo.findFirst({where: {id, userId: user.id}, include: {hashtags: {select: {hashtag: true}}}});
	if (!photo) {
		return {
			isEditPhotoSuccess: false,
			error: 'photo not found!',
		};
	}
	await prisma.photo.update({where: {id}, data: {caption, hashtags: {disconnect: photo.hashtags, connectOrCreate: hashtagHandler(caption)}}});
	return {
		isEditPhotoSuccess: true,
		error: null,
	};
};

export default {
	editPhotos,
};
//
