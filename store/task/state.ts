import { TaskState } from './types'
import { ITask } from '~/models/Task'

const state = (): TaskState => ({
  taskList: [],
  activeTask: {} as ITask,
})

export default state
