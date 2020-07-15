import React from 'react';
import { render, Box, Text, Color, } from 'ink';

import Provider from './components/provider';
import WingsInfo from './components/wingsInfo';
import DevelopmentServer from './components/developmentServer';
import NodeServer from './components/nodeServer';
import { connect, colors, } from './utils';
import { consoleStore, } from './store';
import { useStdout, } from './hooks';
import * as appActions from './store/appAction';

type Props = {
	counter?: Number,
	devAvailable?: Boolean,
	devMessage?: String,
	nodeAvailable?: Boolean,
	nodeMessage?: String,
	devStats?: Object,
}

const App = (props: Props) => {
	const { counter, devAvailable, devMessage, devStats, nodeAvailable, nodeMessage, } = props;
	const stdout = useStdout();

	return <Box flexDirection="column">
		<WingsInfo/>
		{nodeAvailable && <NodeServer
			message={nodeMessage}/>}
		{devAvailable && <DevelopmentServer
			message={devMessage}
			stats={devStats}/>}
		<Color hex="#e26a72">
			{counter}
		</Color>
	</Box>;
};

const ConnectedApp = connect(({ app, }) => {
	return {
		counter: app.counter,
		devAvailable: app.devAvailable,
		devMessage: app.devMessage,
		devStats: app.devStats,
		nodeAvailable: app.nodeAvailable,
		nodeMessage: app.nodeMessage,
	};
})(App);

const AppContainer = (props) => {
	return <Provider store={consoleStore}>
		<ConnectedApp/>
	</Provider>;
};

let app;

export function renderConsole() {
	if (app) {
		app.rerender();
	} else {
		app = render(<AppContainer/>, process.stdout);
	}
}

export function increase() {
	consoleStore.dispatch(appActions.increaseCounter());
}
