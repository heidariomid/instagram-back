import {gql} from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		seePhotos(id: Int!): [Photo]
		searchPhotos(keyword: String!): [Photo]
		seePhotoLikes(id: Int!): [User]
		seeFeed: [Photo]
	}
	type Mutation {
		uploadPhoto(file: Upload!, caption: String!): Photo
		likePhoto(id: Int!): likePhotoResult!
	}
	type Photo {
		id: Int!
		user: User!
		file: String!
		caption: String
		hashtags: [Hashtag]
		likes: Int!
		commentsNumber: Int!
		comments: [Comment]
		isLiked: Boolean
		isMine: Boolean!
		createdAt: String!
		updatedAt: String!
	}
	type Hashtag {
		id: Int!
		hashtag: String!
		photos(page: Int!): [Photo]
		totalPhotos: Int
		createdAt: String!
		updatedAt: String!
	}
	type Like {
		id: Int!
		user: User!
		photos: Photo!
		createdAt: String!
		updatedAt: String!
	}
	type likePhotoResult {
		isLikeSuccess: Boolean!
		error: String
	}
`;

export default typeDefs;
