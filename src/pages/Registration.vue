<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white text-center">
      <q-toolbar class="col">
        <q-btn class="row" flat to="/">Back</q-btn>
        <q-toolbar-title class="absolute-center"> Test App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="my-card">
      <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6"></div>
          </q-card-section>

          <q-card-section class="q-pt-none text-red">
            Registration is successfully done
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- <q-dialog v-show="showDialog">
        <p style="color: red">Registration is successfully done</p></q-dialog
      > -->
      <q-card>
        <q-card-section class="col" align="center">
          <div class="text-h6 text-center">New Registration</div>

          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              type="name"
              class="col"
              label="Name"
              outlined
              v-model="userDetail.name"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your name',
              ]"
            />

            <div>
              <p class="col">
                Gender:
                <q-radio
                  left-label
                  class="col"
                  dense
                  v-model="gender"
                  val="male"
                  label=" Male "
                />
                <q-radio
                  left-label
                  class="col"
                  dense
                  v-model="gender"
                  val="female"
                  label=" Female "
                />
                <q-radio
                  left-label
                  class="col"
                  dense
                  v-model="gender"
                  val="other"
                  label=" Other "
                />
              </p>
            </div>
            <q-input
              outlined
              type="number"
              v-model="userDetail.age"
              label="Age"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Age',
                (val) => (val > 0 && val < 100) || 'Please type a real age',
              ]"
            />
            <q-input
              outlined
              type="email"
              class="col"
              label="Email"
              v-model="userDetail.email"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your email',
              ]"
            />
            <q-input
              outlined
              type="password"
              class="col"
              label="Password"
              v-model="userDetail.password"
            />
            <q-input
              outlined
              class="col"
              label="Address"
              v-model="userDetail.address"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your address',
              ]"
            />
            <q-btn
              type="submit"
              class="col"
              label="Sign Up"
              @click="showDialog = true"
              color="primary"
            />
            <q-btn type="reset" class="col" label="Reset" color="primary" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page-container>
    <!-- <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from "vue";
import userDetails from "../mixins/userDetails";
export default {
  mixins: [userDetails],
  setup() {
    return {
      gender: ref(null),
      showDialog: ref(false),
    };
  },
  methods: {
    onSubmit() {
      console.log(this.gender);
      this.userDetail.gender = this.gender;
      this.saveDetails(this.userDetail);
      console.log("submit");
      // this.showDialog = true;
    },
    onReset() {
      this.userDetail.name = "";
      this.userDetail.age = "";
      this.userDetail.email = "";
      this.userDetail.password = "";
      this.userDetail.address = "";
      this.gender = false;
      this.showDialog = false;
    },
  },
};
</script>

<style></style>
