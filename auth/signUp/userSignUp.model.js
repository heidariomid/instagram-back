import {PrismaClient} from '@prisma/client';
import {hashPassword} from '../../services/hash';
const prisma = new PrismaClient();

const createAccount = async (args) => {
	const isUserExist = await prisma.user.findFirst({
		where: {OR: [{userName: args.userName}, {email: args.email}]},
	});
	if (isUserExist) {
		throw new Error('username or password are already exist!');
	}
	const hashPass = await hashPassword(args.password);

	return await prisma.user.create({data: {...args, password: hashPass}});
};

export default {
	createAccount,
};
