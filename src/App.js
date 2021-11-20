import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

export const HatsPage = () => (
  <main>
    <h1>HATS PAGE</h1>
  </main>
);

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
