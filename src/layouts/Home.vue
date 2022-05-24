<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white text-center">
      <q-toolbar>
        <q-toolbar-title> Test App </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="my-card"
      ><login-page></login-page>
    </q-page-container>
    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import LoginPage from "src/components/LoginPage.vue";
export default {
  components: { LoginPage },
};
</script>

<style></style>
