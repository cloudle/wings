import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import reducers from 'store/reducers';
import sagaMiddleware, { runSagas } from './sagas';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = global[DEVTOOLS] || compose;

export default function configureStore(initialState) {
	const enhancers = composeEnhancers(
		applyMiddleware(
			sagaMiddleware,
		),
	);

	const store = initialState
		? createStore(reducers, initialState, enhancers)
		: createStore(reducers, enhancers);

	runSagas();
	return store;
}

export const store = configureStore();
