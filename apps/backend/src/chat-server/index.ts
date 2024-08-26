import { Server } from 'socket.io'
import { dbConnect } from '@/services/sqliteConnect'
import { Database } from 'sqlite'
import sqlite3 from 'sqlite3'

let db: Database<sqlite3.Database, sqlite3.Statement>
(async function() {
  db = await dbConnect()
})()

const io = new Server(5000, {
  connectionStateRecovery: {}
})

// this will emit the event to all connected sockets
io.emit('hello', 'everyone')

io.on('connection', async (socket) => {
  console.log('a new client connected: ', socket)

  socket.on('chat message', async (msg) => {
    console.log('Client sent a message: ', msg)
    let result
    try {
      result = await db.run('INSERT INTO messages (content) VALUES (?)', msg)
    } catch (error) {
      console.error(error)
      return
    }
    
    io.emit('chat message', msg, result.lastID) // send the message including the sender
  })

  socket.broadcast.emit('Hi') // broadcast to everyone except for a certain emitting socket

  if(!socket.recovered) {
    try{
      await db.each('SELECT id, content FROM  messages WHERE id > ?',
        [socket.handshake.auth.serverOffset || 0],
        (_error, row) => {
          socket.emit('chat message', row.content, row.id)
        }
      )
    } catch(e) {

    }
  }

  socket.on('disconnect', () => {
    console.log('a client disconnected')
  })
})

// io.listen(5000)