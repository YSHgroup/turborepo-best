import { Request, Response, Router } from 'express'
import { join } from 'node:path'
// import { fileURLToPath } from 'node:url'

const router = Router()
// const __dirname = dirname(fileURLToPath(import.meta.url))


router.get('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'public', 'websocket-client', 'index.html'))
  // res.send(JSON.stringify({ __dirname, __filename }))
})

export { router  as websocketRouter }