import {gql} from 'apollo-server-express';

const typeDefs = gql`
	scalar Upload
	type Mutation {
		createAccount(firstName: String!, lastName: String, userName: String!, email: String!, password: String!): createAccountResult
	}
	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
	type User {
		id: Int!
		firstName: String!
		lastName: String
		userName: String!
		email: String!
		bio: String
		avatar(file: Upload!): File!
		createdAt: String!
		updatedAt: String!
		following: [User]
		followers: [User]
		totalFollowing: Int
		totalFollowers: Int
		isMe: Boolean
		isFollowing: Boolean
	}
	type createAccountResult {
		isSignUpSuccess: Boolean!
		user: User
		error: String
		message: String
	}
`;

export default typeDefs;
