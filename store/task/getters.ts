import { TaskGetters, TaskState } from './types'
import { ITask } from '~/models/Task'

const getters: TaskGetters = {
  list: (state: TaskState): ITask[] => state.taskList,
  currentTask: (state: TaskState): ITask => state.activeTask,
}
export default getters
