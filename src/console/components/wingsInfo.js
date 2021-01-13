import React from 'react';
import { Box, Text, } from 'ink';

import { colors, sizes, iStyles, consoleStrings, } from '../utils';
import packageInfo from '../../../package.json';

type Props = {

};

function WingsInfo(props: Props) {
	return <Box>
		<Box {...iStyles.titleContainer}>
			<Text color={colors.gray}>
				{/*{consoleStrings.prefix}*/}
				<Text color={colors.gray}>wings cli</Text>
				<Text color={colors.gray}>:</Text>
				{/*{consoleStrings.suffix}*/}
			</Text>
		</Box>
		<Box>
			<Text color={colors.purple}>version@{packageInfo.version}</Text>
		</Box>
	</Box>;
}

export default WingsInfo;
