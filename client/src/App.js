import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

import PageNotFound from './pages/page-not-found/page-not-found.component';
import Spinner from './components/spinner/spinner.component';

import { GlobalStyle } from './global.styles';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return (
        <div>
            <GlobalStyle />
            <Header />
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path='/'>
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
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default App;
