import React, { useState, } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

type Props = {

};

const App = (props: Props) => {
	const [counter, setCounter] = useState(0);
	return <View style={styles.container}>
		<TouchableOpacity onPress={() => setCounter(counter + 1)}>
			<Text>App {counter}</Text>
		</TouchableOpacity>
	</View>;
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
