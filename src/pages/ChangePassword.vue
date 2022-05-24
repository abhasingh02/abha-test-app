<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="Change Password"
      routeName="Back"
      routePath="/settings"
    ></custom-header>
    <q-page-container class="my-card">
      <q-card>
        <q-card-section class="col" align="center">
          <!-- <div class="text-h6 text-center">Edit Profile</div> -->
          <q-form @submit.prevent="onSubmit" class="q-gutter-sm">
            <q-input
              type="password"
              v-model="CheckPassword"
              label="Old password"
            ></q-input>
            <q-input
              type="password"
              label="New password"
              v-model="newPassword"
            ></q-input>
            <q-input
              type="password"
              label="Confirm password"
              v-model="confirmPassword"
            ></q-input>
            <q-btn type="submit" label="Update" color="primary" />
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
  data() {
    return {
      CheckPassword: "",
      confirmPassword: "",
      newPassword: "",
      editUser: "",
    };
  },
  mounted() {
    console.log(this.savedLoginUser.password);
    this.editUser = this.savedLoginUser;
    console.log(this.editUser);
  },
  methods: {
    onSubmit() {
      // console.log(this.CheckPassword);
      // console.log(this.savedLoginUser.password);
      const OldPassword = this.savedLoginUser.password;

      if (this.CheckPassword == OldPassword) {
        // console.log("ok old password matched");
        // console.log("new " + this.newPassword);
        // console.log("confirm " + this.confirmPassword);
        if (this.confirmPassword == this.newPassword) {
          console.log("new matched");
          const editUserId = this.savedLoginUser.id;
          console.log(editUserId);
          this.editUser.password = this.newPassword;
          console.log(this.editUser.password);
          this.updateUser(editUserId, this.editUser);
        }
      } else {
        console.log("not matched");
      }
    },
  },
};
</script>

<style></style>
