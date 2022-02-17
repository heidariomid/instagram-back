import {gql} from 'apollo-server-express';

const typeDefs = gql`
	type Mutation {
		editPhotos(id: Int!, caption: String!): editPhotosResult
	}
	type editPhotosResult {
		isEditPhotoSuccess: Boolean!
		error: String
	}
`;

export default typeDefs;
