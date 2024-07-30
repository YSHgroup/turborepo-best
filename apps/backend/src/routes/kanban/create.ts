import {Request, Response, Router} from 'express'

const router = Router()

router.post('/create', (req: Request,  res: Response) =>{
    console.log('request: ', req.body)
    res.status(200).json('recieved' + req.body)
})

export {router as kanbanRouter}