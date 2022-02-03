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
`;

export default typeDefs;
