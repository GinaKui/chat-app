import React, { useState } from 'react'
import Login from './Login'

function App() {
  const [id, setId] = useState('');
  return (
    <div className="App">
      <Login onIdSubmit={setId} />
    </div>
  );
}

export default App;
