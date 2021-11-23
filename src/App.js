import React from 'react';
import { Outlet } from 'react-router-dom';

import {
    createUserProfileDocument,
    onUserAuthStateChanged,
} from './firebase/firebase.utils';

import Header from './components/header/header.component';

import './App.css';
import { onSnapshot } from '@firebase/firestore';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        // Subscribe for auth notifications
        this.unsubscribeFromAuth = onUserAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                onSnapshot(userRef, (snapshot) => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    });
                });
            } else {
                this.setState({ currentUser: null });
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
                <Header currentUser={this.state.currentUser} />
                <Outlet />
            </div>
        );
    }
}

export default App;
