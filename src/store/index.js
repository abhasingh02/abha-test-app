import { createStore } from "vuex";
import appstore from "./appstore";

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      appstore,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
}
