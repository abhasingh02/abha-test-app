<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="Edit Profile"
      routeName="Back"
      routePath="/settings"
    ></custom-header>
    <q-page-container class="my-card">
      <q-card>
        <q-card-section class="col" align="center">
          <!-- <div class="text-h6 text-center">Edit Profile</div> -->
          <q-form @submit="onSubmit" class="q-gutter-sm">
            <q-input
              outlined
              label="Name"
              v-model="editUser.name"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your name',
              ]"
            />
            <div>
              <p>
                Gender:
                <q-radio
                  left-label
                  class="col-4"
                  dense
                  v-model="gender"
                  val="male"
                  label=" Male "
                />
                <q-radio
                  left-label
                  class="col-4"
                  dense
                  v-model="gender"
                  val="female"
                  label=" Female "
                />
                <q-radio
                  left-label
                  class="col-4"
                  dense
                  v-model="gender"
                  val="other"
                  label=" Other "
                />
              </p>
            </div>
            <q-input
              outlined
              label="Age"
              type="number"
              v-model="editUser.age"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Age',
                (val) => (val > 0 && val < 100) || 'Please type a real age',
              ]"
            />
            <!-- <q-input
              outlined
              label="Email"
              v-model="editUser.email"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your email',
              ]"
            /> -->
            <!-- <q-input
              outlined
              label="Password"
              v-model="password"
              :type="isPwd ? 'password' : 'editUser.password'"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your address',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input> -->
            <q-input
              outlined
              label="Address"
              v-model="editUser.address"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Type Your address',
              ]"
            />
            <p v-show="showStatus" class="h6-text text-red text-bold">
              Updated
            </p>
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
import { ref } from "vue";
import userDetails from "../mixins/userDetails";
import customHeader from "src/components/customHeader.vue";
export default {
  mixins: [userDetails],
  components: { customHeader },
  setup() {
    return {
      gender: ref(null),
      isPwd: ref(true),
      password: ref(""),
      drawer: ref(false),
    };
  },
  data() {
    return {
      editUser: "",
      showStatus: false,
    };
  },
  mounted() {
    this.editUser = this.savedLoginUser;
    console.log(this.editUser);
    this.gender = this.editUser.gender;
  },
  methods: {
    onSubmit() {
      console.log(this.gender);
      this.savedLoginUser.gender = this.gender;
      const editUserId = this.savedLoginUser.id;

      console.log(editUserId);
      this.updateUser(editUserId, this.editUser);
      // const editUserIndex = this.savedDetails.findIndex(
      //   (x) => x.id == editUserId
      // );
      // console.log(editUserIndex);
      // localStorage.setItem("loginUser", JSON.stringify(this.savedLoginUser));
      // this.savedDetails[editUserIndex] = this.savedLoginUser;
      // console.log(this.savedLoginUser);
      // console.log(this.savedDetails);

      // localStorage.setItem("data", JSON.stringify(this.savedDetails));
      console.log("submit");
      this.showStatus = true;
    },
  },
};
</script>

<style></style>
