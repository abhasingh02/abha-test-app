<template>
  <q-header elevated class="bg-primary text-white text-center">
    <q-toolbar>
      <q-btn class="row" flat :to="routePath">{{ routeName }}</q-btn>
      <q-toolbar-title> {{ headerTitle }}</q-toolbar-title>
      <q-btn flat @click="drawer = !drawer" round dense icon="person" />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="drawer">
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section> Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/user-profile">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> Profile</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/settings">
          <q-item-section avatar>
            <q-icon name="manage_accounts" />
          </q-item-section>
          <q-item-section> Manage Accounts </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="removeUser">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section> Logout </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">{{ savedLoginUser.name }}</div>
        <div>{{ savedLoginUser.email }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script>
import userDetails from "../mixins/userDetails";
import { ref } from "vue";

export default {
  mixins: [userDetails],
  props: ["headerTitle", "routePath", "routeName"],
  setup() {
    return {
      drawer: ref(false),
    };
  },
  methods: {
    removeUser() {
      localStorage.setItem("loginUser", JSON.stringify(this.loginUser));
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
