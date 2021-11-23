import React from 'react';
import { Outlet } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
        const auth = getAuth();
        this.unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
            this.setState({ currentUser: user });
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
