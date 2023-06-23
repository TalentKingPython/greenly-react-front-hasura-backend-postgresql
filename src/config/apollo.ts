import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';

export const getApolloUri = () => {
  if (process.env.REACT_APP_ENV === 'development') {
    return process.env.REACT_APP_DEVELOPMENT_API_URL || '';
  } else if (process.env.REACT_APP_ENV === 'production') {
    return process.env.REACT_APP_PRODUCTION_API_URL || '';
  } else {
    throw new Error('No environment specified');
  }
};

export const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: getApolloUri(),
      headers: {
        'x-hasura-admin-secret':
          process.env.REACT_APP_HASURA_ADMIN_SECRET || '',
      },
    }),
  });
};
