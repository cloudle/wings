import React, { Fragment, } from 'react';
import { Box, Color, Text, } from 'ink';
import Spinner from 'ink-spinner';

import BuildProgress from './buildProgress';
import { colors, sizes, iStyles, consoleStrings, } from '../utils';
import type { ConsoleMessage, ServerAddress, DevProgress, } from '../typeDefinition';

type Props = {
	message?: ConsoleMessage,
	stats?: Object,
	address?: ServerAddress,
	progress?: DevProgress,
}

function DevelopmentServer(props: Props) {
	const { message, stats, address = {}, progress, } = props;
	const { text, color, loading, } = message;
	const buildTime = extractBuildTime(stats);
	const displayBuildTime = !loading && stats.startTime;
	const displayProgress = progress && progress.percentage !== 1;

	return <Box flexDirection="column">
		<Box>
			<Box {...iStyles.titleContainer}>
				<Color hex={colors.gray}>
					Development Server:
				</Color>
			</Box>
			{address && <Color hex={colors.blue}>http://{address.host}:{address.port}</Color>}
		</Box>
		{<Box>
			<Box {...iStyles.titleContainer}>
				{progress && <BuildProgress progress={progress}/>}
			</Box>
			{loading && <Fragment>
				<Spinner type="dots"/>
				<Text> </Text>
			</Fragment>}
			<Text>{text}</Text>
			{displayBuildTime && <Fragment>
				<Text> after {buildTime}</Text>
				<Color hex={colors.gray}>ms</Color>
			</Fragment>}
		</Box>}
	</Box>;
}

export default DevelopmentServer;

function extractBuildTime(stats) {
	return stats.endTime - stats.startTime;
}
