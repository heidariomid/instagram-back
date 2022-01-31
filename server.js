import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server';
import schema from './schema';
import {fetchUser} from './services/fetchUser';
const server = new ApolloServer({
	schema,
	context: async ({req}) => {
		return {
			req,
			user: await fetchUser(req),
		};
	},
});

server.listen().then(({url}) => {
	console.log(`🚀 Server ready at ${url} , port : ${process.env.SERVER_PORT}`);
});
