import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import Login from './Login';
import Dashboard from './Dashboard'


function App() {
  const [id, setId] = useLocalStorage('userId', '');
  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  )
  return (
    <div className="App">
      
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </div>
  );
}

export default App;
