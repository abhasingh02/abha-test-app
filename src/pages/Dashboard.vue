<template>
  <q-layout view="hHh lpR fFf">
    <custom-header header-title="Dashboard"></custom-header>
    <film-reviews></film-reviews>
    <!-- <q-page-container>
      <q-btn
        class="absolute-center"
        to="/filmreviews"
        color="primary"
        label="Reviews"
      />
    </q-page-container> -->

    <!-- <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import userDetails from "../mixins/userDetails";
import { ref } from "vue";
import customHeader from "src/components/customHeader.vue";
import FilmReviews from "src/components/FilmReviews.vue";
export default {
  components: { customHeader, FilmReviews },
  mixins: [userDetails],
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style></style>
