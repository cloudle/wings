import React from 'react';
import { Box, Color, Text, } from 'ink';

type Props = {
	color?: String,
};

function Mark(props: Props) {
	const { color, } = props;

	return <Color hex={color}>｢wings｣ </Color>;
}

Mark.defaultProps = {
	color: '#4f535a',
};

export default Mark;
