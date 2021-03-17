import React, { Fragment, } from 'react';
import { Provider, } from 'react-redux';
import { SafeAreaProvider, } from 'react-native-safe-area-context';

import Dashboard from 'routes/Dashboard';
import { Router, } from 'utils/router';
import { useRoutes, } from 'utils/effect';
import { store, } from 'store';

type Props = {

};

const App = (props: Props) => {
	const routedElement = useRoutes([{
		path: '/*', element: <Dashboard/>,
	}]);

	return <Fragment>
		{routedElement}
	</Fragment>;
};

const AppContainer = () => {
	return <Provider store={store}>
		<SafeAreaProvider>
			<Router>
				<App/>
			</Router>
		</SafeAreaProvider>
	</Provider>;
};

export default AppContainer;
