import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloProvider } from '@apollo/client/react';
import { AuthProvider } from 'modules/firebase';
import { ErrorBoundary } from 'ErrorBoundary';
import { theme } from 'uiCore/components/Provider/theme';
import { ThemeProvider } from '@material-ui/core';
import { ErrorFallback } from 'error/ErrorFallback';
import { createApolloClient } from 'config/apollo';
import reportWebVitals from 'reportWebVitals';

const client = createApolloClient();
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
