import { combineReducers, } from '../utils';
import * as Actions from './actions';
import { InsertNodeConsole } from './actions';

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
	nodeHotUpdate: undefined,
	nodeConsole: [],
	devStats: {},
	devAddress: undefined,
	devProgress: undefined,
	devConsole: [],
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
	case Actions.SetNodeAddress:
		return { ...state, nodeAddress: action.payload, };
	case Actions.SetNodeHotUpdate:
		return { ...state, nodeHotUpdate: action.payload, };
	case Actions.InsertNodeConsole:
		return { ...state, nodeConsole: [...state.nodeConsole, action.payload], };
	case Actions.ClearNodeConsole:
		return { ...state, nodeConsole: [], };
	case Actions.SetDevStats:
		return { ...state, devStats: action.payload, };
	case Actions.SetDevAddress:
		return { ...state, devAddress: action.payload, };
	case Actions.SetDevProgress:
		return { ...state, devProgress: action.payload, };
	case Actions.InsertDevConsole:
		return { ...state, devConsole: [...state.devConsole, action.payload], };
	case Actions.ClearDevConsole:
		return { ...state, devConsole: [], };
	default:
		return state;
	}
};

export default combineReducers({
	app: appReducer,
});
