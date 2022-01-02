<template>
  <v-card>
    <v-card-title>
      <v-breadcrumbs
        :items="items"
        divider="/"
      ></v-breadcrumbs>
    </v-card-title>
    <v-toolbar flat>
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title>
        List User
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn>
        <nuxt-link to="/product">
          <v-icon> mdi-account-multiple-plus</v-icon>
        </nuxt-link>
        Create
      </v-btn>

      <v-btn>
        <v-icon> mdi-arrow-down-bold-circle-outline</v-icon>
        Export
      </v-btn>
    </v-toolbar>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-data-table
          style="background-color: #dbdee0"
          table
          table-hover
          table-striped
          table-bordered
          :headers="headers"
          hide-default-footer
          class="elevation-1 paddingForm my-border"
        >

        </v-data-table>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "index",
  props: ["resource", "title"],
  layout: 'layout1',
  data() {
    return {
      headers: [
        {
          text: "Tài khoản",
          value: "name",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Mô tả",
          value: "description",
          class: "blue lighten-2",
          align: "center"
        },
        {
          text: "Giá",
          value: "price",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Tồn kho",
          value: "amount",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "",
          value: "actions",
          class: "blue lighten-2",
          align: "center",
        }
      ],
      items: [
        {
          text: 'Admin',
          disabled: true,
          href: '/admin',
        },
        {
          text: 'Account',
          disabled: true,
          href: '/admin/account',
        },
        {
          text: 'list',
          disabled: true,
        },
      ]
    };
  },
}
</script>

<style scoped>

</style>
