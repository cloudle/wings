export const configureServer = async (server, express) => {
	server.use('/api', (req, res) => {
		res.json({ message: 'hello!' });
	});

	return server;
};

export const configureRouter = (server, express) => {
	const { Router, } = express;

	const router = Router();
	router.use('/ap', (req, res) => {
		res.json({ message: 'hello world!!', });
	});

	return router;
};