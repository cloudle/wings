import * as Actions from 'store/actions';

const initialState = {
	counter: 0,
};

export default (state = initialState, action) => {
	const { type, payload, } = action;

	switch (type) {
	case Actions.IncreaseCounter:
	default:
		return state;
	}
};
