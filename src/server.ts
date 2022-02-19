import * as dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server-express';
import {typeDefs, resolvers} from './schema';
import {fetchUser} from './services/fetchUser';
import express, {Express} from 'express';
import middlewares from './middlewares';
import {createServer} from 'http';
import {execute, subscribe} from 'graphql';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {makeExecutableSchema} from '@graphql-tools/schema';

async function startServer() {
	const schema = makeExecutableSchema({typeDefs, resolvers});
	const server = new ApolloServer({
		schema,
		context: async (context) => {
			return {
				req: context.req,
				user: await fetchUser(context.req?.headers?.authorization),
			};
		},

		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	});

	await server.start();
	const app: Express = express();
	const httpServer = createServer(app);
	middlewares(app);
	server.applyMiddleware({app});

	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
			async onConnect({Authorization}) {
				if (Authorization) {
					const user = await fetchUser(Authorization);
					return {user};
				}
				throw new Error('Missing auth token!');
			},
		},
		{
			server: httpServer,
			path: '/graphql',
		},
	);

	await new Promise((r: any) => httpServer.listen({port: 4000}, r));

	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
