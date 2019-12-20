import { Component } from 'react';
import PropTypes from 'prop-types';

type Props = {
	store?: Object,
}

class ConsoleProvider extends Component<Props> {
	static childContextTypes = {
		consoleStore: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.store = props.store;
	}

	getChildContext() {
		return {
			consoleStore: this.store,
		};
	}

	render() {
		return this.props.children;
	}
}

export default ConsoleProvider;
