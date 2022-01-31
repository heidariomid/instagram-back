import client from './userProfile.model';
const {userProfile, updateProfile} = client;
const resolvers = {
	Query: {
		userProfile: (_, {userName}, {user}) => userProfile(userName, user),
	},
	Mutation: {
		updateProfile: (_, payload, {user}) => updateProfile(payload, user),
	},
};

export default resolvers;
