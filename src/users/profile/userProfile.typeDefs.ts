import {gql} from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		userProfile(userName: String): userProfileResult
	}
	type Mutation {
		updateProfile(firstName: String, email: String, password: String, lastName: String, userName: String, avatar: Upload, bio: String): updateProfileResult!
	}
	type updateProfileResult {
		isUpdateSuccess: Boolean!
		message: String!
		error: String
	}
	type userProfileResult {
		user: User
		isUserExist: Boolean
		message: String
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
		photos: [Photo]
		totalFollowing: Int
		totalFollowers: Int
		isMe: Boolean
		isFollowing: Boolean
	}
`;

export default typeDefs;
