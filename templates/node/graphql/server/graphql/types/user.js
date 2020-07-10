import { GraphQLObjectType, GraphQLList, } from 'graphql';
import { Resolvers, Primitives, paginationResponse, } from '../util';

export default new GraphQLObjectType({
	name: 'User',
	description: 'Any client which connected to system with valid jwToken',
	fields: () => ({
		id: Resolvers.id(),
		name: Resolvers.string(),
		email: Resolvers.string(),
	}),
});
