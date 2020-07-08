const handler = (event, context, callback) => {
	callback({
		statusCode: 200,
		body: JSON.stringify({ message: 'Hello from Lambda!!', }),
	});
};

module.exports = {
	handler,
};
