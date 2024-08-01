import { Request, Response, Router } from 'express'
import { Kanbanboard, Task } from '@/Schemas/kanban'

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
	const task = new Task(req.body.task)

	if (!req.body.boardId) {
		return res.status(400).json({ message: 'board_id is required' })
	}

	task
		.save()
		.then((result) => {
			console.log('id: ', result.id)
			Kanbanboard.findByIdAndUpdate(
				req.body.boardId,
				{
					$push: {
						tasks: result._id,
					},
				},
				{ upsert: true, new: true }
			).then(resultFromKanban => {
				console.log("kanban: ", resultFromKanban)
			}).catch(error => {
				console.log("error: ", error)
			})
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
	Task.findByIdAndUpdate(req.params.id, req.body.task, {
		upsert: true,
		new: true,
	})
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
	)
		.then((result) => {
			res.status(201).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error inserting subtask', error: error })
		})

	// const task = await Task.findById(taskId);
	// Assuming subtasks is an array in your Task schema
	//  task.subtasks.push(subtaskData);
	//  await task.save();
})

router.patch(
	'/task/:taskId/subtasks/:subtaskId',
	(req: Request, res: Response) => {
		const { taskId, subtaskId } = req.params
		const updatedSubtaskData = req.body.subtask

		Task.findOneAndUpdate(
			{ _id: taskId, 'subtasks._id': subtaskId },
			{
				$set: {
					'subtasks.$': updatedSubtaskData,
				},
			},
			{ new: true }
		)
			.then((result) => {
				if (!result) {
					return res.status(404).json({ message: 'Task or subtask not found' })
				}
				res.status(200).json(result)
			})
			.catch((error) => {
				res
					.status(500)
					.json({ message: 'Error updating subtask', error: error })
			})

		//alternative approach
		//   Task.findById(taskId)
		//     .then(task => {
		//       if (!task) return res.status(404).json({ message: 'Task not found' });
		//       // Find the subtask by its ID
		//       const subtask = task.subtasks.id(subtaskId);
		//       if (!subtask) return res.status(404).json({ message: 'Subtask not found' });
		//       // Update the subtask with new data
		//       subtask.set(updatedSubtaskData);
		//       // Save the updated task
		//       task.save().then(updatedTask => {
		// 		res.status(200).json(updatedTask);
		// 	  })
		//     }).catch((error) => {
		//       res.status(500).json({ message: 'Error updating subtask', error: error });
		//     });
	}
)

router.delete('task/:id/subtask/:subtaskId', (req: Request, res: Response) => {
	const { id, subtaskId } = req.params

	Task.updateOne(
		{ _id: id },
		{
			$pull: { _id: subtaskId },
		},
		{ new: true }
	)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ message: 'Task or subtask not found' })
			}
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting subtask', error: error })
		})
})

export { router as kanbanTaskRouter }
