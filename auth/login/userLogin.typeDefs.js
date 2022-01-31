import {gql} from 'apollo-server';

const typeDefs = gql`
	type Mutation {
		userLogin(email: String!, password: String!): loginResult!
	}
	type loginResult {
		isLoginSuccess: Boolean!
		token: String
		error: String
		message: String
	}
`;

export default typeDefs;
