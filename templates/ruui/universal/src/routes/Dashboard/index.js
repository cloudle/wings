import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

type Props = {

};

const DashboardRoute = (props: Props) => {
	return <View style={styles.container}>
		<Text>Hi, from Wings.. getting started with</Text>
		<Text>src/routes/Dashboard/index.js</Text>
	</View>;
};

export default DashboardRoute;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
