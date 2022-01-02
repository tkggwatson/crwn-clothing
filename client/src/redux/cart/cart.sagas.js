import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils';

import { CartActionTypes } from './cart.types';
import { clearCart, setCartItems } from './cart.actions';
import { selectCartItems } from './cart.selectors';
import { UserActionTypes } from '../user/user.types';
import { selectCurrentUser } from '../user/user.selector';

function* clearCartOnSignOut() {
    yield put(clearCart());
}

function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchCartAsync);
}

function* fetchCartAsync({ payload: user }) {
    try {
        const q = query(collection(firestore, 'carts'), where('userId', '==', user.id));
        const querySnapshot = yield getDocs(q);
        if (!querySnapshot.empty) {
            const cartItems = querySnapshot.docs[0].data().items;
            yield put(setCartItems(cartItems));
        }
    } catch (error) {
        console.log(error.message);
    }
}

function* storeCartAsync() {
    const user = yield select(selectCurrentUser);
    if (user) {
        try {
            const items = yield select(selectCartItems);
            const userId = user.id;
            const collectionRef = collection(firestore, 'carts');
            const q = query(collectionRef, where('userId', '==', userId));
            const querySnapshot = yield getDocs(q);
            let cartDoc = null;
            if (!querySnapshot.empty) {
                const cartDocId = querySnapshot.docs[0].id;
                cartDoc = doc(collectionRef, cartDocId);
            } else {
                cartDoc = doc(collectionRef);
            }
            const data = {
                userId,
                items,
            };
            yield setDoc(cartDoc, data);
        } catch (error) {
            console.log(error.message);
        }
    }
}

function* onCartChanged() {
    yield takeLatest(
        [CartActionTypes.ADD_ITEM, CartActionTypes.REMOVE_ITEM, CartActionTypes.CLEAR_ITEM],
        storeCartAsync
    );
}

export function* cartSagas() {
    yield all([call(onSignOutSuccess), call(onSignInSuccess), call(onCartChanged)]);
}
