import { takeLatest, all, call, put } from 'redux-saga/effects';
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { getDoc } from '@firebase/firestore';

import { auth, createUserProfileDocument, googleProvider } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import { emailSignInFailure, emailSignInSuccess, googleSignInFailure, googleSignInSuccess } from './user.actions';

function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield getDoc(userRef);
        yield put(
            googleSignInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(googleSignInFailure(error));
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
            emailSignInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(emailSignInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailPassword);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
