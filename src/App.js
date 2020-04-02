import React from 'react';
import Dashboard from './components/Dashboard'
import Store from './store/Store'
import Count from './store/Count'
function App() {
  return (
    <div className="App">
    <Store>
      <Dashboard />
    </Store>
    <Count>
      
    </Count>
    </div>
  );
}

export default App;
