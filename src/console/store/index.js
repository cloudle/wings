import { createStore, } from '../utils';
import reducers from './reducers';

export const appStore = createStore(reducers);
