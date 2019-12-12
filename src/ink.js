import React, { Component } from 'react';
import { render, Box, Color, } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import MultiSelect from 'ink-multi-select';

class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			i: 0
		};
	}

	render() {
		return <Color green>{this.state.i} tests passed</Color>;
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				i: this.state.i + 1
			});
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}
}

const { unmount, } = render(<Counter />);
setTimeout(() => {
	unmount();
}, 1000);
