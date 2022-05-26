<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="Film Reviews"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header>
    <q-page-container class="my-card">
      <!-- <q-slide-item @left="onLeft" @right="onRight">
        <template v-slot:left>
          <q-btn>hello1</q-btn>
         <q-icon name="donq-btne" />
        </template>

        <q-item>
          <q-btn>hello2</q-btn>
        </q-item>
      </q-slide-item> -->
      <q-input
        class="col-5"
        bottom-slots
        outlined
        placeholder="Enter movie name"
        v-model="searchQuery"
        ><template v-slot:append> <q-icon name="search" /> </template
      ></q-input>
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          :color="tabInput == 0 ? 'teal' : 'primary'"
          label="All movies"
          class="col"
          @click="selectLink(0)"
        />
        <q-btn
          :color="tabInput == 1 ? 'teal' : 'primary'"
          label="Popular movies"
          class="col"
          @click="selectLink(1)"
        />
        <q-btn
          :color="tabInput == 2 ? 'teal' : 'primary'"
          label="Highest rated movies"
          class="col"
          @click="selectLink(2)"
        />
        <q-btn
          :color="tabInput == 3 ? 'teal' : 'primary'"
          label="Kids movie"
          class="col"
          @click="selectLink(3)"
        />
        <q-btn-dropdown
          :color="tabInput == 4 ? 'teal' : 'primary'"
          @click="selectLink(4)"
          label="Yearwise hit movies"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="i in 12"
              :key="i"
              @click="selectedYear(i)"
            >
              <q-item-section>
                <q-item-label>{{ i + 2010 }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div v-if="responseAvailable == true">
        <div class="text-h6 text-center">
          <p v-if="tabInput === 4">Hit movies in year {{ year }}</p>
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

    return {
      tabInput,
    };
  },
  computed: {
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
    this.callApi();
    console.log(this.tabInput);
  },
  methods: {
    callApi() {
      var axios = require("axios").default;
      this.options = {
        method: "GET",
        url: this.selectedLink,
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
    selectLink(tabInput) {
      if (this.tabInput != tabInput) {
        this.tabInput = tabInput;
        if (tabInput == 0) {
          this.selectedLink = this.url + this.listLink + this.apiKey;
        }
        if (tabInput == 1) {
          this.selectedLink = this.url + this.popularMovieAPI + this.apiKey;
        }
        if (tabInput == 2) {
          this.selectedLink = this.url + this.bestMovies + this.apiKey;
        }
        if (tabInput == 3) {
          this.selectedLink = this.url + this.kidsMovie + this.apiKey;
        }
        if (tabInput == 4) {
          this.selectedLink = this.url + this.kidsMovie + this.apiKey;
        }
        this.callApi();
        return this.selectedLink;
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
    selectedYear(no) {
      if (no != this.year - 2010) {
        this.year = no + 2010;
        // console.log(year);
        this.selectedLink =
          this.url + this.yearBest1 + this.year + this.yearBest2 + this.apiKey;
        this.callApi();
        return this.selectedLink;
      }
    },
  },
};
</script>

<style></style>
