import React from 'react';
import { render, Box, Text, Color, } from 'ink';
import Spinner from 'ink-spinner';

import Provider from './components/provider';
import Mark from './components/mark';
import { connect, } from './utils';
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
		<Box>
			<Mark/>
			<Spinner type="dots"/>
			<Color hex="#e26a72">
				{' '}counter: {counter}
			</Color>
		</Box>
		<Box>
			<Color hex="#61AEEF">ef</Color>
		</Box>
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
