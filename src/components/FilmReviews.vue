<template>
  <q-page-container class="my-card">
    <div class="q-pa-md q-gutter-sm">
      <q-input
        class="col"
        bottom-slots
        outlined
        placeholder="Enter movie name"
        @keydown.enter.prevent="searchKeyword(searchQuery)"
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
        v-model="tabIndexValue"
        class="col bg-primary text-white shadow-2"
      >
        <q-tab name="t_0" label="All movies" />
        <q-tab name="t_5" label="TV" />
        <q-tab name="t_1" label="Popular movies" />
        <q-tab name="t_2">
          <q-btn-dropdown auto-close flat no-caps label="Genre">
            <q-list>
              <q-item
                clickable
                v-close-popup
                v-for="i in genreId.length"
                :key="i"
                @click="selectedGenre(i - 1)"
              >
                <q-item-section>
                  <q-item-label>{{ genreId[i - 1].name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown></q-tab
        >
        <q-tab name="t_3" label="Kids movie" />
        <q-tab name="t_4">
          <q-btn-dropdown auto-close flat no-caps label="Yearwise hit movies">
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
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="teal"
        :max="genreId.length"
        :max-pages="6"
        :boundary-numbers="false"
        direction-links
        @click="clickedPage(current)"
      />
    </div>
    <div class="q-pa-lg" v-if="searchedQuery && searchQuery">
      Searched "{{ searchQuery }}"
    </div>
    <div v-if="responseAvailable == true">
      <div v-for="res in resultQuery" :key="res.id">
        <q-card @click="clicked(res)" class="my-card" bordered>
          <q-card-section horizontal>
            <q-separator vertical />

            <q-img class="col-5" :src="imgUrl + res.backdrop_path" />
            <q-card-section>
              <p v-if="res.original_name">{{ res.original_name }}</p>
              <p>{{ res.original_title }}</p>
              <p v-if="res.first_air_date">{{ res.first_air_date }}</p>

              <p>{{ res.release_date }}</p>
              <q-btn label="Play" color="primary" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import { date } from "quasar";
import { ref } from "vue";
import APILinks from "../mixins/APILinks";
import { computed } from "vue";
import { useStore } from "vuex";
import appstore from "src/store/appstore";
// import customHeader from "src/components/customHeader.vue";
export default {
  mixins: [APILinks],
  // components: { customHeader },
  data() {
    return {
      searchQuery: null,
      searchedQuery: false,
      resources: "",
      responseAvailable: false,
      search: "",
      options: "",
      tabIndexValue: "",
      inputValue: false,
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
    const selGenre = computed({
      get: () => $store.state.appstore.genre,
      set: (val) => {
        $store.commit("appstore/updateGenre", val);
      },
    });
    const savedPage = computed({
      get: () => $store.state.appstore.pPage,
      set: (val) => {
        $store.commit("appstore/savedPage", val);
      },
    });
    return {
      current: ref(1),
      tabInput,
      selYear,
      selGenre,
      savedPage,
    };
  },
  computed: {
    getYear1() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY");
      return formattedString;
    },
    resultQuery() {
      if (this.inputValue) {
        console.log("input value= " + this.searchQuery);
        this.callApi(this.setLink(this.tabInput, this.searchQuery));
        this.searchKeyword();
      }

      return this.resources;
    },
  },
  mounted() {
    this.current = this.pageNo = this.savedPage;
    if (this.tabInput == "t_2") {
      // console.log("genre: " + this.selGenre);
      this.callApi(this.setLink(this.tabInput, this.selGenre));
    } else this.callApi(this.setLink(this.tabInput, this.selYear));
    this.tabIndexValue = this.tabInput;
    // console.log("selected tab: " + this.tabIndexValue + this.tabInput);
  },
  watch: {
    tabIndexValue() {
      // console.log("clicked " + this.tabIndexValue);
      if (this.tabIndexValue != "t_in") this.searchQuery = "";
      if (this.tabInput != this.tabIndexValue) {
        this.pageNo = this.savedPage = this.current = 1;
        this.tabInput = this.tabIndexValue; //change in store
        this.callApi(this.setLink(this.tabInput));
      }
    },
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
          this.responseAvailable = true;
          // console.log("API data", response.data);
          if (response.data.results != undefined)
            this.resources = response.data.results;
          else this.resources = response.data.items;
          console.log(this.resources);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    searchKeyword() {
      this.inputValue = !this.inputValue;
      this.searchedQuery = true;
      this.tabIndexValue = "t_in";
      this.tabInput = this.tabIndexValue;
      console.log("entered");
    },
    selectedYear(selYear) {
      // console.log(selYear);
      this.tabInput = "t_4";
      if (this.selYear != selYear) {
        this.pageNo = this.savedPage = this.current = 1;
        this.selYear = selYear; //change in store
        this.callApi(this.setLink(this.tabInput, this.selYear));
      }
    },
    selectedGenre(gen) {
      console.log("selected genre: " + this.selGenre);
      this.tabInput = "t_2";
      let genId = this.genreId[gen].id;
      if (this.selGenre != genId) {
        this.pageNo = this.savedPage = this.current = 1;
      }
      this.selGenre = genId;
      this.callApi(this.setLink(this.tabInput, this.selGenre));
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
    clickedPage(current) {
      this.savedPage = this.pageNo = current;
      // console.log(this.pageNo);
      this.tabInput = this.tabIndexValue;
      if (this.tabInput == "t_in")
        this.callApi(this.setLink(this.tabInput, this.searchQuery));
      if (this.tabInput == "t_2")
        this.callApi(this.setLink(this.tabInput, this.selGenre));
      if (this.tabInput == "t_4")
        this.callApi(this.setLink(this.tabInput, this.selYear));
      else this.callApi(this.setLink(this.tabInput));
    },
  },
};
</script>

<style lang="sass" scoped></style>
