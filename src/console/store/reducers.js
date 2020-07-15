import { combineReducers, } from '../utils';
import * as Actions from './actions';

const initialState = {
	counter: 0,
	devAvailable: false,
	nodeAvailable: false,
	devMessage: {
		text: 'Compiling..',
		loading: true,
	},
	nodeMessage: {
		text: '',
	},
	devStats: {

	},
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
	case Actions.IncreaseCounter:
		return { ...state, counter: state.counter + action.volume };
	case Actions.ToggleDevStatus:
		return { ...state, devAvailable: action.payload };
	case Actions.ToggleNodeStatus:
		return { ...state, nodeAvailable: action.payload };
	case Actions.SetDevMessage:
		return { ...state, devMessage: { ...state.devMessage, ...action.payload, } };
	case Actions.SetNodeMessage:
		return { ...state, nodeMessage: { ...state.nodeMessage, ...action.payload, } };
	case Actions.SetDevStats:
		return { ...state, devStats: action.payload, };
	default:
		return state;
	}
};

export default combineReducers({
	app: appReducer,
});
