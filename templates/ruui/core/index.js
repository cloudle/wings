import { AppRegistry, } from 'react-native';

import App from './App';

AppRegistry.registerComponent('app', () => App);
AppRegistry.runApplication('app', {
	initialProps: {},
	rootTag: document.getElementById('root'),
});

if (module.hot) module.hot.accept();
