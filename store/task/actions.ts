import { TaskActions } from './types'
import { list } from '~/services/task.service'

const actions: TaskActions = {
  lists: async ({ commit }) => {
    const tasks = await list()

    //   const tasks = [ {
    //     "id": 1,
    //     "task_name": "Send mail to Raja",
    //     "task_detail": "Have to send mail to regarding money",
    //     "date": "2020-03-10 00:00:00"
    // },
    // {
    //     "id": 2,
    //     "task_name": "Send mail to Raja",
    //     "task_detail": "Have to send mail to regarding money",
    //     "date": "2020-03-10 00:00:00"
    // }]
    commit('setTaskList', tasks.data)
  },
  update: ({ commit }, task) => {
    // const tasks = await update(task.id!, task);
    commit('setTask', task)
  },
}

export default actions
