import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

type Props = {

};

function App(props: Props) {
	return <View style={styles.container}>
		<Text style={styles.headingText}>Welcome!</Text>
		<Text>Edit src/index.js to see changes</Text>
		<Text>(hot reload)</Text>
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
});
