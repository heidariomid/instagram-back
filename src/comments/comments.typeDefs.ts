import {gql} from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		seeComments(id: Int!): [Comment]
	}
	type Mutation {
		createComment(photoId: Int!, payload: String!): commentResult!
		deleteComment(id: Int!): commentDeletedResult!
	}
	type Comment {
		id: Int!
		user: User!
		photo: Photo!
		payload: String
		isMine: Boolean!
		createdAt: String!
		updatedAt: String!
	}
	type commentResult {
		id: Int!
		isCommentSuccess: Boolean!
		error: String
	}
	type commentDeletedResult {
		isCommentDeleted: Boolean!
		error: String
	}
`;

export default typeDefs;
