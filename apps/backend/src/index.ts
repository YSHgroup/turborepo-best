import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app: Application = express()

const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log('=========================================')
	console.log(`Server is Fire at http://localhost:${port}`)
	console.log('=========================================')
})
