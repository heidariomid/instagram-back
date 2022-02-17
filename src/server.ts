import * as dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server-express';
import {typeDefs, resolvers} from './schema';
import {fetchUser} from './services/fetchUser';
import express, {Express} from 'express';
import middlewares from './middlewares';

async function startServer() {
	const server = new ApolloServer({
		resolvers,
		typeDefs,
		context: async ({req}) => {
			return {
				req,
				user: await fetchUser(req),
			};
		},
	});

	await server.start();

	const app: Express = express();
	middlewares(app);
	server.applyMiddleware({app});

	await new Promise((r: any) => app.listen({port: 4000}, r));

	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
