import { Server } from 'socket.io'
import { dbConnect } from '@/services/sqliteConnect'
import { Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import { availableParallelism } from 'node:os'
import Cluster from 'node:cluster'
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter'

if(Cluster.isPrimary) {
  const numCPUs = availableParallelism()
  // create one worker per available core
  for (let i = 0; i < numCPUs; i++) {
    Cluster.fork({
      PORT: 5000 + i
    })
  }

  // set up the adapter on the primary thread
  setupPrimary();
} else {
  let db: Database<sqlite3.Database, sqlite3.Statement>
  (async function() {
    db = await dbConnect()
  })()
  
  const io = new Server({
    connectionStateRecovery: {},
    // setup the adapter on each worker thread
    adapter: createAdapter(),
    cors: {
      origin: '*'
    }
  })
  
  // this will emit the event to all connected sockets
  io.emit('hello', 'everyone')
  
  io.on('connection', async (socket) => {
    console.log('a new client connected: ', socket.handshake.address, socket.handshake.address)
  
    socket.on('chat message', async (msg, clientOffset, callback) => {
      console.log('Client sent a message: ', msg, clientOffset)
      let result
      try {
        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset)
      } catch (error: any) {
        console.error(error)
        if(error.errno === 19 /* SQLITE_CONSTRAINT */ ) {
          // the message was already inserted, so we notify the client
          callback()
        }
        return
      }
      
      io.emit('chat message', msg, result.lastID) // send the message including the sender
      callback()
    })
  
    // socket.broadcast.emit('Hi') // broadcast to everyone except for a certain emitting socket
  
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
  // each worker will listen on a distinct port
  const port = process.env.PORT as unknown
  io.listen(port as number)
}