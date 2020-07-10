import { GraphQLObjectType, GraphQLString as String, } from 'graphql';
import { user, }  from './user';

export default new GraphQLObjectType({
	name: 'Queries',
	fields: () => ({
		greeting,
		user,
	}),
});

const greeting = {
	type: String,
	description: 'A warm welcome message from GraphQL, usually used to Test if the system working..',
	resolve: ({ user, }, args, ast) => {
		if (user.id) {
			return `Hello ${user.name}`;
		}

		return `Hello, ${user.account || 'Stranger'}`;
	},
};
