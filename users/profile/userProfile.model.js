import {PrismaClient} from '@prisma/client';
import {hashPassword} from '../../services/hash';
import {findToken, verify} from '../../services/token';
const prisma = new PrismaClient();

const userProfile = async (userName, user) => {
	if (user) {
		return user;
	}
	return await prisma.user.findUnique({where: {userName}});
};

const updateProfile = async (payload, user) => {
	try {
		const password = payload?.password && (await hashPassword(payload?.password));
		const firstName = payload?.firstName && payload.firstName;
		const lastName = payload?.lastName && payload.lastName;
		const email = payload?.email && payload.email;
		const userName = payload?.userName && payload.userName;

		await prisma.user.update({
			where: {id: user?.id},
			data: {
				...user,
				password,
				firstName,
				lastName,
				email,
				userName,
			},
		});
		return {
			isUpdateSuccess: true,
			message: 'upadet has successfully Done!',
		};
	} catch (error) {
		return {
			isUpdateSuccess: false,
			message: 'Something has Going Wrong!!',
			error: error.message,
		};
	}
};

export default {
	userProfile,
	updateProfile,
};
