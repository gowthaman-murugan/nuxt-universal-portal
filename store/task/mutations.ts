import { TaskMutations, TaskState } from './types'
import { ITask } from '~/models/Task'

const mutations: TaskMutations = {
  setTaskList: (state: TaskState, tasks: ITask[]) => {
    state.taskList = tasks
  },
  setTask: (state: TaskState, task: ITask) => {
    state.activeTask = task
  },
}

export default mutations
