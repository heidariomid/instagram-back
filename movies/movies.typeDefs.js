import {gql} from 'apollo-server';

const typeDefs = gql`
	type Query {
		movies: [Movie]
		movie(id: Int!): Movie
	}
	type Movie {
		id: Int!
		title: String!
	}
	type Mutation {
		addMovie(title: String!): Movie
		deleteMovie(id: Int!): Movie
		updateMovie(id: Int!, title: String): Movie
	}
`;

export default typeDefs;
