// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider, teamsTheme } from '@fluentui/react-northstar'

ReactDOM.render(
  <React.StrictMode>
    <Provider theme={teamsTheme}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
