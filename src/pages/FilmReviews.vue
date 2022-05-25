<template>
  <q-layout view="hHh lpR fFf">
    <custom-header
      header-title="Film Reviews"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header>
    <q-page-container class="my-card">
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
        <!-- <q-btn
          :color="tabInput == 4 ? 'teal' : 'primary'"
          label="Yearwise hit movies"
          class="col"
          @click="selectLink(4)"
        /> -->
        <!-- <div class="q-pa-md"> -->
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
          <p>{{ categoryOfMovies }}</p>
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
import customHeader from "src/components/customHeader.vue";
// import { version } from "vue";

export default {
  components: { customHeader },
  data() {
    return {
      fname: "",
      sname: "",
      searchQuery: null,
      searchQuery2: null,
      resources: "",
      responseAvailable: false,
      tabInput: 0,
      articleId: "",
      search: "",
      categoryOfMovies: "",
      options: { method: "GET", url: null },
      url: "https://api.themoviedb.org/4",
      apiKey: "api_key=cc9258a8e7cdd13082a808f2da68d5ad",
      listLink: "/list/1?",
      imgUrl: "https://image.tmdb.org/t/p/w500",
      popularMovieAPI: "/discover/movie?sort_by=popularity.desc&",
      kidsMovie:
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&",
      bestMovies:
        "/discover/movie?primary_release_year=2020&sort_by=vote_average.desc&",
      yearBest1: "/discover/movie?primary_release_year=",
      yearBest2: "&sort_by=vote_average.desc&",
      selectedLink:
        "https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=cc9258a8e7cdd13082a808f2da68d5ad",
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
    // console.log(this.tabInput);
    this.callApi();
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
          this.categoryOfMovies = "";
        }
        if (tabInput == 1) {
          this.selectedLink = this.url + this.popularMovieAPI + this.apiKey;
          this.categoryOfMovies = "Popular Movies";
        }
        if (tabInput == 2) {
          this.selectedLink = this.url + this.bestMovies + this.apiKey;
          this.categoryOfMovies = "High Rated Movies Movies";
        }
        if (tabInput == 3) {
          this.selectedLink = this.url + this.kidsMovie + this.apiKey;
          this.categoryOfMovies = "Kids Movies";
        }
        if (tabInput == 4) {
          this.selectedLink = this.url + this.kidsMovie + this.apiKey;
          this.categoryOfMovies = "Year wise hit movies";
        }
        console.log("tab input value= ", this.tabInput);
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
      const year = no + 2010;
      // console.log(year);
      this.selectedLink =
        this.url + this.yearBest1 + year + this.yearBest2 + this.apiKey;
      this.callApi();
      return this.selectedLink;
    },
  },
};
</script>

<style></style>
