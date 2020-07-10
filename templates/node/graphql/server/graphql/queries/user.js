import { GraphQLList } from 'graphql';
import User from '../types/user';
import { Primitives, } from '../util';

export const user = {
	type: User,
	description: 'Get profile of a User',
	args: {
		id: Primitives.string('Id of the user you want to query, use current user if not specify')
	},
	resolve: ({ user, }, args, ast) => user,
};
