<template>
    <div>
         <app-bar></app-bar>
        <div class="form-style-5">
            <form @submit="formSubmit">
                <fieldset>
                    <legend><span class="number">1</span>Información del Juguete</legend>

                    <input class="form-control" type="text" name="field1" placeholder="Código del Juguete (Axxxx)" v-model="code" required>

                    <input class="form-control" type="text" name="field2" placeholder="Nombre del Juguete *" v-model="name" required>
                    
                    <input class="form-control" type="number" name="field3" min="1" step="any" placeholder="Stock Disponible *" v-model="stock" required>
                    
                    <input class="form-control" type="number" name="field4" min="1" step="any" placeholder="Precio *" v-model="price" required>

                </fieldset>
                
                <input class="form-control" type="submit" value="Agregar Juguete"/>
                <button class="btn-actualizar" v-if="edit">Actualizar</button>
                
            </form>           
        </div>

        <div class="form-style-5 form2">
            <form @submit="formSubmit">
                <fieldset>
                    <legend><span class="number">2</span>Datos Enviados al Server</legend>
                        <pre>
                            {{ output }}
                        </pre>
                </fieldset>
            </form>
        </div>

        <div class="container row col-4">
            <h1 class="tit">Listar Juguetes</h1>
            <table class="table table-striped">
            <thead>
                <tr>
                <th>Código</th>
                <th>Nombre Juguete</th>
                <th>Stock</th>
                <th>Precio</th>
                <th colspan="2" class="action">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in computedToyList" :key="p.code">
                    <td>{{ p.data.code }}</td>
                    <td>{{ p.data.name }}</td>
                    <td>{{ p.data.stock }}</td>
                    <td>{{ p.data.price }}</td>
                    <td>
                       <button class="button btn-success" @click="editToy(p.id)">Editar</button>
                       <div class="is-clearfix"></div>
                    </td>
                    <td>
                       <button class="button btn-danger" @click="deleteToy(p.id)">Borrar</button>    
                       <div class="is-clearfix"></div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>

        <div>
            <router-link to="/toys" class="back">Volver al Home</router-link>
        </div>
 </div>
</template>


<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import AppBar from '../components/AppBar'

export default {
        components: {
          AppBar
        },
        
        data() {
            return {
              code: '',
              name: '',
              stock: '',
              price: '',
              output: '',
              classObject: {
                  active: true,
                  'form-control': false
              } 
            }
        },
        
        computed: {
            ...mapState(['toys', 'edit']),
            computedToyList(){
                return this.toys
            }
        },

        mounted() {
            this.$store.dispatch('getToys')      
        },
        
        methods: {
            ...mapActions(['updateEdit']),
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                console.log(this)
                axios.post('https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toys', 
                {
                    code: this.code,
                    name: this.name,
                    stock: this.stock,
                    price: this.price,
                
                },{headers: {'Content-type': 'application/json'}})
                
                .then( (response) => {
                    this.$store.dispatch('getToys')
                    if(currentObj) {
                        currentObj.output = response.data;  
                        console.log(response.data)
                        console.log(response.data.code)
                        alert('Datos enviados existosamente')
                    }                
                    else {
                        alert('Sin datos')
                    }
                })

                .catch( (error) => {
                    currentObj.output = error;
                });
            },

            deleteToy(id) {
                let confirmation = confirm("Está seguro que desea borrar?")
                if(confirmation) {
                    axios.delete(`https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toy/${id}`, {headers: {'Content-type': 'application/json'}})
                    .then(() => {
                    this.$store.dispatch('getToys')
                    alert('Juguete eliminado existosamente')
                    })
                }
            },

            editToy(id) {
                let confirmation = confirm("Está seguro que desea actualizar?")
                if(confirmation) {
                    this.updateEdit(id)
                    this.findToy(id)
                }
            },

            findToy(id) {
                axios.get(`https://us-central1-otto-klaus-prueba.cloudfunctions.net/toys/toy/${id}`, {headers: {'Content-type': 'application/json'}})
                .then((response)=> {
                    this.code = response.data.code
                    this.name = response.data.name
                    this.stock = response.data.stock
                    this.price = response.data.price
                    console.log(response)
                })
            }
                
        }
    }
