import Vuex from 'vuex'
import { task } from '~/store/task'

export default function createStore() {
  return new Vuex.Store({
    modules: {
      tasks: task,
    },
    // plugins: [
    //   createPersistedState({
    //     paths: ['auth'],
    //     storage: {
    //       getItem: key => Cookies.get(key),
    //       setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: true }),
    //       removeItem: key => Cookies.remove(key)
    //     }
    //   })
    // ]
  })
}
