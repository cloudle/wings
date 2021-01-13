import React, { Fragment, } from 'react';
import { Box, Text, } from 'ink';
import Spinner from 'ink-spinner';

import { sizes, colors, iStyles, } from '../utils';
import type { ConsoleMessage, ServerAddress, } from '../typeDefinition';

type Props = {
	message?: ConsoleMessage,
	address?: ServerAddress,
	hotUpdate?: Object,
	consoles?: Array<any>,
};

function NodeServer(props: Props) {
	const { address, hotUpdate, consoles, } = props;

	return <Box flexDirection="column">
		<Box>
			<Box {...iStyles.titleContainer}>
				<Text color={colors.gray}>
					Node Server:
				</Text>
			</Box>
			<Box>
				{address
					? <Text color={colors.blue}>http://{address.host}:{address.port}</Text>
					: <Fragment>
						<Spinner/>
						<Text> Launching..</Text>
					</Fragment>}
			</Box>
		</Box>
		{hotUpdate && <Box>
			<Box {...iStyles.titleContainer}/>
			{hotUpdate && <Box>
				<Text>Hot reloaded </Text>
				<Text color={colors.gray}>{hotUpdate.filename}</Text>
			</Box>}
		</Box>}
		{consoles.length > 0 && <Box>
			<Box {...iStyles.titleContainer}/>
			<Box flexDirection="column" flexGrow={1}>
				{consoles.map((item, i) => <Text key={i}>{item.join(' ')}</Text>)}
			</Box>
		</Box>}
	</Box>;
}

export default NodeServer;
