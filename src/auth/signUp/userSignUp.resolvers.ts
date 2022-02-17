import client from './userSignUp.model';
const {createAccount} = client;
const resolvers = {
	Mutation: {
		createAccount: (_: any, args: any) => createAccount(args),
	},
};

export default resolvers;
