import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const checkUser = async (userName) => {
	return await prisma.user.findUnique({
		where: {userName},
		select: {id: true},
	});
};
const seeFollowing = async ({userName, cursor}) => {
	// method: cursor pagination
	try {
		const isUserNameValid = await checkUser(userName);
		if (!isUserNameValid) {
			return {
				message: 'something gone wrong!',
				error: 'no username exist!',
			};
		}

		const following = await prisma.user
			.findUnique({
				where: {userName},
			})
			.following({
				skip: cursor ? 1 : 0,
				take: 5,
				...(cursor && {cursor: {id: cursor}}),
			});
		const totalFollowers = await prisma.user.count({
			where: {following: {some: {userName}}},
		});
		return {
			following,
			totalFollowing: following.length,
			totalFollowers,
			message: 'success',
			error: null,
		};
	} catch (error) {
		return {
			message: 'something gone wrong!',
			error,
		};
	}
};
const seeFollowers = async ({userName, page}) => {
	// method: normal pagination
	try {
		const isUserNameValid = await checkUser(userName);
		if (!isUserNameValid) {
			return {
				message: 'something gone wrong!',
				error: 'no username exist!',
			};
		}
		const followers = await prisma.user
			.findUnique({
				where: {userName},
			})
			.followers({
				skip: (page - 1) * 5,
				take: 5,
			});
		return {
			followers,
			message: 'success',
			error: null,
		};
	} catch (error) {
		return {
			message: 'something gone wrong!',
			error,
		};
	}
};
const followUser = async ({userName}) => {
	try {
		const isUserNameValid = await checkUser(userName);
		if (!isUserNameValid) {
			return {
				message: 'something gone wrong!',
				error: 'no username exist!',
			};
		}
		await prisma.user.update({
			where: {id: user.id},
			data: {
				following: {
					connect: {
						userName,
					},
				},
			},
		});

		return {
			isFollowSuccess: true,
			message: 'athurized!',
			error: null,
		};
	} catch (error) {
		return {
			isFollowSuccess: false,
			message: 'unathurized!',
			error,
		};
	}
};

const totalFollowing = async ({id}) => {
	return await prisma.user.count({
		where: {followers: {some: {id}}},
	});
};

const totalFollowers = async ({id}) => {
	return await prisma.user.count({
		where: {following: {some: {id}}},
	});
};

export default {
	totalFollowing,
	followUser,
	totalFollowers,
	seeFollowers,
	seeFollowing,
};
