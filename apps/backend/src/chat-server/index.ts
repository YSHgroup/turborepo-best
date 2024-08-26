import { Server } from 'socket.io'

const io = new Server(5000, {
  connectionStateRecovery: {}
})

// this will emit the event to all connected sockets
io.emit('hello', 'everyone')

io.on('connection', (socket) => {
  console.log('a new client connected: ', socket)

  socket.on('chat message', (msg) => {
    console.log('Client sent a message: ', msg)
    
    io.emit('chat message', msg) // send the message including the sender
  })

  socket.broadcast.emit('Hi') // broadcast to everyone except for a certain emitting socket

  socket.on('disconnect', () => {
    console.log('a client disconnected')
  })
})

// io.listen(5000)