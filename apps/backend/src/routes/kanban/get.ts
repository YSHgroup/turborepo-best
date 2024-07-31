import {Router, Request, Response} from "express";
import { Task } from "@/Schemas/kanban";

const router = Router()

router.get('/get-task', (req: Request, res: Response) => {
    Task.find().then(result=>{
        res.status(200).json(result)
    }).catch(error=> {
        res.status(500).json({message: 'Error fetching tasks', error: error})
    })
})

export {router as kanbanGetRouter}