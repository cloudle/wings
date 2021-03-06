import type { User, } from '../../typeDefinitions';
import { counter, } from './counter';
import { user, } from './user';

const greeting = (root, args, context) => {
	const user: User = context.user;

	return `welcome back, ${user.firstName}!`;
};

export const Query = {
	greeting,
	counter,
	user,
};

export default Query;
