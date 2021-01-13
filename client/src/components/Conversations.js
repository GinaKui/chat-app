import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversation() {
  const { conversations } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item key={index}>
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
