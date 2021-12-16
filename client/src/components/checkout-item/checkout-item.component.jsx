import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    ArrowContainer,
    ValueContainer,
    RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const dispatch = useDispatch();
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt='item' />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <ArrowContainer onClick={() => dispatch(removeItem(cartItem))}>&#10094;</ArrowContainer>
                <ValueContainer>{quantity}</ValueContainer>
                <ArrowContainer onClick={() => dispatch(addItem(cartItem))}>&#10095;</ArrowContainer>
            </QuantityContainer>
            <TextContainer>${price}</TextContainer>
            <RemoveButton onClick={() => dispatch(clearItem(cartItem))}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default React.memo(CheckoutItem);
