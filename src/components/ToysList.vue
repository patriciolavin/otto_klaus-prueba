<template>
    <div>
          <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">Código</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Stock</th>
            <th class="text-left">Precio</th>
            <th class="text-left">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="toy in toys" :key="toy.id">
            <td>{{ toy.data.code }}</td>
            <td>{{ toy.data.name }}</td>
            <td>{{ toy.data.stock }}</td>
            <td>{{ toy.data.price }}</td>
            <td>
                <v-btn text @click="editToy(toy.id)">
                <v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn text @click="removeToy(toy.id)">
                <v-icon>mdi-delete</v-icon></v-btn>
            </td>
            </tr>
        </tbody>
        </template>
  </v-simple-table>
    </div>
</template>


<script>

import { mapState, mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions(['getToys', 'deleteToy', 'editToy', 'displayToyForm', 'setCurrentToy']),
        removeToy(id) {
            let confirmation = confirm('Desea eliminar este juguete?')
            if (confirmation) {
                this.deleteToy(id)
            }
        },
        
        editToy(id) {
            //establecer el juguete actual, en base al id entrergado.    
            this.setCurrentToy(id)
            // desplegar el formulario con el juguete actual.
            this.displayToyForm()
        }

        
        // editToy(id) {
        //     let confirmation = confirm('Desea editar este juguete?')
        //     if (confirmation) {
        //         this.editToy(id)
        //     }
        // },
    },

    computed: {
        ...mapState(['toys'])
    },

    created(){
        this.getToys()
    }
}
</script>