</script>


<style scoped>

    .form-style-5 {
        max-width: 500px;
        padding: 10px 20px;
        background: #f4f7f8;
        margin: 50px auto;
        padding: 20px;
        background: #f4f7f8;
        border-radius: 8px;
        font-family: Arial, "Helvetica", Arial, Helvetica, sans-serif;
    }

    .form-style-5 fieldset {
        border: none;
    }

    .form-style-5 legend {
        font-size: 1.6em;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .form-style-5 label {
        display: block;
        margin-bottom: 8px;
    }

    .form-style-5 input[type="text"],
    .form-style-5 input[type="number"],
    .form-style-5 input[type="url"],
    .form-style-5 textarea,
    .form-style-5 select,
    pre {
        font-family: Arial, "Helvetica", Arial, Helvetica, sans-serif;
        background: rgba(255,255,255,.4);
        border: none;
        border-radius: 4px;
        font-size: 15px;
        margin: 0;
        outline: 0;
        padding: 10px;
        width: 100%;
        box-sizing: border-box; 
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box; 
        background-color: #e8eeef;
        color:#4f6370;
        -webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
        box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
        margin-bottom: 30px;
    }

    .form-style-5 input[type="text"]:focus,
    .form-style-5 input[type="number"]:focus,
    .form-style-5 input[type="url"]:focus,
    .form-style-5 textarea:focus,
    .form-style-5 select:focus {
        background: #d2d9dd;
    }

    .form-style-5 select {
        -webkit-appearance: menulist-button;
        height:35px;
    }

    .form-style-5 .number {
        background: #1abc9c;
        color: #fff;
        height: 30px;
        width: 30px;
        display: inline-block;
        font-size: 0.8em;
        margin-right: 10px;
        line-height: 30px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(255,255,255,0.2);
        border-radius: 15px 15px 15px 0px;
    }

    .form-style-5 input[type="submit"],
    .form-style-5 input[type="button"] {
        position: relative;
        display: block;
        padding: 10px;
        color: #FFF;
        margin: 0 auto;
        background: #1abc9c;
        font-size: 20px;
        text-align: center;
        font-style: normal;
        font-weight: bold;
        width: 50%;
        border: 1px solid #16a085;
        border-radius: 10px;
        border-width: 1px 1px 3px;
        margin-bottom: 10px;
    }

    .form-style-5 input[type="submit"]:hover,
    .form-style-5 input[type="button"]:hover,
    .back:hover {
        background: #109177;
        color: #ffffff;
        cursor: pointer;
    }

    pre {
        width: 450px;
        color:#4f6370;
        overflow: scroll;
    }

    textarea {
        resize: none;
    }

    .back {
        position: relative;
        display: block;
        padding: 10px;
        color: #FFF;
        margin: 50px auto;
        background: #c5726b;
        font-size: 16px;
        text-align: center;
        font-style: normal;
        font-weight: bold;
        width: 10%;
        border: none;
        border-radius: 10px;
        border-width: 1px 1px 3px;
    }

    h1.tit {
        font-size: 30pt;
        text-align: center;
        margin-top: 100px;
        margin-bottom: 60px;
    }

    .button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
    }
    
    .btn-success {
        background-color: white; 
        color: black; 
        border: 2px solid #4CAF50;
    }

    .btn-success:hover {
        background-color: #4CAF50;
        color: white;
    }

    .btn-danger {
        background-color: white; 
        color: black; 
        border: 2px solid #f44336;
    }

    .btn-danger:hover {
        background-color: #f44336;
        color: white;
    }

    .btn-actualizar {
        cursor: pointer;
        position: relative;
        display: block;
        padding: 10px;
        color: #FFF;
        margin: 50px auto;
        background: #c5726b;
        font-size: 20px;
        text-align: center;
        font-style: normal;
        font-weight: bold;
        width: 50%;
        border: none;
        border-radius: 10px;
        border-width: 1px 1px 3px;
        transition-duration: 0.4s;
    }

    .btn-actualizar:hover {
        background-color: #f44336;
        color: white;
    }
</style>