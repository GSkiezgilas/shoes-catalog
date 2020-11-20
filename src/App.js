import React from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Catalog />
      </div>
    </div>
  );
}

export default App;
