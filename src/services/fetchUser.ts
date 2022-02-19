import {findToken, verify} from './token';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const fetchUser = async (authorization) => {
	const token = findToken(authorization);
	if (!token) {
		return null;
	}
	const {id} = token && verify(token);
	const user = await prisma?.user?.findUnique({where: {id}});
	return user;
};
