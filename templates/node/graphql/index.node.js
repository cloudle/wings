import bodyParser from 'body-parser';
import cors from 'cors';
import runGraphQl from './server/graphql';

export const configureServer = () => {

};

export const configureRouter = (server, { express, }) => {
	const { Router, } = express;
	const router = new Router();

	router.use('/graphql', cors(), bodyParser.json(), (req, res, next) => {
		const { query, variables, } = req.body;
		const user = {}; /* <- extract user's data as part of GraphQL context */

		runGraphQl(query, { user }, variables).then((result) => {
			res.json(result);
		});
	});

	return router;
};
