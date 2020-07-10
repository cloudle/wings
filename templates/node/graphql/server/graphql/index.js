import { GraphQLSchema, graphql as runGraphQl } from 'graphql';
import query from './queries';

const schema = new GraphQLSchema({ query, });

const execute = (query, rootValues = {}, variables = {}) => {
	return runGraphQl(schema, query, rootValues, variables);
};

export default execute;
