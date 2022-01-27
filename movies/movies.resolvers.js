import client from '../client';
const {findMovie, findMovies, addMovie, updateMovie, deleteMovie} = client;
const resolvers = {
	Query: {
		movies: () => findMovies(),
		movie: (_, {id}) => findMovie(id),
	},
	Mutation: {
		addMovie: (_, {title}) => addMovie(title),
		deleteMovie: (_, {id}) => deleteMovie(id),
		updateMovie: (_, {id, title}) => updateMovie(id, title),
	},
};

export default resolvers;
