import React from 'react';
import { useSelector } from 'react-redux';

import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = () => {
    const collections = useSelector(selectShopCollectionsForPreview);
    return (
        <CollectionsOverviewContainer>
            {collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))}
        </CollectionsOverviewContainer>
    );
};

export default CollectionsOverview;
