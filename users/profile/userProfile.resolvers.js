import {resolverWrapper} from '../../util/userUtil/user.util';
import client from './userProfile.model';
import {GraphQLUpload} from 'graphql-upload';
const {userProfile, updateProfile} = client;
const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		userProfile: resolverWrapper((_, {userName}, {user}) => userProfile(user)),
	},
	Mutation: {
		updateProfile: (_, payload, {user}) => updateProfile(payload, user),
	},
};

export default resolvers;
