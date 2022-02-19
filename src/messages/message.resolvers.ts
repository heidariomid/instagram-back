import {resolverWrapper} from '../util/userUtil/user.util';
import client from './message.model';

const {seeRooms, seeRoom, sendMessage, roomUsers, roomMessages, unreadMessages, readMessage, messagesUser, messagesRoom, roomUpdatesHandler} = client;
const resolvers = {
	Query: {
		seeRooms: resolverWrapper((_, payload, {user}) => seeRooms(user)),
		seeRoom: resolverWrapper((_, payload, {user}) => seeRoom(payload, user)),
	},
	Mutation: {
		sendMessage: resolverWrapper((_, payload, {user}) => sendMessage(payload, user)),
		readMessage: resolverWrapper((_, payload, {user}) => readMessage(payload, user)),
	},
	Room: {
		users: resolverWrapper((parent) => roomUsers(parent)),
		messages: resolverWrapper((parent) => roomMessages(parent)),
		unreadMessages: resolverWrapper((parent, _, {user}) => unreadMessages(parent, user)),
	},
	Message: {
		user: (parent) => messagesUser(parent),
		room: (parent) => messagesRoom(parent),
	},
	Subscription: {
		roomUpdates: {subscribe: (parent, payload, context, info) => roomUpdatesHandler(parent, payload, context, info)},
	},
};

export default resolvers;
