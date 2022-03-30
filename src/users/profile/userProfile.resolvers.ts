import {resolverWrapper} from '../../util/userUtil/user.util';
import client from './userProfile.model';
import {GraphQLUpload} from 'graphql-upload';
const {userProfile, updateProfile, isMe, isFollowing, userPhotos, userInfo} = client;
import {Resolvers} from '../../types';
const resolvers: Resolvers = {
	Upload: GraphQLUpload,
	Query: {
		userProfile: resolverWrapper((_, payload) => userProfile(payload)),
		userInfo: resolverWrapper((_, payload, {user}) => userInfo(user)),
	},
	Mutation: {
		updateProfile: (_, payload, {user}) => updateProfile(payload, user),
	},
	User: {
		isMe: (parent, _, context) => isMe(parent, context),
		isFollowing: (parent, _, context) => isFollowing(parent, context),
		photos: (parent) => userPhotos(parent),
	},
};

export default resolvers;
