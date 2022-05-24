<template>
  <q-card>
    <q-card-section class="col" align="center">
      <div class="text-h6 text-center">Login</div>
      <q-form @click="newUser = false" @submit="onSubmit" class="q-gutter-md">
        <q-input
          outlined
          type="email"
          class="col"
          label="Email"
          v-model="userDetail.email"
        />
        <q-input
          outlined
          class="col"
          label="Password"
          v-model="userDetail.password"
          :type="isPwd ? 'password' : 'userDetail.password'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            /> </template
        ></q-input>
        <p v-show="newUser" style="color: red">
          User is not registered. Please register !
        </p>
        <q-btn type="submit" class="col" color="primary">Sign In</q-btn>
        <q-btn class="col" color="primary" to="/registration">Register</q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import userDetails from "../mixins/userDetails";
// import { useStore } from "vuex";
import { ref } from "vue";
export default {
  mixins: [userDetails],
  data() {
    return {
      newUser: false,
    };
  },
  setup() {
    return {
      isPwd: ref(true),
      password: ref(""),
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.userDetail);
      this.isNew(this.userDetail);
      console.log(this.userDetail.name);
      if (this.oldUser == true) {
        //existed user
        this.oldUser = false;
        this.$router.push({
          name: "dashboard",
          // params: { username: this.savedLoginUser.name },
        });
      } else {
        this.newUser = true; //new user
        // this.$router.push("/registration");
      }
    },
  },
};
</script>

<style></style>
