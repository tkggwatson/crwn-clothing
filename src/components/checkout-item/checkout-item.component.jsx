import React from 'react';
import { connect } from 'react-redux';

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

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt='item' />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <ArrowContainer onClick={() => removeItem(cartItem)}>&#10094;</ArrowContainer>
                <ValueContainer>{quantity}</ValueContainer>
                <ArrowContainer onClick={() => addItem(cartItem)}>&#10095;</ArrowContainer>
            </QuantityContainer>
            <TextContainer>${price}</TextContainer>
            <RemoveButton onClick={() => clearItem(cartItem)}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    clearItem: (item) => dispatch(clearItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
