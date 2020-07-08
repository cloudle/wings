const { handler, } = require('./lambda');

const configureServer = async () => {

};

const configureRouter = (server, { express, }) => {
	const { Router } = express;
	const router = new Router();

	router.use('/lambda', (req, res, next) => {
		const lambdaContext = { };
		const lambdaEvent = {
			body: { },
		};

		handler(lambdaEvent, lambdaContext, ({ statusCode, body }) => {
			const response = JSON.parse(body);
			res.status(statusCode).json(response);
		});
	});

	return router;
};

module.exports = {
	configureServer,
	configureRouter,
};
