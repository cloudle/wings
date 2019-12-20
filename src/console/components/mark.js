import React from 'react';
import { Box, Color, Text, } from 'ink';
import { colors, consoleStrings, } from '../utils';

type Props = {
	color?: String,
};

function Mark(props: Props) {
	const { color, } = props;

	return <Color hex={color}>
		{consoleStrings.prefix}
		{consoleStrings.alias}
		{consoleStrings.suffix}
		{' '}
	</Color>;
}

Mark.defaultProps = {
	color: colors.gray,
};

export default Mark;
