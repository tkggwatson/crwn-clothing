import { takeLatest, all, call, put } from 'redux-saga/effects';
import { signInWithPopup } from '@firebase/auth';

import UserActionTypes from './user.types';
import { googleSignInFailure, googleSignInSuccess } from './user.actions';
import { auth, createUserProfileDocument, googleProvider } from '../../firebase/firebase.utils';
import { getDoc } from '@firebase/firestore';

function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield getDoc(userRef);
        yield put(googleSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        }));
    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart)
    ]);
}
