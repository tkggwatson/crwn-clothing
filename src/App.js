import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

import Layout from './components/layout/layout.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import PageNotFound from './pages/page-not-found/page-not-found.component';
import CheckoutPage from './pages/checkout/checkout.component';

import './App.css';

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='shop/*' element={<ShopPage />} />
                    <Route
                        path='signin'
                        element={currentUser ? <Navigate replace to='/' /> : <SignInAndSignUpPage />}
                    />
                    <Route path='checkout' element={<CheckoutPage />} />
                    <Route path='*' element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
