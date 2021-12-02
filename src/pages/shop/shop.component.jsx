import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded, selectIsCollectionsFetching } from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render() {
        const { isCollectionsFetching, isCollectionsLoaded } = this.props;
        return (
            <Routes>
                <Route index element={<CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} />} />
                <Route path=':collectionId' element={<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} />} />
            </Routes>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionsFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
