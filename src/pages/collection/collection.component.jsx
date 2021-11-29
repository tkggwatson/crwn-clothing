import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShopCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { CollectionPageContainer, CollectionTitle, CollectionItemsContainer } from './collection.styles';

const CollectionPage = () => {
    const { collectionId } = useParams();
    const { title, items } = useSelector(selectShopCollection(collectionId));
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title.toUpperCase()}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};

export default CollectionPage;
