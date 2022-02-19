import {gql} from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		seeRooms: [Room]!
		seeRoom(id: Int!): Room!
	}
	type Mutation {
		sendMessage(message: String!, roomId: Int!, userId: Int): sendMessageResult!
		readMessage(id: Int!): sendMessageResult!
	}
	type Message {
		id: Int!
		user: User!
		room: Room!
		read: Boolean!
		payload: String!
		createdAt: String!
		updatedAt: String!
	}
	type Room {
		id: Int!
		users: [User]
		messages: [Message]
		unreadMessages: Int
		createdAt: String!
		updatedAt: String!
	}
	type sendMessageResult {
		isMessageSend: Boolean!
		error: String
	}
	type Subscription {
		roomUpdates(id: Int!): Message
	}
`;

export default typeDefs;
