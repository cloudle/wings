import { ApolloServer, } from 'apollo-server-express';
import morgan from 'morgan';
import { addAliases, } from 'module-alias';
import configs from './lambda/configs';

addAliases({
	'apollo-server-lambda': 'apollo-server-express',
});

global.env = Object.keys(configs).reduce((a, i) => {
	a[i] = configs[i](); return a;
}, {});

const { apolloConfigs, } = require('./src/graphql');

export const configureServer = (server) => {
	server.use(morgan('dev'));
	return server;
};

export const configureRouter = (server, { express, }) => {
	const { Router } = express;
	const router = new Router();
	const apolloServer = new ApolloServer(apolloConfigs);

	apolloServer.applyMiddleware({
		app: router,
		path: '/graphql',
		cors: {
			origin: '*',
			credentials: true,
		},
	});

	return router;
};
