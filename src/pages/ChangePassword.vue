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
          <p v-if="status" class="text-red">{{ status }}</p>
          <!-- <div class="text-h6 text-center">Edit Profile</div> -->
          <q-form @submit.prevent="onSubmit" class="q-gutter-sm">
            <q-input
              type="password"
              v-model="CheckPassword"
              label="Old password"
            >
              <template v-if="matched1" v-slot:append>
                <q-icon name="checked" color="green" />
              </template>
            </q-input>
            <q-input type="password" label="New password" v-model="newPassword"
              ><template v-if="matched2" v-slot:append>
                <q-icon name="checked" color="green" /> </template
            ></q-input>
            <q-input
              type="password"
              label="Confirm password"
              v-model="confirmPassword"
              ><template v-if="matched2" v-slot:append>
                <q-icon name="checked" color="green" /> </template
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
      matched1: false,
      matched2: false,
      status: "",
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
        this.status = "";
        this.matched1 = true;

        if (
          this.newPassword == null ||
          (this.newPassword == "" && this.confirmPassword == "") ||
          this.confirmPassword == null
        ) {
          this.status = "Please type new password";
        } else {
          // console.log("new " + this.newPassword);
          // console.log("confirm " + this.confirmPassword);
          if (this.confirmPassword != this.newPassword) {
            this.status = "New and confirmation password are not same";
          } else {
            const editUserId = this.savedLoginUser.id;
            // console.log(editUserId);
            this.editUser.password = this.newPassword;
            console.log(this.editUser.password);
            this.updateUser(editUserId, this.editUser);
            this.matched2 = true;
            this.status = "Updated";
          }
        }
      } else {
        this.status = "Old password is not correct";
      }
    },
  },
};
</script>

<style></style>
