import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'

export const task = {
  name: 'tasks',
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
