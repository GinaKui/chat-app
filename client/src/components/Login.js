import React, { useRef } from 'react'
import { v4 as uuid } from 'uuid'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login({ onIdSubmit }) {
  const idRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    onIdSubmit(idRef.current.value)
  }

  const createNewId = () => {
    onIdSubmit(uuid());
  }
  return (
    <Container className="align-items-center d-flex">
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required/>
        </Form.Group>
      <Button type="submit">Login</Button>
      <Button onClick={createNewId}>Create New</Button>
      </Form>
    </Container>
  )
}
