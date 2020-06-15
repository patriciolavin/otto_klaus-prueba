<template>
  <div>
   <app-bar></app-bar>
     <v-main>
      <v-app>
        <v-card id="container">
          <!-- class="mx-auto my-auto" -->
          <v-card-title>  
            <h1 class="mx-auto">Log-Me-In</h1>
          </v-card-title>
         <v-card-text>

    <v-form>
        <v-text-field id="user" label="User"
          prepend-icon="mdi-account-circle"
          v-model='user'
        />
        <v-text-field id="pwd" label="Password" :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append = "showPassword = !showPassword"
          v-model='password'
        />
    </v-form>
    </v-card-text>
      <v-divider>
      </v-divider>

      <v-card-actions>
        <v-btn color="success">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="login">Login</v-btn>
      </v-card-actions>
      </v-card>
    </v-app>
   </v-main>
  </div>
</template>




<script>
import AppBar from '../components/AppBar'
import Firebase from 'firebase'

export default {

  data: () => ({
    user: '',
    password: '',
    showPassword: false
  }),

  methods: {
    login() {
      Firebase.auth().signInWithEmailAndPassword(this.user, this.password)
      .then(() => {
        this.$router.push('/')
        alert('Bienvenido!',this.user)
      })
      .catch(() => {
        alert('Login y/o password erróneos')
      })
    }
  },

  components: {
    AppBar
  }
};
</script>


<style>

#container {
  width: 400px;
  margin: auto;
}

.title {
  /* text-align: center; */
  margin: auto;
}

</style>