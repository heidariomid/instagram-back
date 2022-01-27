import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server';
import schema from './schema';
const server = new ApolloServer({schema});

server.listen().then(({url}) => {
	console.log(`🚀 Server ready at ${url} , port : ${process.env.SERVER_PORT}`);
});
