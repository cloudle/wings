import React, { Fragment, } from 'react';
import { Box, Text, } from 'ink';
import Spinner from 'ink-spinner';

import BuildProgress from './buildProgress';
import { colors, sizes, iStyles, consoleStrings, } from '../utils';
import type { ConsoleMessage, ServerAddress, DevProgress, } from '../typeDefinition';

type Props = {
	message?: ConsoleMessage,
	stats?: Object,
	address?: ServerAddress,
	progress?: DevProgress,
	consoles?: Array<any>,
}

function DevelopmentServer(props: Props) {
	const { message, stats, address = {}, progress, consoles, } = props;
	const progressArgs = progress?.args || [];
	const { text, color, loading, } = message;
	const buildTime = extractBuildTime(stats);
	const displayBuildTime = !loading && stats.startTime;
	const displayProgress = progress && progress.percentage !== 1;

	return <Box flexDirection="column">
		<Box>
			<Box {...iStyles.titleContainer}>
				<Text color={colors.gray}>
					Dev Server:
				</Text>
			</Box>
			{address && <Text color={colors.blue}>http://{address.host}:{address.port}</Text>}
		</Box>
		{<Box>
			<Box {...iStyles.titleContainer}>
				{progress && <BuildProgress progress={progress}/>}
			</Box>
			{loading && <Fragment>
				<Spinner type="dots"/>
				<Text> </Text>
			</Fragment>}
			<Text>
				{loading ? argsToMessage(progressArgs) : text}
			</Text>
			{displayBuildTime && <Fragment>
				<Text> after {buildTime}</Text>
				<Text color={colors.gray}>ms</Text>
			</Fragment>}
		</Box>}
	</Box>;
}

export default DevelopmentServer;

function extractBuildTime(stats) {
	return stats.endTime - stats.startTime;
}

function argsToMessage(args) {
	const mergedMessage = args.join(' ');

	if (mergedMessage.length > 50) {
		return `${mergedMessage.substring(0, 50)}...`;
	}

	return mergedMessage;
}
