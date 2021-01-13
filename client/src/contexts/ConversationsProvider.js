import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const { contacts } = useContacts();
  const createConversation = (recipients) => {
    setConversations(prevConversatoins => {
      return [...prevConversatoins, { recipients, messages: [] }];
    })
  }
  const formattedConversations = conversations.map(conversation => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    return { ...conversations, recipients }
  })
  return (
    <ConversationsContext.Provider value={{ conversations: formattedConversations, createConversation }}>
      {children}
    </ConversationsContext.Provider>
  )
}