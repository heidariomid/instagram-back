import client from './userLogin.model';
const {userLogin} = client;
const resolvers = {
	Mutation: {
		userLogin: (_, {email, password}) => userLogin(email, password),
	},
};

export default resolvers;
