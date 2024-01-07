import { PropsWithChildren } from 'react';

import { ThemeProvider } from './use-theme';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);
