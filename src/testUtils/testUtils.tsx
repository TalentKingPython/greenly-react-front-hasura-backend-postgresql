import { ThemeProvider } from '@material-ui/core';
import { AuthProvider } from '../modules/firebase/provider/authProvider';
import { theme } from '../uiCore/components/Provider/theme';
import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TestAuthProvider } from './TestAuthProvider';

const AllTheProviders: FC = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthProvider>
  );
};

const TestProvider: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TestAuthProvider>{children}</TestAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render, TestProvider };
