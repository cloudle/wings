import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,} from 'react-native';
import { hot, } from 'react-hot-loader/root';

type Props = {

};

class App extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			counter: 1,
		};
	}

	render() {
		return <View style={styles.container}>
			<Text
				style={styles.counterText}
				onPress={() => this.setState({ counter: this.state.counter + 1 })}>
				App {this.state.counter} !!
			</Text>
		</View>;
	}
}

export default hot(App);

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
	},
	counterText: {
		userSelect: 'none',
	},
});
