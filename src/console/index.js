import React from 'react';
import { render, Box, Text, Color, } from 'ink';

import Provider from './components/provider';
import Mark from './components/mark';
import { connect, } from './utils';
import { appStore, } from './store';
import * as appActions from './store/appAction';

type Props = {
	counter?: Number,
}

const App = (props: Props) => {
	const { counter, } = props;

	return <Box width="100%">
		<Box flexGrow={1}>
			<Mark/>
			<Color hex="#e26a72">
				counter: {counter}
			</Color>
		</Box>
		<Box>
			<Text>Hell</Text>
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

let lastUnmount;

export function update() {
	if (lastUnmount) lastUnmount();
	const { unmount } = render(<AppContainer/>);
	lastUnmount = unmount;
}

export function increase() {
	appStore.dispatch(appActions.increaseCounter());
}
