import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const createComment = async ({photoId, payload}, user) => {
	const result = await prisma.photo.findUnique({
		where: {
			id: photoId,
		},
		select: {
			id: true,
		},
	});
	if (!result) {
		return {
			isCommentSuccess: false,
			error: 'Photo not found!',
		};
	}
	const commentResponse = await prisma.comment.create({
		data: {
			payload,
			photo: {
				connect: {
					id: photoId,
				},
			},
			user: {
				connect: {
					id: user?.id,
				},
			},
		},
	});
	return {
		isCommentSuccess: true,
		id: commentResponse?.id,
	};
};
const isMine = async (parent, user) => parent?.userId === user?.id;

const deleteComment = async ({id}) => {
	try {
		const comment = await prisma.comment.delete({where: {id}});
		if (!comment) {
			return {
				isCommentDeleted: false,
				error: 'no comment found!',
			};
		}
		return {isCommentDeleted: true};
	} catch (err) {
		return {
			isCommentDeleted: false,
			error: 'comment with this ID dosent exist!',
		};
	}
};

const seeComments = async ({id}, user) => {
	const comments = await prisma.comment.findMany({where: {photoId: id}});
	if (!comments) {
		return null;
	}
	return comments;
};
export default {
	createComment,
	isMine,
	seeComments,
	deleteComment,
};
