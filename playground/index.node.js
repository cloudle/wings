import { AppRegistry, } from 'react-native';
import reactDom from 'react-dom/server';
import App from './src';

AppRegistry.registerComponent('undefined', () => App);

export const configureServer = async (server, sharedModules) => {
	server.use('/api', (req, res) => {
		res.json({ message: 'hello!' });
	});

	return server;
};

export const configureRouter = (server, { wingsConfig, express, }) => {
	const { Router, } = express;
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const publicPath = wingsConfig.publicPath(isProduction, env) || '/';

	const router = Router();
	router.use('/ap', (req, res) => {
		res.json({ message: 'hello world!', });
	});

	router.use('*', (req, res, next) => {
		const initialProps = { ssrLocation: req.baseUrl, ssrContext: {} };
		const { element, getStyleElement, } = AppRegistry.getApplication('undefined', { initialProps, rootTag: 'root' });
		const initialHtml = reactDom.renderToString(element);
		const initialStyles = reactDom.renderToStaticMarkup(getStyleElement());

		res.render(wingsConfig.ejsTemplate, {
			ssrContext: {
				initialHtml,
				initialStyles,
				serverSide: true,
				appName: 'undefined',
				publicPath,
				buildId: 'app',
				isProduction,
			},
		});
	});

	return router;
};
