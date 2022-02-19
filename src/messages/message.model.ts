import {PrismaClient} from '@prisma/client';
import pubSub from '../pubSub';
import {withFilter} from 'graphql-subscriptions';
const prisma = new PrismaClient();

const seeRooms = async ({id}) => {
	return await prisma.room.findMany({
		where: {
			users: {some: {id}},
		},
	});
};
const seeRoom = async (payload, {id}) => {
	return await prisma.room.findFirst({
		where: {
			id: payload.roomId,
			users: {
				some: {id},
			},
		},
	});
};
const sendMessage = async (payload, {id}) => {
	let room = null;
	if (payload.userId) {
		const user = await prisma.user.findUnique({
			where: {id: payload.userId},
			select: {id: true},
		});

		if (!user) {
			return {
				isMessageSend: false,
				error: 'no user founded',
			};
		}
		room = await prisma.room.create({
			data: {
				users: {
					connect: [{id: payload.userId}, {id}],
				},
			},
		});
	} else if (payload.roomId) {
		room = await prisma.room.findUnique({
			where: {id: payload.roomId},
			select: {id: true},
		});
		if (!room) {
			return {
				isMessageSend: false,
				error: 'no room founded',
			};
		}
	}
	const message = await prisma.message.create({
		data: {
			payload: payload.message,
			room: {
				connect: {id: room?.id},
			},
			user: {
				connect: {id},
			},
		},
	});
	pubSub.publish('NEW_MESSAGE', {
		roomUpdates: {...message},
	});

	return {
		isMessageSend: true,
	};
};
const roomUsers = async ({id}) => {
	return await prisma.room
		.findUnique({
			where: {
				id,
			},
		})
		.users();
};
const roomMessages = async ({id}) => {
	return await prisma.message.findMany({
		where: {
			roomId: id,
		},
	});
};
const unreadMessages = async ({id}, user) => {
	if (!user) {
		return 0;
	}
	return await prisma.message.count({
		where: {
			read: false,
			roomId: id,
			user: {id: {not: user.id}},
		},
	});
};
const readMessage = async ({id}, user) => {
	const message = await prisma.message.findFirst({
		where: {
			id,
			userId: {not: user.id},
			room: {users: {some: {id: user.id}}},
		},
		select: {id: true},
	});
	if (!message) {
		return {
			isMessageSend: false,
			error: 'no message found',
		};
	}
	await prisma.message.update({
		where: {id},
		data: {read: true},
	});
	return {
		isMessageSend: true,
	};
};
const messagesRoom = async ({id}) => {
	return await prisma.message.findUnique({where: {id}}).room();
};
const messagesUser = async ({id}) => {
	return await prisma.message.findUnique({where: {id}}).user();
};
const roomUpdatesHandler = async (parent, payload, context, info) => {
	const room = await prisma.room.findFirst({where: {id: payload.id, users: {some: {id: context.user.id}}}, select: {id: true}});
	if (!room) {
		throw new Error('you are not allowed!');
	}
	return withFilter(
		() => pubSub.asyncIterator('NEW_MESSAGE'),
		({roomUpdates}, {id}) => {
			const {roomId} = roomUpdates;
			return roomId === id;
		},
	)(parent, payload, context, info);
};
export default {
	seeRooms,
	seeRoom,
	sendMessage,
	roomUsers,
	roomMessages,
	unreadMessages,
	readMessage,
	messagesRoom,
	messagesUser,
	roomUpdatesHandler,
};
