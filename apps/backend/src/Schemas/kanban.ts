import { model, Schema } from 'mongoose'

const taskSchema = new Schema({
	name: { type: String, require: true },
	description: { type: String, require: true },
	color: { type: String, require: true },
	subtasks: { type: [{ content: String }], default: [] },
})

const kanbanBoardSchema = new Schema({
	name: { type: String, require: true },
	tasks: {
		type: Schema.ObjectId,
		ref: 'Task',
	},
})

const Task = model('Task', taskSchema)
const Kanbanboard = model('kanbanboard', kanbanBoardSchema)

export { Task, Kanbanboard }
