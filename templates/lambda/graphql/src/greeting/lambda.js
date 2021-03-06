import { greet, } from './index';

export const handler = async (event, context) => {
	return greet();
};
