import {gql} from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		seeFollowers(userName: String!, page: Int!): seeFollowersResult!
		seeFollowing(userName: String!, cursor: Int): seeFollowingResult!
	}
	type Mutation {
		toggleFollowStatus(userName: String!): followUserResult!
	}
	type followUserResult {
		isToggleSuccess: Boolean!
		message: String!
		error: String
	}
	type seeFollowersResult {
		followers: [User]
		message: String!
		error: String
	}
	type seeFollowingResult {
		following: [User]
		message: String!
		totalFollowing: Int
		totalFollowers: Int
		error: String
	}
`;

export default typeDefs;
