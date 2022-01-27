import typeDefs from './movies/movies.typeDefs';
import resolvers from './movies/movies.resolvers';
import {makeExecutableSchema} from '@graphql-tools/schema';

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
