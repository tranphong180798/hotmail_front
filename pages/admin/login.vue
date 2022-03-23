<template>
  <v-container fluid fill-height>
   
    <v-layout align-center justify-center>
      <v-flex >
        <v-card >
          <v-alert type="error" :value="alert.type==='error'"transition="scale-transition"  >
            <div v-html="alert.message"></div>
          </v-alert>
          <v-toolbar dark color="primary">
            <v-toolbar-title >Login Admin</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="login.email"
                  :rules="rules"
                  counter="25"
                  hint="Nhập tên tài khoản"
                  :error-messages="emailError"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Username
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="login.password"
                  :rules="rules"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  counter="25"
                  hint="Nhập mật khẩu"
                  @click:append="showPass = !showPass"
                  :type="showPass ? 'text' : 'password'"
                  label="password"
                  :error-messages="passwordError"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Password
                  </div>
                </template>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="adminLogin()">Đăng nhập</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vuex from 'vuex'
export default {
  props: ["resource", "title"],
  layout: 'login',
  auth:false,
  async middleware({store, redirect}) {
    
  },
  data() {
    return {
      fields: [
        {source: "id", sortable: true},
        {source: "name", sortable: true},
        {source: "username", sortable: true},
        {source: "email", type: "email"},
        {source: "address", type: "address"},
        "phone",
        {source: "website", type: "url"},
        "company.name",
      ],
      login:{
        email: '',
        password: '',

      },
      alert: {
        type:null,
        message:null
      },
      showPass: false,
      linkFace:'<a>https://www.facebook.com/daiphong.tran.140/</a>',
      rules: [v => v.length <= 50 || 'Nhiều nhất là 15 chữ số'],
      wordsRules: [v => v.trim().split(' ').length <= 5 || 'Max 5 words'],
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    async adminLogin() {
      try {
        await this.$axios.$get('/sanctum/csrf-cookie');
        let response = await this.$auth.loginWith('customStrategy', {data: this.login})
        if (response.data.isSuccess && response.data.token !==null) {
          this.$store.commit('setToken', response.data.token);
          console.log("token:",this.$store.state.token );
          this.$router.push({name: 'admin'});
          
        }
        
      } catch (e) {
        if (e.response.status === 400) {
          this.emailError = e.response.data.errors.email;
          this.passwordError = e.response.data.errors.password;
          if(e.response.data.errors.role) {
            this.alert.type = 'error';
            this.alert.message = e.response.data.errors.role;
            setTimeout(() => {
              this.alert.type = null
            },5000)
          }
          
        }
      }
    },
  }
};
</script>
