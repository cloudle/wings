import { combineReducers, } from '../utils';
import * as Actions from './actions';

const initialState = {
	counter: 0,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
	case Actions.IncreaseCounter:
		return { ...state, counter: state.counter + action.volume };
	default:
		return state;
	}
};

export default combineReducers({
	app: appReducer,
})
