<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="Settings"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header>
    <q-page-container v-if="showOp" class="my-card">
      <q-card>
        <!-- <q-card-section class="col" align="center">
          <a flat @click="!showOp" href="#/edit-profile">Edit User Profile</a>
        </q-card-section> -->
        <q-card-section class="col" align="center">
          <q-btn flat @click="!showOp" to="/edit-profile"
            >Edit User Profile</q-btn
          ></q-card-section
        >
        <q-card-section class="col" align="center">
          <q-btn flat @click="!showOp" to="/change-password"
            >Change Password</q-btn
          ></q-card-section
        >
      </q-card>
      <!-- <router-view /> -->
    </q-page-container>
    <!-- <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import userDetails from "src/mixins/userDetails";
import { ref } from "vue";
import customHeader from "src/components/customHeader.vue";
export default {
  components: { customHeader },
  mixins: [userDetails],
  setup() {
    return {
      drawer: ref(false),
    };
  },
  data() {
    return {
      showOp: true,
    };
  },
};
</script>

<style></style>
