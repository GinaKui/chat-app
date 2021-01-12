import React from 'react'
import Sidebar from './Sidebar'

export default function Dashboard({ id }) {
  return (
    <main className="d-flex" style={{height: '100vh'}}> 
      <Sidebar id= {id} />
    </main>
  )
}
