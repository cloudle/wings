import { ApolloServer, } from 'apollo-server-lambda';
import { apolloConfigs, } from './index';

const apolloServer = new ApolloServer(apolloConfigs);

export const handler = apolloServer.createHandler({
	cors: {
		origin: '*',
		credentials: true,
	}
});
