import { gql, } from 'apollo-server-lambda';

export const typeDefs = gql`
	type Query {
		user: User
		greeting: String
		counter: Float
	}
	
	type Mutation {
		increaseCounter(amount: Float = 0): Float
	}
	
	type User {
		id: String
		firstName: String
		lastName: String
		fullName: String
	}
`;

export default typeDefs;
