import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const findMovies = async () => await prisma.movie.findMany({});
const findMovie = async (id) => await prisma.movie.findUnique({where: {id}});
const deleteMovie = async (id) => await prisma.movie.delete({where: {id}});
const updateMovie = async (id, title) => await prisma.movie.update({where: {id}, data: {title}});

const addMovie = async (title) =>
	await prisma.movie.create({
		data: {
			title,
		},
	});

export default {
	findMovies,
	findMovie,
	deleteMovie,
	updateMovie,
	addMovie,
};
