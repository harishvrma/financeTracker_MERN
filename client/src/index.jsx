import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router } from 'react-router-dom';

const frontendApi = 'your-clerk-frontend-api';

ReactDOM.render(
  <ClerkProvider frontendApi={frontendApi}>
    <Router>
      <App />
    </Router>
  </ClerkProvider>,
  document.getElementById('root')
);
