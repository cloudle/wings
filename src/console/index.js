import React from 'react';
import { render, Box, Color, } from 'ink';

import Provider from './components/provider';
import { connect, } from './utils';
import { appStore, } from './store';
import * as appActions from './store/appAction';

const App = (props) => {
	return <Color>something to render {props.counter}!!</Color>;
};

const ConnectedApp = connect(({ app, }) => {
	return {
		counter: app.counter,
	};
})(App);

const AppContainer = (props) => {
	return <Provider store={appStore}>
		<ConnectedApp/>
	</Provider>
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
