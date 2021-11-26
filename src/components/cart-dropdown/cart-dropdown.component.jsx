import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, dispatch }) => {
    const navigate = useNavigate();
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length > 0 ? (
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <CustomButton
                onClick={() => {
                    dispatch(toggleCartHidden());
                    navigate('/checkout');
                }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
