import {ApolloServer, gql} from 'apollo-server';
import {findMovies} from './script';

const typeDefs = gql`
	type Query {
		movies: [Movie]
		movie: Movie
	}
	type Movie {
		id: ID
		title: String!
	}
	type Mutation {
		addMovie(id: ID): Boolean
	}
`;

const resolvers = {
	Query: {
		movies: () => findMovies(),

		movie: () => ({id: 1, title: 'American Dreams'}),
	},
	Mutation: {
		addMovie: (_, {id}) => {
			console.log(`the id is ${id}`);
			return true;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({url}) => {
	console.log(`🚀 Server ready at ${url}`);
});
