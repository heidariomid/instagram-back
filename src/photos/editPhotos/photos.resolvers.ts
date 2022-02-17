import {resolverWrapper} from '../../util/userUtil/user.util';
import client from './photos.model';
const {editPhotos} = client;
const resolvers = {
	Mutation: {
		editPhotos: resolverWrapper((_, payload, {user}) => editPhotos(payload, user)),
	},
};

export default resolvers;
