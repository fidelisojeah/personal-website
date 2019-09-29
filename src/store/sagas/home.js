import { call, put } from 'redux-saga/effects';
import firebase from '<utils>/firebase';
import { loadHomePageFailure, loadHomePageSuccess } from '../reducers/home';

export default function* LoadHomePage() {
    try {
        // const homePage = firebase.firestore().collection('homepage').get;

        const response = yield call([firebase.firestore().collection('homepage'), firebase.firestore().collection('homepage').get]);

        const homepageSections = response.docs.reduce((previousValues, currentValue) => {
            const result = previousValues;
            result[currentValue.id] = currentValue.data();
            return result;
        }, {});

        yield put(loadHomePageSuccess(homepageSections));
    } catch (error) {
        yield put(loadHomePageFailure(error));
    }
}
