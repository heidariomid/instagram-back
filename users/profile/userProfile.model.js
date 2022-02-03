import {PrismaClient} from '@prisma/client';
import {hashPassword} from '../../services/hash';
import {createWriteStream} from 'fs';
import {finished} from 'stream/promises';

const prisma = new PrismaClient();

const userProfile = async (user) => {
	return {
		isUserExist: true,
		message: 'athurized!',
		user,
	};
};

const updateProfile = async (payload, user) => {
	try {
		const {createReadStream, filename, mimetype, encoding} = await payload.avatar;
		const stream = createReadStream();
		const out = createWriteStream(process.cwd() + '/uploads/' + user?.id + '-' + filename);
		stream.pipe(out);
		await finished(out);
		const password = payload?.password && (await hashPassword(payload?.password));
		const firstName = payload?.firstName && payload.firstName;
		const lastName = payload?.lastName && payload.lastName;
		const email = payload?.email && payload.email;
		const userName = payload?.userName && payload.userName;
		const bio = payload?.bio && payload.bio;
		const avatar = payload?.avatar && `http://localhost:4000/static/${user?.id}-${filename}`;
		await prisma.user.update({
			where: {id: user?.id},
			data: {
				...user,
				password,
				firstName,
				lastName,
				email,
				userName,
				bio,
				avatar,
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
