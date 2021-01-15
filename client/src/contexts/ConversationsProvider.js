import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider';

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts();
  const socket = useSocket();

  const createConversation = (recipients) => {
    setConversations(prevConversatoins => {
      return [...prevConversatoins, { recipients, messages: [] }];
    })
  }
  const addMessageToConversation = useCallback(({ recipients = [], text, sender }) => {
    setConversations(prevConversatoins => {
      let madeChange = false;
      const newMessage = { sender, text }
      const newConversations = prevConversatoins.map(conversation => {
        if(arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages:[...conversation.messages, newMessage]
          }
        }
        return conversation
      })

      if(madeChange) {
        return newConversations;
      } else {
        return [
          ...prevConversatoins,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations]);

  useEffect(() => {
    console.log('ConversationsProvider useEffect')
    if(socket == null) return;
    socket.on('receive-message', (data) => {
      addMessageToConversation({...data})
      console.log('hear from server')
    })
    //remove the event listener
    return () => {
      socket.off('receive-message')
    }
    //only change event listner when function change
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text });
    addMessageToConversation({recipients, text, sender: id})
  }
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversationIndex;
    return { ...conversations, messages, recipients, selected }
  })

  const value = { 
    conversations: formattedConversations, 
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation
  }
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a,b) {
  if(a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every( (element, index) => {
    return element === b[index]
  }
  )
}