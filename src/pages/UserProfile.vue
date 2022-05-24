<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="details"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header>
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
import customHeader from "src/components/customHeader.vue";
export default {
  components: { customHeader },
  mixins: [userDetails],
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style></style>
