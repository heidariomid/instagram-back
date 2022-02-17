import {PrismaClient} from '@prisma/client';
import {comparehashPassword} from '../../services/hash';
import {sign} from '../../services/token';
const prisma = new PrismaClient();

const userLogin = async (email, password) => {
	const user = await prisma.user.findUnique({where: {email}});

	if (user) {
		const checkPassword = await comparehashPassword(password, user.password);
		if (checkPassword) {
			const token = sign({id: user.id});
			return {
				isLoginSuccess: true,
				token,
				message: 'hooora!',
			};
		}
		return {
			isLoginSuccess: false,
			error: 'email or password is wrong!',
		};
	}
	return {
		isLoginSuccess: false,
		error: 'email or password is wrong!',
	};
};

export default {
	userLogin,
};
