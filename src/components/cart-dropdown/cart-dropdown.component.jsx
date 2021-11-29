import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CartItemsContainer, EmptyMessage, CheckoutButton } from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, dispatch }) => {
    const navigate = useNavigate();
    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length > 0 ? (
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItemsContainer>
            <CheckoutButton
                onClick={() => {
                    dispatch(toggleCartHidden());
                    navigate('/checkout');
                }}
            >
                GO TO CHECKOUT
            </CheckoutButton>
        </CartDropdownContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
