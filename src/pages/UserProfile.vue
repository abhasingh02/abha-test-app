<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white text-center">
      <q-toolbar>
        <q-btn class="row" flat to="/dashboard">Home</q-btn>
        <q-toolbar-title> Profile </q-toolbar-title>
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
          <q-item clickable v-ripple to="/user-profile">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Profile</q-item-section>
          </q-item>

          <!-- <q-item clickable v-ripple to="/edit-profile">
            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>
            <q-item-section> Edit </q-item-section>
          </q-item> -->
          <q-item clickable v-ripple to="/settings">
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>
            <q-item-section> Manage Accounts </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/">
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
    <q-page-container class="my-card">
      <q-card>
        <q-card-section class="col" align="center">
          <div class="q-pa-md">
            <q-list bordered separator>
              <q-item class="text-left"
                ><q-item-section class="col-3 text-bold">Name: </q-item-section
                ><q-item-section>: {{ savedLoginUser.name }}</q-item-section>
              </q-item>
              <q-item class="text-left">
                <q-item-section class="col-3 text-bold">Age</q-item-section>
                <q-item-section> : {{ savedLoginUser.age }}</q-item-section>
              </q-item>
              <q-item class="text-left"
                ><q-item-section class="col-3 text-bold"
                  >Email:
                </q-item-section>
                <q-item-section
                  >: {{ savedLoginUser.email }}
                </q-item-section></q-item
              >
              <q-item class="text-left"
                ><q-item-section class="col-3 text-bold"
                  >Gender: </q-item-section
                ><q-item-section
                  >: {{ savedLoginUser.gender }}</q-item-section
                ></q-item
              >
              <q-item class="text-left"
                ><q-item-section class="col-3 text-bold"
                  >Address:</q-item-section
                >
                <q-item-section
                  >: {{ savedLoginUser.address }}
                </q-item-section></q-item
              >
            </q-list>
          </div>
        </q-card-section>
      </q-card></q-page-container
    >
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
export default {
  mixins: [userDetails],
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style></style>
