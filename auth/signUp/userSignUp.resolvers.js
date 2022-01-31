import client from './userSignUp.model';
const {createAccount} = client;
const resolvers = {
	Mutation: {
		createAccount: (_, args) => createAccount(args),
	},
};

export default resolvers;
