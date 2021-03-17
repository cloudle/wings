import React, { useState, } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native';

type Props = {

};

function App(props: Props) {
	const [counter, setCounter] = useState(0);
	const increaseCounter = () => setCounter(counter + 1);

	return <TouchableOpacity
		style={styles.container}
		onPress={increaseCounter}>
		<Text style={styles.headingText}>
			Welcome {counter > 0 && counter}
		</Text>
		<Text>Edit src/index.js to see changes</Text>
	</TouchableOpacity>;
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
