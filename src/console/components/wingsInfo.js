import React from 'react';
import { Box, Color, Text, } from 'ink';

import { colors, sizes, iStyles, consoleStrings, } from '../utils';
import packageInfo from '../../../package.json';

type Props = {

};

function WingsInfo(props: Props) {
	return <Box>
		<Box {...iStyles.titleContainer}>
			<Color hex={colors.gray}>
				{/*{consoleStrings.prefix}*/}
				<Color hex={colors.purple}>wings cli</Color>
				<Color hex={colors.gray}>:</Color>
				{/*{consoleStrings.suffix}*/}
			</Color>
		</Box>
		<Box>
			<Color hex={colors.gray}>version@{packageInfo.version}</Color>
		</Box>
	</Box>;
}

export default WingsInfo;
