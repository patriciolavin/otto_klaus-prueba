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
            </tr>
        </thead>
        <tbody>
            <tr v-for="toy in toys" :key="toy.id">
            <td>{{ toy.data.code }}</td>
            <td>{{ toy.data.name }}</td>
            <td>{{ toy.data.stock }}</td>
            <td>{{ toy.data.price }}</td>
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
        ...mapActions(['setToys'])
    },

    computed: {
        ...mapState(['toys'])
    },
    created(){
        this.setToys()
    }
}
</script>