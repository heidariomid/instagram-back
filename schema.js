import userLoginTypeDefs from './auth/login/userLogin.typeDefs';
import userLoginResolvers from './auth/login/userLogin.resolvers';
import userSignUpTypeDefs from './auth/signUp/userSignUp.typeDefs';
import userSignUpResolvers from './auth/signUp/userSignUp.resolvers';
import userProfileTypeDefs from './users/profile/userProfile.typeDefs';
import userProfileResolvers from './users/profile/userProfile.resolvers';
import followModelResolvers from './users/follow/follow.resolvers';
import followModelTypeDefs from './users/follow/follow.typeDefs';

export const typeDefs = [userProfileTypeDefs, userLoginTypeDefs, userSignUpTypeDefs, followModelTypeDefs];
export const resolvers = [userProfileResolvers, userLoginResolvers, userSignUpResolvers, followModelResolvers];
