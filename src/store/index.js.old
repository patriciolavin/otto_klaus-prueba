import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export default new Vuex.Store({
  state: {
    // User
    currentUser: getFromStorage('user') || undefined,
    toys: [],
    loading: false,
    edit: false
  },
  mutations: {
    // User
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },

    LOADING_TOYS(state) {
      state.loading = !state.loading
    },
    GET_TOYS(state, toys) {
      state.toys = toys
      state.loading = false
    },
    UPDATE_EDIT(state) {
      state.edit = !state.edit
    }
  },
  actions: {
    // User
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try { 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },

    getToys({commit}) {
      commit('LOADING_TOYS')
      axios.get('https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toys', { headers: { "Content-type": "text/plain"}})
        .then((accept) => {
          let data = accept.data
          commit('GET_TOYS', data)
          console.log(data)
        })
    },

    updateEdit({commit}) {
      commit('UPDATE_EDIT')
    }
},
  getters: {
    // User
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  }
})
