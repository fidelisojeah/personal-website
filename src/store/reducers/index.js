import { combineReducers } from 'redux';

import homePage from './home';
import loader from './loaders';
import message from './contact';
import alert from './message';

const reducers = combineReducers({
    homePage,
    loader,
    message,
    alert
});

export default reducers;
