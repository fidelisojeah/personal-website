import { call, put, delay } from 'redux-saga/effects';
import firebase from '<utils>/firebase';
import { sendMessageSuccess, sendMessageFailure } from '../reducers/contact';
import { showMessage, hideMessage } from '../reducers/message';

export default function* sendMessage(data) {
    try {
        yield call([firebase.firestore().collection('messages'), firebase.firestore().collection('messages').add], data.data);

        yield put(showMessage({
            type: 'success',
            message: 'Thanks for the message!'
        }));

        yield put(sendMessageSuccess());
        yield delay(3000);
        yield put(hideMessage());
    } catch (error) {
        yield put(sendMessageFailure(error));
    }
}
