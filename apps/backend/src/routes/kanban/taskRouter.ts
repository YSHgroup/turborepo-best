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

router.put('/task/update/:id', (req: Request, res: Response) => {
	Task.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body.task,
		},
		{ upsert: true, new: true }
	)
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating task', error: error })
		})
})

router.delete('/task/delete/:id', (req: Request, res: Response) => {
	Task.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting task', error: error })
		})
})

router.post('/task/:id/subtasks', (req: Request, res: Response) => {
	Task.findByIdAndUpdate(
		req.params.id,
		{
			$push: { subtasks: req.body.subtask },
		},
		{ new: true }
	).then(result => {
		res.status(201).json(result)
	}).catch(error => {
		res.status(500).json({ message: 'Error inserting subtask', error: error })
	})
})

export { router as kanbanTaskRouter }
