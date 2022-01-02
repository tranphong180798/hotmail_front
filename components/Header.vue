<template>
  <div>

    <v-toolbar
      color="cyan"
      dark
      class="toolbar"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          width="500"
          v-if="checkLogin"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"

            >
              Api Document
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Token
            </v-card-title>

            <v-card-text>
              {{ this.$auth.strategy.token.get()}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>

  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "Header",
  computed: {
    checkLogin:function(){
     if(this.$store.state.auth.user ===false)
     {
       return false;
     }
     else if(this.$store.state.auth.user !== null)
     {
       return true;
     }
     return false;

    }
  },
  data(){
    return {
      dialog: false,
    }
  },

  methods:{

  }
}
</script>

<style scoped>
.header {
  display:flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  height:50px;
}
.header img {
  width: 150px;
}
button{
  padding:10px;
}
.toolbar{
  margin-bottom: 10px;
}
</style>
