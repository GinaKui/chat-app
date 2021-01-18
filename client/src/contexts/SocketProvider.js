import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client'

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000', 
      { query: { id }}
    );
    setSocket(newSocket);
    
    //close old socket before new socket is built
    return () => newSocket.close()
  }, [id])
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
