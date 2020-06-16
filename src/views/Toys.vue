<template>
    <div>
      <app-bar></app-bar>
      <v-main> 
        <v-btn @click="displayToyForm">Nuevo Juguete</v-btn>
         <toys-list></toys-list>
        <toy-form></toy-form>

        
          <div class="text-center">
            <v-overlay :value="overlay">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
          </div>



      </v-main>
    </div>
</template>

<script>

import AppBar from '../components/AppBar'
import ToysList from '../components/ToysList'
import ToyForm from '../components/ToyForm'
import {mapActions, mapState} from 'vuex'

export default {

  components: {
    AppBar,
    ToysList,
    ToyForm
  },
  
  computed: {
    ...mapState(['overlay'])
  },

  methods: {
    ...mapActions(['displayToyForm'])
  }
}
</script>