import { model, Schema } from 'mongoose'

const taskSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	color: { type: String, required: true },
	subtasks: { type: [{ content: String }], default: [] },
})

const kanbanBoardSchema = new Schema({
	name: { type: String, required: true },
	tasks: {
		type: Schema.ObjectId,
		ref: 'Task',
	},
})

const Task = model('Task', taskSchema)
const Kanbanboard = model('kanbanboard', kanbanBoardSchema)

export { Task, Kanbanboard }
