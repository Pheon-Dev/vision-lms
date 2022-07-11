import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './redux/reducers';

import '../../assets/css/grid.css';
import '../../assets/css/theme.css';
import '../../assets/css/index.css';

import Dashboard from './pages/Dashboard';

const store = createStore(rootReducer);

export default function Admin() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Dashboard />
      </React.StrictMode>
    </Provider>
  );
}
