import {findToken, verify} from './token';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const fetchUser = async (authorization) => {
	const token = findToken(authorization);

	if (!token) {
		return null;
	}
	const verification = token && verify(token);

	if (verification === null) {
		return null;
	}
	const user = await prisma?.user?.findUnique({where: {id: verification?.id}});
	if (!user) {
		return null;
	}
	return user;
};
