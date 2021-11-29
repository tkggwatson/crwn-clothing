import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { collection, onSnapshot } from '@firebase/firestore';

import { convertCollectionsSnapshopToMap, firestore } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = collection(firestore, 'collections');
        this.unsubscribeFromSnapshot = onSnapshot(collectionRef, async (snapshot) => {
            const collections = convertCollectionsSnapshopToMap(snapshot);
            updateCollections(collections);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    render() {
        return (
            <Routes>
                <Route index element={<CollectionsOverview />} />
                <Route path=':collectionId' element={<CollectionPage />} />
            </Routes>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collections) => dispatch(updateCollections(collections)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
