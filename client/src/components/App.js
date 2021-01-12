import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login'

function App() {
  const [id, setId] = useLocalStorage('userId', ''); 
  return (
    <div className="App">
      <Login onIdSubmit={setId} />
    </div>
  );
}

export default App;
