import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoginPage: false,
    userInfo: {},
    selectedList: 0,
  },
  getters: {
  },
  mutations: {
    changeLoginPage(state, isLogin){
      state.isLoginPage = isLogin
    },
    setUserInfo(state, info){
      state.userInfo = info
    },
    setSelectedList(state, listId){
      state.selectedList = listId
    }
  },
  actions: {
  },
  modules: {
  }
})
