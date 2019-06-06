import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userType: 0,
    selectCode :0,
		userName:'',
		userId:0,
		userHeader: '',
  },

  mutations: {
    login(state, data) {
      state.userName = data.userName
			state.userType = data.userType
			state.userHeader = data.userHeader
			state.userId = data.userId
    },
		selectCode(state, code){
			state.selectCode = code
		}
  },
  getters: {
    getUserName: state => {
      return state.userName
    },
		getHeader: state =>{
			return state.userHeader
		},
		getType: state=>{
			return state.userType
		}
    
  }
})
