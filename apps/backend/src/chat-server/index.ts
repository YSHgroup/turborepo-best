import { Server } from 'socket.io'

const io = new Server(5000)

io.on('connection', (socket) => {
  console.log('a new client connected: ', socket)
})

// io.listen(5000)