import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import Home from 'pages/home';
import CatalogueShoes from 'pages/shoes';
import GlobalStyle from 'styles/global';
import { themeLight, themeDark } from 'styles/theme';
import { AppThemeProvider, useAppTheme } from 'context/AppTheme';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRenderTheme = memo(() => {
  const { theme } = useAppTheme();

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      <Routes>
        <Route path="/trademark" element={<Home />} />
        <Route path="shoes/filter" element={<CatalogueShoes />} />
      </Routes>
    </ThemeProvider>
  );
});

const App = () => {
  return (
    <AppThemeProvider>
      <AppRenderTheme />
    </AppThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
