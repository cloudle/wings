import React from 'react';
import { Box, Color, Text, } from 'ink';
import { colors, sizes, consoleStrings, } from '../utils';
import packageInfo from '../../../package.json';

type Props = {

};

function WingsInfo(props: Props) {
	return <Box>
		<Box width={sizes.groupTitle}>
			<Color hex={colors.gray}>
				{consoleStrings.prefix}
				<Color hex={colors.purple}>wings@{packageInfo.version}</Color>
				{consoleStrings.suffix}
				{' '}
			</Color>
		</Box>
	</Box>;
}

export default WingsInfo;
