import {PrismaClient} from '@prisma/client';
import {hashPassword} from '../../services/hash';
const prisma = new PrismaClient();

const createAccount = async (args) => {
	try {
		const isUserExist = await prisma.user.findFirst({
			where: {OR: [{userName: args.userName}, {email: args.email}]},
		});
		if (isUserExist) {
			return {
				isSignUpSuccess: false,
				user: null,
				error: 'something gone wrong!',
				message: 'username or password are already exist!',
			};
		}

		const hashPass = await hashPassword(args.password);

		const user = await prisma.user.create({data: {...args, password: hashPass}});
		return {
			isSignUpSuccess: true,
			user,
			error: null,
			message: 'sign up was successful',
		};
	} catch (error) {
		return {
			isSignUpSuccess: false,
			user: null,
			error,
			message: 'something gone wrong!',
		};
	}
};

export default {
	createAccount,
};
