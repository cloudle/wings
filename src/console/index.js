import React, { useEffect, } from 'react';
import { render, Box, Text, Color, useInput, } from 'ink';

import Provider from './components/provider';
import WingsInfo from './components/wingsInfo';
import DevelopmentServer from './components/developmentServer';
import NodeServer from './components/nodeServer';
import { connect, colors, } from './utils';
import { consoleStore, } from './store';
import * as consoleActions from './store/appAction';
import type { ServerAddress, DevProgress, } from './typeDefinition';

type Props = {
	counter?: Number,
	dev?: {
		available?: Boolean,
		message?: Object,
		stats?: Object,
		address?: ServerAddress,
		progress?: DevProgress,
		consoles?: Array<any>,
	},
	node?: {
		available?: Boolean,
		message?: Object,
		address?: ServerAddress,
		hotUpdate?: Object,
		consoles?: Array<any>,
	},
}

const App = (props: Props) => {
	const { counter, dev, node, } = props;
	// const stdout = useStdout();
	useInput((input, key) => {
		if (['k'].indexOf(input) >= 0) {
			consoleStore.dispatch(consoleActions.clearDevConsole());
			consoleStore.dispatch(consoleActions.clearNodeConsole());
		}
	});

	return <Box flexDirection="column">
		<WingsInfo/>
		{dev.available && <DevelopmentServer
			message={dev.message}
			stats={dev.stats}
			address={dev.address}
			progress={dev.progress}/>}
		{node.available && <NodeServer
			message={node.message}
			address={node.address}
			hotUpdate={node.hotUpdate}
			consoles={node.consoles}/>}
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
			consoles: app.devConsole,
		},
		node: {
			available: app.nodeAvailable,
			message: app.nodeMessage,
			address: app.nodeAddress,
			hotUpdate: app.nodeHotUpdate,
			consoles: app.nodeConsole,
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
	consoleStore.dispatch(consoleActions.increaseCounter());
}
