import {resolverWrapper} from '../util/userUtil/user.util';
import client from './photos.model';
const {uploadPhoto, userPhoto, hashtagsPhoto, hashtagPhoto, searchPhotos, totalPhotos, seePhotos, likePhoto, seePhotoLikes, likes} = client;
const resolvers = {
	Query: {
		seePhotos: resolverWrapper((_, payload, {user}) => seePhotos(user)),
		searchPhotos: resolverWrapper((_, payload) => searchPhotos(payload)),
		seePhotoLikes: (_, payload) => seePhotoLikes(payload),
	},
	Mutation: {
		uploadPhoto: resolverWrapper((_, payload, {user}) => uploadPhoto(payload, user)),
		likePhoto: resolverWrapper((_, payload, {user}) => likePhoto(payload, user)),
	},
	Photo: {
		user: (parent) => userPhoto(parent),
		hashtags: (parent) => hashtagsPhoto(parent),
		likes: (parent) => likes(parent),
	},
	Hashtag: {
		photos: (parent, payload) => hashtagPhoto(parent, payload),
		totalPhotos: (parent) => totalPhotos(parent),
	},
};

export default resolvers;
