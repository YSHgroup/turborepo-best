import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

import { kanbanRouter } from './routes'

dotenv.config()
const app: Application = express()

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
	next()
})

app.get('/', (req: Request, res: Response) => {
	res.json('Welcome to Express & TypeScript Server')
})

app.use('/kanban', kanbanRouter)

app.listen(port, () => {
	console.log('=========================================')
	console.log(`Server is Fire at http://localhost:${port}`)
	console.log('=========================================')
})
