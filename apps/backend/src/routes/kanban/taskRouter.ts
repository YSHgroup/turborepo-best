import { Request, Response, Router } from 'express'
import { Task } from '@/Schemas/kanban'

const router = Router()

router.get('/task/get', (req: Request, res: Response) => {
	Task.find()
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error fetching tasks', error: error })
		})
})

router.get('/task/get/:id', (req: Request, res: Response) => {
    console.log('id: ', req.params.id)
	Task.find({ _id: req.params.id })
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error fetching tasks', error: error })
		})
})

router.post('/task/create', (req: Request, res: Response) => {
	console.log('request: ', req.body.task)
	const task = new Task(req.body.task)

	// console.log(task.validateSync(), ' : pre-validation')

	task
		.save()
		.then((result) => {
			res.status(201).json(result)
		})
		.catch((error) => {
			if (error.name === 'ValidationError') {
				res
					.status(422)
					.json({ message: 'Validation Error', error: error.message })
			} else {
				res.status(500).json({ message: 'Error creating task', error: error })
			}
		})
})

router.patch('/task/update', (req: Request, res: Response) => {
	const task = new Task(req.body.task)

	Task.updateOne(
		{ id: req.body.id },
		{
			$set: req.body.task,
		},
		{ upsert: true }
	)
})

export { router as kanbanTaskRouter }
