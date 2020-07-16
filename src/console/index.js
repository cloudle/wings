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
import type { ServerAddress, DevProgress, } from './typeDefinition';

type Props = {
	counter?: Number,
	dev?: {
		available?: Boolean,
		message?: Object,
		stats?: Object,
		address?: ServerAddress,
		progress?: DevProgress,
	},
	node?: {
		available?: Boolean,
		message?: Object,
	},
}

const App = (props: Props) => {
	const { counter, dev, node, } = props;
	const stdout = useStdout();

	return <Box flexDirection="column">
		<WingsInfo/>
		{node.available && <NodeServer
			message={node.message}/>}
		{dev.available && <DevelopmentServer
			message={dev.message}
			stats={dev.stats}
			address={dev.address}
			progress={dev.progress}/>}
		{/*<Color hex="#e26a72">*/}
		{/*	{counter}*/}
		{/*</Color>*/}
	</Box>;
};

const ConnectedApp = connect(({ app, }) => {
	return {
		counter: app.counter,
		dev: {
			available: app.devAvailable,
			message: app.devMessage,
			stats: app.devStats,
			address: app.devAddress,
			progress: app.devProgress,
		},
		node: {
			available: app.nodeAvailable,
			message: app.nodeMessage,
		},
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
