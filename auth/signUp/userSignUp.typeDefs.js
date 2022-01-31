import {gql} from 'apollo-server';

const typeDefs = gql`
	type Mutation {
		createAccount(firstName: String!, lastName: String, userName: String!, email: String!, password: String!): User
	}
	type User {
		id: Int!
		firstName: String!
		lastName: String
		userName: String!
		email: String!
		createdAt: String!
		updatedAt: String!
	}
`;

export default typeDefs;
