<template>
  <v-container>

    <v-layout align-center justify-center >
      <v-flex >
        <v-card>

          <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="$auth.$state.user.name"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Username
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="$auth.$state.user.email"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Email
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="$auth.$state.user.number_phone"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Number Phone
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                  v-model="$auth.$state.user.balance"
              >
                <template v-slot:label>
                  <div class="label-text">
                    Số dư tài khoản
                  </div>
                </template>
              </v-text-field>
              <!-- Here the image preview -->
              <img :src="$auth.$state.user.url_image" height="150"/>
            </v-form>
          </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn color="primary" @click="back()">Quay lại</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "user",
  mounted(){
    console.log('mounted',this.$auth.$state.user);
  },
  methods: {
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
    async back() {
      this.loading();
      this.$router.push({name: 'dashboard'});
    }
  }
}
</script>

<style scoped>

</style>