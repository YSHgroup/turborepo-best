import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import { WebSocketServer } from 'ws'

import { kanbanTaskRouter } from './routes'
import { boardRouter } from './routes'
import { websocketRouter } from './routes'

dotenv.config()
const app: Application = express()
mongoose
	.connect(process.env.DB_URI!)
	.then((result) => {
		console.log('Connection successful: ', result.connection.name)
	})
	.catch((error) => {
		console.log('Connect error: ', error)
	})

const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	session({
		name: 'wishlify',
		secret: process.env.SESSION_SECRET as string | string[],
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 60, // 2 months
			secure: process.env.NODE_ENV === 'production',
		},
	})
)

// next middleware function
app.use(function (req, res, next) {
	console.log('A request for things received at ' + Date.now())
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	// console.log('req: ', req.body)
	
	next()
})

app.get('/', (req: Request, res: Response) => {
	res.json('Welcome to Express & TypeScript Server')
})

app.use('/kanban', [kanbanTaskRouter, boardRouter])
app.use('/websocket', websocketRouter)

app.listen(port, () => {
	console.log('=========================================')
	console.log(`Server is Fire at http://localhost:${port}`)
	console.log('=========================================')
})

//Socket server block
const wss = new WebSocketServer({ port: 7777 });
let clients = new Array()
wss.on('connection', (ws) => {
	clients.push(ws)
	console.log('Client connected');

	ws.on('message', (message) => {
		console.log(`Received message => ${message}`);
		ws.send(`log:Hello, client!`);
	});
	ws.on('close', () => {
		clients.pop()
		console.log('Client disconnected');
	});

	ws.send(`connected:${clients.length}`);
})

wss.on('error', (err) => {
	console.log('Error occurred:', err);
})

console.log('websocket server started on port 7777')