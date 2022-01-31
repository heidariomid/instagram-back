import {gql} from 'apollo-server';

const typeDefs = gql`
	type Query {
		userProfile(userName: String): User
	}
	type Mutation {
		updateProfile(firstName: String, email: String, password: String, lastName: String, userName: String): updateProfileResult!
	}

	type updateProfileResult {
		isUpdateSuccess: Boolean!
		message: String!
		error: String
	}
`;

export default typeDefs;
