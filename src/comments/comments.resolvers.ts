import {resolverWrapper} from '../util/userUtil/user.util';
import client from './comments.model';
const {createComment, isMine, seeComments, deleteComment} = client;
const resolvers = {
	Query: {
		seeComments: resolverWrapper((_, payload, {user}) => seeComments(payload, user)),
	},
	Mutation: {
		createComment: resolverWrapper((_, payload, {user}) => createComment(payload, user)),
		deleteComment: resolverWrapper((_, payload) => deleteComment(payload)),
	},
	Comment: {
		isMine: (parent, _, {user}) => isMine(parent, user),
	},
};

export default resolvers;
