import { AppRegistry, } from 'react-native';
import reactDom from 'react-dom/server';
import { addAliases, } from 'module-alias';

import App from './src';
import { shared, node, } from './configurations/moduleAliases';

export const configureServer = async (server) => {
	addAliases({ ...shared, ...node, });
	AppRegistry.registerComponent('undefined', () => App);

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
