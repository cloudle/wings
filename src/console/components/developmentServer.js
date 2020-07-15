import React, { Fragment, } from 'react';
import { Box, Color, Text, } from 'ink';
import Spinner from 'ink-spinner';

import { colors, sizes, iStyles, consoleStrings, } from '../utils';
import type { ConsoleMessage, } from '../typeDefinition';

type Props = {
	message?: ConsoleMessage,
	stats?: Object,
};

function DevelopmentServer(props: Props) {
	const { message, stats, } = props;
	const { text, color, loading, } = message;
	const buildTime = extractBuildTime(stats);
	const displayBuildTime = !loading && stats.startTime;

	return <Box>
		<Box {...iStyles.titleContainer}>
			<Color hex={colors.gray}>
				Development Server:
			</Color>
		</Box>
		{loading && <Fragment>
			<Spinner type="dots"/>
			<Color> </Color>
		</Fragment>}
		<Color>{text}</Color>
		{displayBuildTime && <Fragment>
			<Color> after {buildTime}</Color>
			<Color hex={colors.gray}>ms</Color>
		</Fragment>}
	</Box>;
}

export default DevelopmentServer;

function extractBuildTime(stats) {
	return stats.endTime - stats.startTime;
}
