import { AppRegistry } from 'react-native'

import App from './src'

AppRegistry.registerComponent('app', () => App)
AppRegistry.runApplication('app', {
	initialProps: {},
	rootTag: document.getElementById('root'),
})
