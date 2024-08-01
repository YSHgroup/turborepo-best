import { Router, Request, Response } from 'express'
import { Kanbanboard } from '@/Schemas/kanban'

const router = Router()

router.get('/board', (req: Request, res: Response) => {
	Kanbanboard.find().populate('tasks')
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error fetching tasks', error: error })
		})
})

router.post('/board', (req: Request, res: Response) => {
	const boardData = new Kanbanboard(req.body.boardData)

	boardData
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
				res.status(500).json({ message: 'Error creating data', error })
			}
		})
})

router.put('/board/:id', (req: Request, res: Response) => {
	Kanbanboard.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body.boardData,
		},
		{ upsert: true, new: true }
	)
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating data', error })
		})
})

router.delete('/board/:id', (req: Request, res: Response) => {
  const boardId = req.params.id;

  Kanbanboard.findByIdAndDelete(boardId)
    .then(result => {
      if (!result) {
        // If no board was found, return a 404 response
        return res.status(404).json({ message: 'Board not found' });
      }
      // Return a success message or the deleted board
      res.status(200).json({ message: 'Board deleted successfully', deletedBoard: result });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error deleting data', error });
    });
});

export { router as boardRouter }
