import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversation from './NewConversation'
import NewContact from './NewContact'

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts"

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const conversationIsOpen = activeKey === CONVERSATIONS_KEY;
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }
  return (
    <div className="d-flex flex-column border-right" style={{ maxWidth: '300px' }}>
      <div className="flex-grow-1">
        <Tabs activeKey={activeKey} onSelect={setActiveKey} className="justify-content-center" >
          <Tab eventKey={CONVERSATIONS_KEY} title="conversations">
            <Conversations/>
          </Tab>
          <Tab eventKey={CONTACTS_KEY} title="contacts">
            <Contacts/>
          </Tab>         
        </Tabs>
      </div> 
      <div className="border-top">
        My ID: <span>{id}</span>
      </div>
      <Button onClick={openModal}>
        New {conversationIsOpen ? 'Conversation' : 'Contact' }
      </Button>
      <Modal show={modalIsOpen} onHide={closeModal}>
        {conversationIsOpen ? 
          <NewConversation closeModal={closeModal}/> : 
          <NewContact closeModal={closeModal}/>
        }
      </Modal>
    </div>
  )
}