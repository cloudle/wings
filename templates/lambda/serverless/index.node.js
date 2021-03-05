import morgan from 'morgan';
import { greet, } from './src/greeting';
import configs from './lambda/configs';

global.env = Object.keys(configs).reduce((a, i) => {
	a[i] = configs[i](); return a;
}, {});

export const configureServer = (server) => {
	server.use(morgan('dev'));
	return server;
};

export const configureRouter = (server, { express, }) => {
	const { Router } = express;
	const router = new Router();

	router.get('/greeting', (req, res, next) => {
		const { statusCode, body, } = greet();

		return res.status(statusCode).send(body);
	});

	return router;
};
