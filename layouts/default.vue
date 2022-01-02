<template>
  <v-app>
    <Header></Header>
    <nuxt/>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  components: {Footer, Header}
}
</script>

<style scoped>

</style>
