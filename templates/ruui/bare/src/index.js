import React, { useState, } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { Button, } from 'react-universal-ui';

type Props = {

};

function App(props: Props) {
	const [counter, setCounter] = useState(1);
	const increaseCounter = () => setCounter(counter + 1);

	return <View style={styles.container}>
		<Text style={styles.headingText}>Welcome!</Text>
		<Text>Edit src/index.js to see changes</Text>
		<Button
			wrapperStyle={styles.buttonWrapper}
			onPress={increaseCounter}
			title={`Counter: [${counter}]`}/>
	</View>;
}

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headingText: {
		fontSize: 20,
		marginBottom: 10,
	},
	buttonWrapper: {
		marginTop: 10,
	},
});
