import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/header/header.component';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
