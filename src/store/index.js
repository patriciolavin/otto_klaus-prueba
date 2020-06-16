import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function emptyToy() {
  return {
   id: null,
   data: {
     name: '',
     code: '',
     price: 0,
     stock: 0
   }
 }
}

export default new Vuex.Store({

  state: {
    toys: [],
    showForm: false,
    currentToy: emptyToy(),
    overlay: false
  },

  mutations: {
    SET_EMPTY_TOY(state){
      const empty = emptyToy();
      state.currentToy.id = null
      Object.keys(empty.data).forEach(key => {
        state.currentToy.data[key] = empty.data[key]
      })
    },

    SET_TOYS(state, data) {
      state.toys = data
    },
    DISPLAY_TOY_FORM(state) {
      state.showForm = true
    },
    HIDE_TOY_FORM(state) {
      state.showForm = false
    },
    UPDATE_CODE(state, code) {
      state.currentToy.data.code = code 
    },
    UPDATE_NAME(state, name) {
      state.currentToy.data.name = name
    },
    UPDATE_STOCK(state, stock) {
      state.currentToy.data.stock = stock
    },
    UPDATE_PRICE(state, price) {
      state.currentToy.data.price = price
    },
    SET_CURRENT_TOY(state, toy) {
      state.currentToy = toy
    },
    DISPLAY_OVERLAY(state) {
      state.overlay = true
    },
    HIDE_OVERLAY(state) {
      state.overlay = false
    }
  },

  actions: {
    getToys({ commit }){
      commit('DISPLAY_OVERLAY')
      axios.get('https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toys')
      .then(response => {
        commit('SET_EMPTY_TOY')
        commit('SET_TOYS', response.data)
      
      }).finally(() => {
        commit('HIDE_OVERLAY')
      }) 
    },
    displayToyForm({commit}) {
      commit('DISPLAY_TOY_FORM')
    },
    cancelForm({commit}) {
      commit('SET_EMPTY_TOY')
      commit('HIDE_TOY_FORM')
    },
    hideToyForm({commit}) {
      commit('HIDE_TOY_FORM')
    },
    updateCode({commit}, code) {
      commit('UPDATE_CODE', code)
    },
    updateName({commit}, name) {
      commit('UPDATE_NAME', name)
    },
    updateStock({commit}, stock) {
      commit('UPDATE_STOCK', stock)
    },
    updatePrice({commit}, price) {
      commit('UPDATE_PRICE', price)
    },
    // llamar a las acciones desde el store dentro de la misma función, se usa "dispatch"
    postToy({dispatch, state, commit }) {
      axios.post('https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toy', state.currentToy.data)
      .then(() => {
        commit('SET_EMPTY_TOY')
        dispatch('getToys')
      })
    },
    deleteToy({ dispatch }, id) {
      axios.delete(`https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toy/${id}`)
      .then(() => {
        dispatch('getToys')
      })
    },
    setCurrentToy({commit}, id) {
      axios.get(`https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toy/${id}`)
      .then((response) => {
        commit('SET_CURRENT_TOY', response.data)
      })
    },
    updateToy({state, dispatch }, id) {
      axios.put(`https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toy/${id}`, state.currentToy.data)
      .then(() => {
        dispatch('getToys')
      })
    }
 },

  modules: {

  }
})
