import { uid } from "quasar";
let userId = uid();
export default {
  data() {
    return {
      Users: [],
      userDetail: {
        id: null,
        name: "",
        age: null,
        email: "",
        password: "",
        gender: "",
        address: "",
      },
      // loginUserId: "",
      oldUser: false,
      savedDetails: JSON.parse(localStorage.getItem("data")),
      loginUser: "",
      savedLoginUser: JSON.parse(localStorage.getItem("loginUser")),
    };
  },
  methods: {
    saveDetails(newDetail) {
      newDetail.id = userId;
      debugger;
      if (this.savedDetails != (null || undefined)) {
        console.log(this.savedDetails);
        this.Users = this.savedDetails;
        this.Users.push(newDetail);
        console.log(this.Users);
      } else this.Users[0] = newDetail;
      localStorage.setItem("data", JSON.stringify(this.Users));
      console.log(this.savedDetails);
    },

    isNew(newDetail) {
      if (this.savedDetails != (null || undefined)) {
        this.loginUser = this.savedDetails.find(
          (x) => x.email == newDetail.email
        );
        if (this.loginUser != null) {
          this.oldUser = true;
          localStorage.setItem("loginUser", JSON.stringify(this.loginUser));
          console.log(this.savedLoginUser);
        }
      }
    },
    updateUser(editUserId, editUser) {
      const editUserIndex = this.savedDetails.findIndex(
        (x) => x.id == editUserId
      );
      console.log(editUserIndex);
      this.savedDetails[editUserIndex] = editUser;
      console.log(this.editUser);
      console.log(this.savedDetails);
      localStorage.setItem("loginUser", JSON.stringify(editUser));
      localStorage.setItem("data", JSON.stringify(this.savedDetails));
    },
  },
};
