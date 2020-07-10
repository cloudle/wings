import moment from 'moment';
import { GraphQLString as String, GraphQLInt as Int, GraphQLFloat as Float, GraphQLBoolean as Boolean, GraphQLList as List, GraphQLEnumType as Enum,GraphQLObjectType, GraphQLNonNull as Required, } from 'graphql';

const resolveId = (instance) => instance.id && instance.id.toString();
const resolveDateTime = (instance, params, options, { fieldName }) => moment.utc(instance[fieldName]);
const resolve = (instance, params, options, { fieldName }) => instance[fieldName];

const generateResolver = (type, resolver = resolve) => {
	return (description = 'Self descriptive') => ({ type, description, resolve: resolver });
};

const generatePrimitive = (type, required = false, defaultVal = undefined) => {
	if (required) {
		return (description = 'Self descriptive') =>
			({ type: new Required(type), description, });
	}

	return (defaultValue = defaultVal, description = 'Self descriptive') =>
		({ type, description, defaultValue, });
};

export const Resolvers = {
	string: generateResolver(String),
	id: generateResolver(String, resolveId),
	int: generateResolver(Int),
	float: generateResolver(Float),
	boolean: generateResolver(Boolean),
	stringList: generateResolver(new List(String)),
	datetime: generateResolver(String, resolveDateTime),
	ofType: (type, description = 'Self descriptive', resolver = resolve) =>
		({ type, description, resolve: resolver, }),
	listOfType: (type, description = 'Self descriptive', resolver = resolve) =>
		({ type: new List(type), description, resolve: resolver, }),
};

const PaginationTypes = {};

export const PageInfo = new GraphQLObjectType({
	name: 'PageInfo',
	description: 'Pagination Info',
	fields: () => ({
		pageSize: Resolvers.int(),
		endCursor: Resolvers.string(),
		hasNextPage: Resolvers.boolean(),
	}),
});

Resolvers.paginationOfType = (type) => {
	const typeKey = `${type.name}Pagination`,
		existedType = PaginationTypes[typeKey],
		currentPaginationType = existedType || new GraphQLObjectType({
			name: `${type.name}Pagination`,
			description: `Pagination of ${type.name}, represent list of data`,
			fields: () => ({
				totalCount: Resolvers.int(),
				nodes: Resolvers.listOfType(type),
				pageInfo: Resolvers.ofType(PageInfo),
			}),
		});

	if (!existedType) PaginationTypes[typeKey] = currentPaginationType;

	return currentPaginationType;
};

export const Primitives = {
	string: generatePrimitive(String),
	requiredString: generatePrimitive(String, true),
	int: generatePrimitive(Int),
	requiredInt: generatePrimitive(Int, true, 0),
	float: generatePrimitive(Float),
	requiredFloat: generatePrimitive(Float, true, 0),
	boolean: generatePrimitive(Boolean),
	ofType: (type, defaultValue = undefined, description = 'Self descriptive') =>
		({ type, defaultValue, description, }),
	list: (type, defaultValue = [], description = 'Self descriptive') =>
		({ type: new List(type), defaultValue, description, }),
	requiredList: (type, defaultValue = [], description = 'Self descriptive') =>
		({ type: new Required(new List(type)), defaultValue, description, }),
};

const CommonOrderEnum = new Enum({
	name: 'CommonOrderTypes',
	values: {
		id: { value: 'id' },
		createdAt: { value: 'createdAt' },
		updatedAt: { value: 'updatedAt' },
	},
});

const CommonSortEnum = new Enum({
	name: 'CommonSortTypes',
	values: {
		asc: { value: 'ASC' },
		desc: { value: 'DESC' },
	},
});

Primitives.paginationArgs = (otherArgs) => ({
	first: Primitives.int(10),
	after: Primitives.string(),
	order: Primitives.ofType(CommonOrderEnum, 'id'),
	sort: Primitives.ofType(CommonSortEnum, 'ASC'),
	...otherArgs,
});

export const paginationResponse = (nodes, { first, order }, totalCount) => {
	return {
		totalCount,
		nodes,
		pageInfo: {
			pageSize: first,
			hasNextPage: nodes.length > first,
		},
	};
};
