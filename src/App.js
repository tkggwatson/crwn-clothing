import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { onSnapshot } from '@firebase/firestore';
import { createStructuredSelector } from 'reselect';

import { createUserProfileDocument, onUserAuthStateChanged } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import Layout from './components/layout/layout.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import PageNotFound from './pages/page-not-found/page-not-found.component';

import './App.css';

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        // Subscribe for auth notifications
        this.unsubscribeFromAuth = onUserAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                onSnapshot(userRef, (snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            } else {
                setCurrentUser(null);
            }
        });
    }

    componentWillUnmount() {
        // Unsubscribe from auth notifications
        this.unsubscribeFromAuth();
    }

    render() {
        const { currentUser } = this.props;
        return (
            <div>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path='shop' element={<ShopPage />} />
                        <Route
                            path='signin'
                            element={currentUser ? <Navigate replace to='/' /> : <SignInAndSignUpPage />}
                        />
                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
