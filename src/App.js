import React from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { onSnapshot } from '@firebase/firestore';

import { createUserProfileDocument, onUserAuthStateChanged } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import Header from './components/header/header.component';

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
                        },
                    );
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
        return (
            <div>
                <Header />
                <Outlet />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
