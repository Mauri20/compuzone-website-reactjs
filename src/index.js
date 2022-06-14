import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import Home from 'pages/home';
import CatalogueShoes from 'pages/shoes';
import GlobalStyle from 'styles/global';
import { themeLight, themeDark } from 'styles/theme';
import { AppThemeProvider, useAppTheme } from 'context/AppTheme';
import { AddItemsProvider } from 'context/AddItemsToCart';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = memo(() => {
  const { theme } = useAppTheme();

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      <Routes>
        <Route path="/trademark" element={<Home />} />
        <Route path="shoes/filter" element={<CatalogueShoes />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AddItemsProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppThemeProvider>
    </AddItemsProvider>
  </React.StrictMode>
);
