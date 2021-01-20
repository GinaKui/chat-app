import React, { useState, useRef, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {
  const [text, setText] = useState('')
  const { sendMessage, selectedConversation } = useConversations()
  /* const scrollRef = useCallback( node => {
    if(node) {
      //this code is also able to scroll to the lastest message
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }, []) */

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation])

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(selectedConversation.recipients.map(r => r.id), text);
    setText('');
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-start px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? scrollRef: null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end': ''}`}
              >
                <div
                  className={`text-muted small ${message.fromMe ? 'text-right': ''}`}
                >
                  {message.fromMe ? '' : message.senderName }
                </div>
                <div 
                  className={`rounded px-2 py-1 ${message.fromMe ? 'border bg-light' : 'bg-success text-white'}`}
                >
                    {message.text}
                </div>  
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mx-3 my-4">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{height: "100px", resize: 'none'}}
            />
            <InputGroup.Append>
              <Button type="submit" variant="success" className="mr-3">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
