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
const toggleFollowStatus = async ({userName}, user) => {
	try {
		const username = await checkUser(userName);
		if (!username) {
			return {
				message: 'something gone wrong!',
				error: 'no username exist!',
			};
		}

		const currentUser = await prisma.user.findUnique({where: {id: user.id}, include: {following: true}});
		if (currentUser.following.length > 0) {
			currentUser.following.map(async (followedUser) => {
				if (followedUser.id === username.id) {
					await prisma.user.update({
						where: {id: user.id},
						data: {
							following: {
								disconnect: {
									userName,
								},
							},
						},
					});
					return {
						isToggleSuccess: true,
						message: 'unfollow!',
					};
				}
			});
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
			isToggleSuccess: true,
			message: 'success!',
			error: null,
		};
	} catch (error) {
		return {
			isToggleSuccess: false,
			message: 'failed!',
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
	toggleFollowStatus,
	totalFollowers,
	seeFollowers,
	seeFollowing,
};
