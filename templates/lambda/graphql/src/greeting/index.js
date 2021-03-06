import { env, } from '../shared';

export const greet = () => {
	return { statusCode: 200, body: `hello world, ${env.jwtSecret}`, };
};
