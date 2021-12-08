import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import {
    BackgroundImage,
    CollectionItemContainer,
    CollectionFooterContainer,
    NameContainer,
    PriceContainer,
    AddButton,
} from './collection-item.styles';

const CollectionItem = ({ item }) => {
    const { name, price, imageUrl } = item;
    const dispatch = useDispatch();
    return (
        <CollectionItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>${price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton inverted onClick={() => dispatch(addItem(item))}>
                Add to cart
            </AddButton>
        </CollectionItemContainer>
    );
};

export default CollectionItem;
