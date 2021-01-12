import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Conversations from './Conversations'
import Contacts from './Contacts'

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts"

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  return (
    <div className="d-flex flex-column" style={{ maxWidth: '300px' }}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>contacts</Nav.Link>
          </Nav.Item>
        </Nav>
      <Tab.Content className="border-right overflow-auto flex-grow-1">
        <Tab.Pane eventKey={CONVERSATIONS_KEY}>
          <Conversations />
        </Tab.Pane>
        <Tab.Pane eventKey={CONTACTS_KEY}>
          <Contacts />
        </Tab.Pane>
      </Tab.Content>

      <div className="border-top border-right">
        My ID: <span>{id}</span>
      </div>
      <Button>
        New {activeKey === CONTACTS_KEY ? 'Contact': 'Conversation'}
      </Button>
      </Tab.Container>
    </div>
  )
}
