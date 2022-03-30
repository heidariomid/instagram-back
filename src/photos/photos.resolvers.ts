import {resolverWrapper} from '../util/userUtil/user.util';
import client from './photos.model';
const {uploadPhoto, userPhoto, hashtagsPhoto, hashtagPhoto, searchPhotos, totalPhotos, seePhotos, likePhoto, seePhotoLikes, likes, seeFeed, isLiked, commentsNumber, isMine, comments} = client;
const resolvers = {
	Query: {
		seePhotos: resolverWrapper((_, payload, {user}) => seePhotos(user)),
		searchPhotos: resolverWrapper((_, payload) => searchPhotos(payload)),
		seePhotoLikes: (_, payload) => seePhotoLikes(payload),
		seeFeed: (_, __, {user}) => seeFeed(user),
	},
	Mutation: {
		uploadPhoto: resolverWrapper((_, payload, {user}) => uploadPhoto(payload, user)),
		likePhoto: resolverWrapper((_, payload, {user}) => likePhoto(payload, user)),
	},
	Photo: {
		user: (parent) => userPhoto(parent),
		hashtags: (parent) => hashtagsPhoto(parent),
		likes: (parent) => likes(parent),
		isLiked: (parent, _, {user}) => isLiked(parent, user),
		isMine: (parent, _, {user}) => isMine(parent, user),
		commentsNumber: (parent) => commentsNumber(parent),
		comments: (parent) => comments(parent),
	},
	Hashtag: {
		photos: (parent, payload) => hashtagPhoto(parent, payload),
		totalPhotos: (parent) => totalPhotos(parent),
	},
};

export default resolvers;
