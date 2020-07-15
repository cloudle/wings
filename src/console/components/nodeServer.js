import React from 'react';
import { Box, Color, } from 'ink';

import { sizes, colors, iStyles, } from '../utils';
import type { ConsoleMessage, } from '../typeDefinition';

type Props = {
	message?: ConsoleMessage,
};

function NodeServer(props: Props) {
	return <Box>
		<Box {...iStyles.titleContainer}>
			<Color hex={colors.gray}>
				Node Server:
			</Color>
		</Box>
		<Box>
			<Color>Hello</Color>
		</Box>
	</Box>;
}

export default NodeServer;
