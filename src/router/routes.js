const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("layouts/Home.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("pages/Registration.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("pages/Dashboard.vue"),
    // meta: { transition: "fade" },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: () => import("pages/EditProfile.vue"),
  },
  {
    path: "/user-profile",
    name: "user-profile",
    component: () => import("pages/UserProfile.vue"),
  },
  {
    path: "/change-password",
    name: "change-password",
    component: () => import("pages/ChangePassword.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("pages/Settings.vue"),
    // children: [
    //   {
    //     path: "/change-password",
    //     // name: "change-password",
    //     component: () => import("pages/ChangePassword.vue"),
    //   },
    //   {
    //     path: "/edit-profile",
    //     // name: "edit-profile",
    //     component: () => import("pages/EditProfile.vue"),
    //   },
    // ],
  },
  {
    path: "/filmreviews",
    name: "filmreviews",
    component: () => import("src/pages/FilmReviews.vue"),
  },
  {
    path: "/selectedmovie",
    name: "selectedmovie",
    props: true,
    component: () => import("components/SelectedMovie.vue"),
  },
];

export default routes;
