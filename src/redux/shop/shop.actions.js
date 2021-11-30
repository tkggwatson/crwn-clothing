import { collection, getDocs } from '@firebase/firestore';

import { convertCollectionsSnapshopToMap, firestore } from '../../firebase/firebase.utils';

import { ShopActionTypes } from './shop.types';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collections) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {
        dispatch(fetchCollectionsStart());
        const collectionRef = collection(firestore, 'collections');

        getDocs(collectionRef)
            .then((snapshot) => {
                const collections = convertCollectionsSnapshopToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collections));
            })
            .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
    };
};
