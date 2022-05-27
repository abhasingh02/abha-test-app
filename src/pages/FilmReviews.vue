<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="Film Reviews"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header>
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
        <!-- <div class="row"> -->
        <q-tabs
          inline-label
          outside-arrows
          mobile-arrows
          class="bg-primary text-white shadow-2"
        >
          <q-tab
            style="min-width: 180px"
            :color="tabInput == 0 ? 'teal' : 'primary'"
            label="All movies"
            class="col"
            @click="selectLink(0)"
          />
          <q-tab
            style="min-width: 180px"
            :color="tabInput == 1 ? 'teal' : 'primary'"
            label="Popular movies"
            class="col"
            @click="selectLink(1)"
          />
          <q-tab
            style="min-width: 180px"
            :color="tabInput == 2 ? 'teal' : 'primary'"
            label="Highest rated movies"
            class="col"
            @click="selectLink(2)"
          />
          <q-tab
            style="min-width: 180px"
            :color="tabInput == 3 ? 'teal' : 'primary'"
            label="Kids movie"
            class="col"
            @click="selectLink(3)"
          />
          <q-tab>
            <q-btn-dropdown
              style="min-width: 180px"
              flat
              @click="selectLink(4)"
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
            </q-btn-dropdown>
          </q-tab>
        </q-tabs>
      </div>
      <div v-if="responseAvailable == true">
        <div class="text-h6 text-center">
          <p v-if="tabInput === 4">Hit movies in year {{ selYear }}</p>
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
  </q-layout>
</template>

<script>
import { date } from "quasar";
import APILinks from "../mixins/APILinks";
import { computed } from "vue";
import { useStore } from "vuex";
import customHeader from "src/components/customHeader.vue";
export default {
  mixins: [APILinks],
  components: { customHeader },
  data() {
    return {
      searchQuery: null,
      resources: "",
      responseAvailable: false,
      search: "",
      options: "",
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
    console.log(this.tabInput);
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
    selectLink(tabIn) {
      if (this.tabInput != tabIn) {
        this.tabInput = tabIn; //change in store
        this.callApi(this.setLink(tabIn));
        // return this.selectedLink;
      }
    },
    selectedYear(selYear) {
      // console.log(selYear);
      if (this.selYear != selYear) {
        this.selYear = selYear; //change in store
        this.callApi(this.setLink(4, this.selYear));
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
