import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';

import { convertCollectionsSnapshopToMap, firestore } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = collection(firestore, 'collections');

        getDocs(collectionRef).then((snapshot) => {
            const collections = convertCollectionsSnapshopToMap(snapshot);
            updateCollections(collections);
            this.setState({ loading: false });
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <Routes>
                <Route index element={<CollectionsOverviewWithSpinner isLoading={loading} />} />
                <Route path=':collectionId' element={<CollectionPageWithSpinner isLoading={loading} />} />
            </Routes>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collections) => dispatch(updateCollections(collections)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
