import { all, takeLatest } from 'redux-saga/effects';

import HomeSaga from './home';
import ContactSaga from './contact';
import { homeConstants, contactConstants } from '<constants>';


export default function* rootSaga() {
    yield all([
        takeLatest(homeConstants.HOME_PAGE_REQUEST, HomeSaga),
        takeLatest(contactConstants.CONTACT_ME_REQUEST, ContactSaga),
    ]);
}
