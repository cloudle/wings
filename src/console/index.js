import React from 'react';
import { render, Box, Text, Color, } from 'ink';

import Provider from './components/provider';
import WingsInfo from './components/wingsInfo';
import DevelopmentServer from './components/developmentServer';
import { connect, colors, } from './utils';
import { appStore, } from './store';
import { useStdout, } from './hooks';
import * as appActions from './store/appAction';

type Props = {
	counter?: Number,
}

const App = (props: Props) => {
	const { counter, } = props,
		stdout = useStdout();

	return <Box flexDirection="column">
		<WingsInfo/>
		<DevelopmentServer/>
		<Color hex="#e26a72">
			{counter}
		</Color>
	</Box>;
};

const ConnectedApp = connect(({ app, }) => {
	return {
		counter: app.counter,
	};
})(App);

const AppContainer = (props) => {
	return <Provider store={appStore}>
		<ConnectedApp/>
	</Provider>;
};

let app;

export function update() {
	if (app) {
		app.rerender();
	} else {
		app = render(<AppContainer/>, process.stdout);
	}
}

export function increase() {
	appStore.dispatch(appActions.increaseCounter());
}
