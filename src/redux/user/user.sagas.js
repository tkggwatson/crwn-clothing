import { takeLatest, all, call, put } from 'redux-saga/effects';
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { getDoc } from '@firebase/firestore';

import { auth, createUserProfileDocument, googleProvider } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import { signInFailure, signInSuccess } from './user.actions';

function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield getDoc(userRef);
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmailPassword({ payload: { email, password } }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield getDoc(userRef);
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailPassword);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
