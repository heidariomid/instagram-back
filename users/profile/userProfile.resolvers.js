import {resolverWrapper} from '../../util/userUtil/user.util';
import client from './userProfile.model';
import {GraphQLUpload} from 'graphql-upload';
const {userProfile, updateProfile, isMe, isFollowing} = client;
const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		userProfile: resolverWrapper((_, payload) => userProfile(payload)),
	},
	Mutation: {
		updateProfile: (_, payload, {user}) => updateProfile(payload, user),
	},
	User: {
		isMe: (root, _, context) => isMe(root, context),
		isFollowing: (root, _, context) => isFollowing(root, context),
	},
};

export default resolvers;
