import jwt from 'jsonwebtoken';

export const sign = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET);
};
export const verify = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.log(error);
	}
};
export const findToken = (authorization) => {
	// const authorization = req.session.token;
	// if (!authorization) {
	// 	return false;
	// }
	// const [bearer, token] = authorization.split(' ');
	// if (!token) {
	// 	return false;
	// }
	return authorization;
};
