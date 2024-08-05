import { Request, Response, Router } from 'express'
import { Types } from 'mongoose'
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
			if (!result)
				return res.status(404).json({ message: 'Task not found by the id' })
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
			insertTaskToBoard(req.body.boardId, result._id)
				.then((resultFromKanban) => {
					if (!resultFromKanban) {
						throw new Error('Kanban board not found.')
					}
					console.log('kanban: ', resultFromKanban)
					res.status(201).json(result)
				})
				.catch((error) => {
					console.log('Error task inserting.', error)
					return res.status(500).json({ message: 'Error task inserting.' })
				})
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
		new: true,
	})
		.then((result) => {
			if (!result) return res.status(404).json({ message: 'Task not found' })
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating task', error: error })
		})
})

router.patch('/task/:id', (req: Request, res: Response) => {
	console.log('ids: ', req.body)
	const { currentId, targetId } = req.body.boardIds
	Kanbanboard.findByIdAndUpdate(
		currentId,
		{ $pull: { tasks: req.params.id } },
		{ new: true }
	)
		.populate('tasks')
		.then((result) => {
			if (!result)
				return res.status(404).json({ message: 'Kanban board not found' })
			insertTaskToBoard(targetId, req.params.id)
				.then((resultFromKanban) => {
					if (!resultFromKanban) {
						throw new Error('Kanban board not found.')
					}
					console.log('kanban: ', resultFromKanban)
					res.status(200).json(result)
				})
				.catch((error) => {
					console.log('Error task inserting.', error)
					return res.status(500).json({ message: 'Error task inserting.' })
				})
		})
		.catch((error) => {
			res.status(500).json({
				message: 'Error removing task from kanban board.',
				error: error.message,
			})
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
	Task.findById(req.params.id)
		.then((result) => {
			if (!result) return res.status(404).json({ message: 'Task not found' })
			if (result) {
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
						if (error.name === 'ValidationError') {
							res
								.status(422)
								.json({ message: 'Validation Error', error: error.message })
						} else {
							res
								.status(500)
								.json({ message: 'Error creating task', error: error })
						}
					})
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error creating task', error: error })
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

// utility
/**
 * Insert given task id to the board specified by id to refer tasks
 * @param boardId Id of board to be target
 * @param taskId Id of task to insert
 */
async function insertTaskToBoard(
	boardId: string,
	taskId: string | Types.ObjectId
) {
	return Kanbanboard.findByIdAndUpdate(
		boardId,
		{
			$push: {
				tasks: taskId,
			},
		},
		{ new: true }
	)
}

export { router as kanbanTaskRouter }
