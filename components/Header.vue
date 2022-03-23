<template>
  <div>

    <v-toolbar
        color="cyan"
        dark
        class="toolbar"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>SELL MAIL</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu v-if="checkLogin">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar style="margin-right: 30px; ">
            <img
                :src="`${$auth.$state.user.url_image}`"
                alt="John"
                v-bind="attrs"
                v-on="on"
            >
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              link
          >
            <v-list-item-title @click="featureUser(index)">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn color="#FF5722" class="btn btn-register" @click="registerUser()" v-if="!checkLogin">Đăng kí</v-btn>
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
            {{ this.$auth.strategy.token.get() }}
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
    checkLogin: function () {
      if (this.$store.state.auth.user === false) {
        return false;
      } else if (this.$store.state.auth.user !== null) {
        return true;
      }
      return false;

    }
  },
  created() {
  },
  data() {
    return {
      dialog: false,
      items: [
        'Xem thông tin User',
        'Sửa thông tin User',
        'Thoát'
      ]
    }
  },

  methods: {
    async registerUser() {
      this.$router.push({name: 'register'});
      await this.loading();
    },
    async loading() {
      let loader = this.$loading.show({
        canCancel: true,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide()
      }, 2000);
    },
    featureUser: async function (index) {
      switch (index) {
        case 0:
        {
          this.$router.push({name: 'user'});
          break;
        }
        case 1:
        {
          this.$router.push({path: 'user/edit'});
          break;
        }
        case 2:
        {
          await this.$auth.logout();
          this.loading();
          break;
        }
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  height: 50px;
}

.header img {
  width: 150px;
}

button {
  padding: 10px;
}

.toolbar {
  margin-bottom: 10px;
}
</style>
