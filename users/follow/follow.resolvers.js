import {resolverWrapper} from '../../util/userUtil/user.util';
import client from './follow.model';
const {followUser, seeFollowers, seeFollowing, totalFollowing, totalFollowers} = client;
const resolvers = {
	Query: {
		seeFollowers: (_, payload) => seeFollowers(payload),
		seeFollowing: (_, payload) => seeFollowing(payload),
	},
	Mutation: {
		followUser: resolverWrapper((_, payload, {user}) => followUser(payload, user)),
	},
	User: {
		totalFollowing: (root) => totalFollowing(root),
		totalFollowers: (root) => totalFollowers(root),
	},
};

export default resolvers;
