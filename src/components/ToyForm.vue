<template>
  <div class="text-center">
    <v-dialog
      :value="showForm"
      width="500"
      persistent
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2" primary-title>{{ !!currentToy.id ?  'Actualizar el Juguete' : 'Ingresar el Nuevo Juguete' }}
        </v-card-title>

        <v-card-text>
            <v-text-field label="codigo" type="text" :value="currentToy.data.code" @input="updateCode"></v-text-field>
            <v-text-field label="nombre" type="text" :value="currentToy.data.name" @input="updateName"></v-text-field>
            <v-text-field label="stock" suffix="unidades" :value="currentToy.data.stock" @input="updateStock"></v-text-field>
            <v-text-field label="precio" prefix="$" :value="currentToy.data.price" @input="updatePrice"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submitForm()">{{ !!currentToy.id ? 'Actualizar' : 'Crear'}}</v-btn>
          <v-btn color="warning" text @click="cancelForm()">Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>

import {mapState, mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions (['updateCode', 'updateName', 'updateStock', 'updatePrice', 'postToy', 'hideToyForm', 'updateToy', 'cancelForm']),
        
        submitForm() {
            if(this.currentToy.id) {
              // si tiene id se llama a la función que actualiza los datos
              this.updateToy(this.currentToy.id)
            }
            else {
              this.postToy()
            }
              this.hideToyForm()
        },
    },

    computed: {
        ...mapState(['showForm', 'currentToy'])
    },
}
</script>