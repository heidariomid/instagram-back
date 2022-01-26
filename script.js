import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// async function main() {
//   const allUsers = await prisma.movie.findMany({});
//   // use `console.dir` to print nested objects
//   console.dir(allUsers, { depth: null });
// }
export const findMovies = async () => {
	// await prisma.movie.create({
	// 	data: {
	// 		title: 'Death',
	// 	},
	// });

	const movies = await prisma.movie.findMany({});
	console.dir(movies, {depth: null});
	return movies;
};
