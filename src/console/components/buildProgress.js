import React from 'react';
import { Box, Color, Text, } from 'ink';

import { colors, sizes, } from '../utils';
import type { DevProgress, } from '../typeDefinition';

type Props = {
	progress?: DevProgress,
};

function BuildProgress(props: Props) {
	const { progress, } = props;
	const { percentage, message, args, } = progress;
	const barColor = percentage === 1 ? colors.gray : colors.white;
	const progressColor = percentage === 1 ? colors.gray : colors.green;
	const percentageDisplay = Math.round(percentage * 100);
	const actualLength = Math.round(progressLength * percentage);
	const progressBlocks = [];

	for (let i = 0; i < progressLength; i += 1) {
		// const blockDisplay = i > actualLength ? terminals.remaining : terminals.complete;
		const blockColor = i > actualLength ? colors.gray : progressColor;
		progressBlocks.push(<Text key={i} color={blockColor}>{terminals.complete}</Text>);
	}

	return <Box>
		<Text color={barColor}>
			<Text>{terminals.prefix}</Text>
			<Text color={colors.gray}>
				{progressBlocks}
			</Text>
			<Text>{terminals.suffix}</Text>
			<Text> </Text>
		</Text>
		{/*<Color color={colors.gray}> {percentageDisplay}%</Color>*/}
	</Box>;
}

export default BuildProgress;

const defaultTerminalTheme = {
	prefix: '[',
	suffix: ']',
	complete: '#',
	remaining: '-',
};

const darwinTerminalTheme = {
	prefix: '｢',
	suffix: '｣',
	complete: '#',
	remaining: '-',
};

const progressLength = sizes.groupTitle - 6;
const terminals = process.platform === 'darwin' ? darwinTerminalTheme : defaultTerminalTheme;
