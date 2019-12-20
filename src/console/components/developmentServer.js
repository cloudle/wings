import React from 'react';
import { Box, Color, Text, } from 'ink';
import Spinner from 'ink-spinner';
import { colors, sizes, consoleStrings, } from '../utils';

type Props = {

};

function DevelopmentServer(props: Props) {
	return <Box>
		<Box width={sizes.groupTitle}>
			<Color hex={colors.gray}>
				{consoleStrings.prefix}
				Development Server
				{consoleStrings.suffix}
				{' '}
			</Color>
		</Box>
		<Spinner type="dots"/>
		<Color> bundling...</Color>
	</Box>;
}

export default DevelopmentServer;
