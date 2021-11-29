import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = () => (
    <Routes>
        <Route index element={<CollectionsOverview />} />
        <Route path=':collectionId' element={<CollectionPage />} />
    </Routes>
);

export default ShopPage;
