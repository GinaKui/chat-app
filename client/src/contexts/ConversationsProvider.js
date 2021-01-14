import React, { createContext, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts();
  const createConversation = (recipients) => {
    setConversations(prevConversatoins => {
      return [...prevConversatoins, { recipients, messages: [] }];
    })
  }
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    const selected = index === selectedConversationIndex;
    return { ...conversations, recipients, selected }
  })
  return (
    <ConversationsContext.Provider value={{ conversations: formattedConversations, createConversation, selectConversationIndex: setSelectedConversationIndex }}>
      {children}
    </ConversationsContext.Provider>
  )
}