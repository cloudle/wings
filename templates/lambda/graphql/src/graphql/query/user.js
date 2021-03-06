import type { User, } from '../../typeDefinitions';

export const user = (root, args, context) => {
	const user: User = context.user;

	return user;
};
