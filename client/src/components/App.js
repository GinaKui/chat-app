import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login';
import Dashboard from './Dashboard'

function App() {
  const [id, setId] = useLocalStorage('userId', ''); 
  return (
    <div className="App">
      
      {id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />}
    </div>
  );
}

export default App;
