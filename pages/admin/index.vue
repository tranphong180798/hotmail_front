<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-data-table :fields="fields"></v-data-table>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  layout : 'layout1',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    console.log(store.state.auth.user.role)
    if (store.state.auth.user.role !=='admin') {
      return redirect('/dashboard');
    }
  },
  data() {
    return {
      fields: [
        { source: "id", sortable: true },
        { source: "name", sortable: true },
        { source: "username", sortable: true },
        { source: "email", type: "email" },
        { source: "address", type: "address" },
        "phone",
        { source: "website", type: "url" },
        "company.name",
      ],
    };
  },
};
</script>
