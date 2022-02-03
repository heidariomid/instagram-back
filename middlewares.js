import express from 'express';
import {graphqlUploadExpress} from 'graphql-upload';
const middlewares = (app) => {
	app.use(graphqlUploadExpress());
	app.use('/static', express.static('uploads'));
};

export default middlewares;
