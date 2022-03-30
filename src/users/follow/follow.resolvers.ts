import {resolverWrapper} from '../../util/userUtil/user.util';
import client from './follow.model';
const {toggleFollowStatus, seeFollowers, seeFollowing, totalFollowing, totalFollowers} = client;
const resolvers = {
	Query: {
		seeFollowers: (_, payload) => seeFollowers(payload),
		seeFollowing: (_, payload) => seeFollowing(payload),
	},
	Mutation: {
		toggleFollowStatus: resolverWrapper((_, payload, {user}) => toggleFollowStatus(payload, user)),
	},
	User: {
		totalFollowing: (root) => totalFollowing(root),
		totalFollowers: (root) => totalFollowers(root),
	},
};

export default resolvers;
