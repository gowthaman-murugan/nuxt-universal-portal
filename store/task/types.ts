import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types'
import { ITask } from '~/models/Task'

export interface TaskState {
  taskList: ITask[]
  activeTask: ITask
}

export type TaskActionContext = ActionContext<TaskState, RootState>

export interface TaskMutations extends MutationTree<TaskState> {
  setTaskList: (state: TaskState, tasks: ITask[]) => void
  setTask: (state: TaskState, task: ITask) => void
}

//  export interface TaskGetters extends GetterTree<TaskState> {
//      list: (state: TaskState) => ITask[];
//      currentTask: (state: TaskState) => ITask;
//   }

export type TaskGetters = GetterTree<TaskState, RootState>

export interface TaskActions extends ActionTree<TaskState, RootState> {
  lists: (ctx: TaskActionContext) => void
  update: (ctx: TaskActionContext, task: ITask) => void
}
