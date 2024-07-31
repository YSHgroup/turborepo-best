import {Request, Response, Router} from 'express'
import { Task } from '@/Schemas/kanban'

const router = Router()

router.post('/create-task', (req: Request,  res: Response) =>{
    console.log('request: ', req.body.task)
    const task = new Task(req.body.task)

    // console.log(task.validateSync(), ' : pre-validation')

    task.save().then((result) => {
        res.status(201).json(result)
    }).catch((error) => {
        if(error.name === 'ValidationError') {
            res.status(422).json({message: 'Validation Error', error: error.message})
        } else {
            res.status(500).json({message: 'Error creating task', error: error})
        }
    })
})

export {router as kanbanRouter}