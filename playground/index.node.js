console.log('this is Node!!');

export const configure = async (server, express) => {
	server.use('/api', (req, res) => {
		res.json({ message: 'hello!' });
	});

	return server;
};