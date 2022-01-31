import userLoginTypeDefs from './auth/login/userLogin.typeDefs';
import userLoginResolvers from './auth/login/userLogin.resolvers';
import userSignUpTypeDefs from './auth/signUp/userSignUp.typeDefs';
import userSignUpResolvers from './auth/signUp/userSignUp.resolvers';
import userProfileTypeDefs from './users/profile/userProfile.typeDefs';
import userProfileResolvers from './users/profile/userProfile.resolvers';
import {makeExecutableSchema} from '@graphql-tools/schema';

const schema = makeExecutableSchema({typeDefs: [userProfileTypeDefs, userLoginTypeDefs, userSignUpTypeDefs], resolvers: [userProfileResolvers, userLoginResolvers, userSignUpResolvers]});

export default schema;
