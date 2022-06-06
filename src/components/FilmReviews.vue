<template>
  <!-- <custom-header
      header-title="Film Reviews"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header> -->
  <q-page-container class="my-card">
    <div class="q-pa-md q-gutter-sm">
      <q-input
        class="col"
        bottom-slots
        outlined
        placeholder="Enter movie name"
        v-model="searchQuery"
        ><template v-slot:append> <q-icon name="search" /> </template
      ></q-input>
      <q-tabs
        outside-arrows
        mobile-arrows
        active-bg-color="teal"
        indicator-color="transparent"
        no-caps
        ref="tabsVal"
        v-model="tabIndexValueTREst"
        class="bg-primary text-white shadow-2"
      >
        <q-tab name="t_0" label="All movies" />
        <q-tab name="t_1" label="Popular movies" />
        <q-tab name="t_2" label="Highest rated movies" />
        <q-tab name="t_3" label="Kids movie" />
        <q-tab name="t_4">
          <q-btn-dropdown
            auto-close
            stretch
            flat
            :style="
              tabInput == 't_4'
                ? 'background-color: teal'
                : 'background-color: primary'
            "
            no-caps
            label="Yearwise hit movies"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                v-for="i in 12"
                :key="i"
                @click="selectedYear(getYear1 - i + 1)"
              >
                <q-item-section>
                  <q-item-label>{{ getYear1 - i + 1 }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown></q-tab
        >
      </q-tabs>
    </div>
    <div v-if="responseAvailable == true">
      <div class="text-h6 text-center">
        <p v-if="tabInput == 't_4'">Hit movies in year {{ selYear }}</p>
      </div>

      <div v-for="res in resultQuery" :key="res.id">
        <q-card @click="clicked(res)" class="my-card" bordered>
          <q-card-section horizontal>
            <q-separator vertical />

            <q-img class="col-5" :src="imgUrl + res.backdrop_path" />
            <q-card-section>
              <p>{{ res.original_title }}</p>
              <p>{{ res.release_date }}</p>
              <q-btn label="Play" color="primary" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page-container>
  <!-- </q-layout> -->
</template>

<script>
import { date } from "quasar";
import { ref } from "vue";
import APILinks from "../mixins/APILinks";
import { computed } from "vue";
import { useStore } from "vuex";
// import customHeader from "src/components/customHeader.vue";
export default {
  mixins: [APILinks],
  // components: { customHeader },
  data() {
    return {
      searchQuery: null,
      resources: "",
      responseAvailable: false,
      search: "",
      options: "",
      tabIndexValueTREst: "",
    };
  },
  setup() {
    const $store = useStore();
    const tabInput = computed({
      get: () => $store.state.appstore.tabSelected,
      set: (val) => {
        $store.commit("appstore/selectedTab", val);
      },
    });
    const selYear = computed({
      get: () => $store.state.appstore.year,
      set: (val) => {
        $store.commit("appstore/updateYear", val);
      },
    });
    return {
      tabInput,
      selYear,
    };
  },
  computed: {
    getYear1() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY");
      return formattedString;
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.resources.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.resources;
      }
    },
  },
  mounted() {
    this.callApi(this.setLink(this.tabInput, this.selYear));
    this.tabIndexValueTREst = this.tabInput;
    console.log("selected tab: " + this.tabIndexValueTREst + this.tabInput);
  },
  watch: {
    tabIndexValueTREst() {
      console.log(this.tabInput);
      console.log("clicked" + this.tabIndexValueTREst);
      if (this.tabInput != this.tabIndexValueTREst) {
        this.tabInput = this.tabIndexValueTREst; //change in store
        console.log(this.tabInput);
        this.callApi(this.setLink(this.tabInput));
      }
    },
    // selYear() {
    //   this.tabIndexValueTREst = "";
    //   this.tabInput = "t_4";
    //   this.callApi(this.setLink(this.tabInput, this.selYear));
    // },
  },
  methods: {
    callApi(link) {
      var axios = require("axios").default;
      this.options = {
        method: "GET",
        url: link,
      };
      axios
        .request(this.options)
        .then((response) => {
          // console.log(response.data);
          this.responseAvailable = true;
          this.resources = response.data.results;
          // console.log(this.resources);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    selectedYear(selYear) {
      this.tabIndexValueTREst = "";
      console.log(selYear);
      this.tabInput = "t_4";
      if (this.selYear != selYear) {
        this.selYear = selYear; //change in store
        this.callApi(this.setLink(this.tabInput, this.selYear));
      }
    },
    clicked(selMovie) {
      const sendData = JSON.stringify(selMovie);
      // console.log(selMovie);
      this.$router.push({
        name: "selectedmovie",
        params: { data: sendData },
      });
      // console.log(selMovie.original_title);
    },
  },
};
</script>

<style></style>
