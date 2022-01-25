import {ApolloServer, gql} from 'apollo-server';

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
		movies: () => [],
		movie: () => ({id: 1, title: 2}),
	},
	Mutation: {
		addMovie: (_, {id}) => {
			console.log(id);
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
