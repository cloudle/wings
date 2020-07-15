import { createStore, } from '../utils';
import reducers from './reducers';

export const consoleStore = createStore(reducers);
