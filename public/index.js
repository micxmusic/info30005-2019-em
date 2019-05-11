import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './newStyling';
import 'typeface-roboto';

import App from './components/App';
import { AuthProvider } from './components/AuthContext';

render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.querySelector('#app')
);
