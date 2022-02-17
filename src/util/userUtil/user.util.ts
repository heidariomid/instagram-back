export const resolverWrapper = (resolver) => (root, argument, context, info) => {
	if (!context.user) {
		return {
			isUserExist: false,
			message: 'you need to login first!',
		};
	}

	return resolver(root, argument, context, info);
};
