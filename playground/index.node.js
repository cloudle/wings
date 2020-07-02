console.log('this is Node!');

module.exports = {
	configure: (server, express) => {
		server.use('/api', (req, res) => {
			res.json({ message: 'hello' });
		});
	},
};