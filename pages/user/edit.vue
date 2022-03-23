<template>
  <v-container>

    <v-layout align-center justify-center>
      <v-flex>
        <v-card>
          <v-alert type="error" :value="alert.type==='error'" transition="scale-transition">
            <div v-html="alert.message"></div>
          </v-alert>
          <v-toolbar dark color="primary">
            <v-toolbar-title>update</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="update.name"
                  counter="25"
                  hint="Nhập tên tài khoản"
                  :error-messages="nameError"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Username
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="update.email"
                  counter="25"
                  hint="Nhập Email"
                  :error-messages="emailError"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Email
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="update.number_phone"
                  counter="25"
                  hint="Nhập số điện thoại"
                  :error-messages="numberPhoneError"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Number Phone
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="update.password"
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
              <!-- Here the image preview -->
              <img :src="update.image" height="150" v-if="imageUrl"/>
              <v-text-field
                  :error-messages="fileError"
                  label="Select Image" @click='pickFile' v-model='imageName'
                  prepend-icon="mdi-file-image"></v-text-field>
              <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/jpeg, image/jpg, image/png"
                  @change="onFilePicked"
              >
            </v-form>
          </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn color="primary" @click="updateUser()">Đăng kí</v-btn>
            <v-btn color="red" @click="adminLogin()">Hủy bỏ</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axiosUrl from "../../scripts/common/axios";

export default {
  props: ["resource", "title"],
  auth: false,
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
      update: {
        email: this.$auth.$state.user.email,
        name: this.$auth.$state.user.name,
        password: this.$auth.$state.user.password,
        image: this.$auth.$state.user.url_image,
        number_phone: this.$auth.$state.user.number_phone
      },
      alert: {
        type: null,
        message: null
      },
      showPass: false,
      linkFace: '<a>https://www.facebook.com/daiphong.tran.140/</a>',
      emailError: '',
      passwordError: '',
      numberPhoneError: '',
      nameError: '',
      fileError: '',

      imageUrl: '',
      imageFile: null,
      imageName: '',
    };
  },
  methods: {
    async adminLogin() {
      try {
        await this.$axios.$get('/sanctum/csrf-cookie');
        let response = await this.$auth.loginWith('customStrategy', {data: this.login})
        if (response.data.isSuccess && response.data.token !== null) {
          this.$store.commit('setToken', response.data.token);
          console.log("token:", this.$store.state.token);
          this.$router.push({name: 'admin'});

        }

      } catch (e) {
        if (e.response.status === 400) {
          this.emailError = e.response.data.errors.email;
          this.passwordError = e.response.data.errors.password;
          if (e.response.data.errors.role) {
            this.alert.type = 'error';
            this.alert.message = e.response.data.errors.role;
            setTimeout(() => {
              this.alert.type = null
            }, 5000)
          }

        }
      }
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },

    async updateUser() {
      let formData = new FormData()
      formData.append('name', this.update.name);
      formData.append('email', this.update.email);
      formData.append('password', this.update.password);
      formData.append('number_phone', this.update.number_phone);
      formData.append('image_file', this.imageFile);

      await this.$axios.post(axiosUrl.baseUrl + '/user/update', formData)
          .then(async (res) => {
            this.loading();
            if (res.data.isSuccess) {
              let response = await this.$auth.loginWith('local', {data: {
                  'email' : this.update.email,
                  'password' : this.update.password
                }});
              if (response.data.isSuccess) {
                this.$router.push({name: 'dashboard'});

              } else {
                this.passwordError = response.data.errors;
              }
            }
          })
          .catch(e => {
            if (e.response.status === 400) {
              this.emailError = e.response.data.errors.email;
              this.passwordError = e.response.data.errors.password;
              this.nameError = e.response.data.errors.name;
              this.numberPhoneError = e.response.data.errors.number_phone;
              this.image = e.response.data.errors.image;
            }
          });
      this.loading();
    },
    async loading() {
      let loader = this.$loading.show({
        canCancel: true,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide()
      }, 5000);
    }
  },
};
</script>
