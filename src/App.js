import React from 'react';
import { Outlet } from 'react-router-dom';

import {
    createUserProfileDocument,
    onUserAuthStateChanged,
} from './firebase/firebase.utils';

import Header from './components/header/header.component';

import './App.css';

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
        this.unsubscribeFromAuth = onUserAuthStateChanged(async (user) => {
            this.setState({ currentUser: user });
            createUserProfileDocument(user);
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
