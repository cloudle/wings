import React from 'react';
import { Box, Color, Text, } from 'ink';
import Spinner from 'ink-spinner';

import { colors, sizes, iStyles, consoleStrings, } from '../utils';

type Props = {

};

function DevelopmentServer(props: Props) {
	return <Box>
		<Box {...iStyles.titleContainer}>
			<Color hex={colors.gray}>
				Development Server:
			</Color>
		</Box>
		<Spinner type="dots"/>
		<Color> bundling...</Color>
	</Box>;
}

export default DevelopmentServer;
