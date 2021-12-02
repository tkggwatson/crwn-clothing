import { collection, getDocs } from '@firebase/firestore';
import { takeLatest, call, put } from 'redux-saga/effects';

import { convertCollectionsSnapshopToMap, firestore } from '../../firebase/firebase.utils';
import { ShopActionTypes } from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

function* fetchCollectionsAsync() {
    try {
        const collectionRef = collection(firestore, 'collections');
        const snapshot = yield getDocs(collectionRef);
        const collections = yield call(convertCollectionsSnapshopToMap, snapshot);
        yield put(fetchCollectionsSuccess(collections));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
