import {gql} from 'apollo-server-express';

const typeDefs = gql`
	scalar Upload
	type Mutation {
		createAccount(firstName: String!, lastName: String, userName: String!, email: String!, password: String!): createAccountResult
	}
	type createAccountResult {
		isSignUpSuccess: Boolean!
		user: User
		error: String
		message: String
	}
`;

export default typeDefs;
