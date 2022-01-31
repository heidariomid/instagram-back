import {findToken, verify} from './token';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const fetchUser = async (req) => {
	const token = findToken(req);
	if (!token) {
		return null;
	}
	const {id} = token && verify(token);

	const user = await prisma?.user?.findUnique({where: {id}});
	return user;
};
