export const resolverWrapper = (resolver) => (root, argument, context, info) => {
	if (!context.user) {
		const query = info.operation.operation === 'query';
		if (query) {
			return null;
		}
		return {
			isUserExist: false,
			message: 'you need to login first!',
		};
	}

	return resolver(root, argument, context, info);
};
