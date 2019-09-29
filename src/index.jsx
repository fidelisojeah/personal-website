import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { history } from '<utils>';
import '<assets>/main.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import store from './store';

const toRender = (
    <Router history={history}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </Router>
);

const rootElement = document.getElementById('root');

// if (rootElement.hasChildNodes()) {
//     hydrate(toRender, rootElement);
// } else {
render(toRender, rootElement);
// }

serviceWorker.register();
