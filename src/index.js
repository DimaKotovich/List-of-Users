import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Redux/redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore(
  {
    reducer: {
      users: userReducer
    }
  }
);


root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
);


