const httpServer = require('http').createServer();
const io  = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods:["GET", "POST"]
  }
})

io.on('connection', socket => {
  // keep the static socket id
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r!== recipient);
      newRecipients.push(id);
      console.log('hear send-message event, new recipients are ' + newRecipients)
      console.log('the id is '+ id) 
      socket.broadcast.to(recipient).emit('receive-message', {
        recipents: newRecipients,
        sender: id,
        text
      })
    })
  })
});

httpServer.listen(5000)