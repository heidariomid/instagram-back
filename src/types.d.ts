import {User} from '@prisma/client';
import {Request} from 'express';

type Context = {
	req: Request;
	user: User;
};

export type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
	[key: string]: {
		[key: string]: Resolver;
	};
};
