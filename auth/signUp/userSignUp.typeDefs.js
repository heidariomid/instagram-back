import {gql} from 'apollo-server-express';

const typeDefs = gql`
	scalar Upload
	type Mutation {
		createAccount(firstName: String!, lastName: String, userName: String!, email: String!, password: String!): User
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
		# singleUpload(file: Upload!): File!
	}
`;

export default typeDefs;
