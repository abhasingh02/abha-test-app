<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-header elevated class="bg-primary text-white text-center">
      <q-toolbar class="col">
        <q-btn class="row" flat to="filmreviews">Back</q-btn>
        <q-toolbar-title class="absolute-center">
          {{ selectedMovieName.original_title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <custom-header
      :header-title="selectedMovieName.original_title"
      routeName="Back"
      routePath="/dashboard"
    ></custom-header>

    <q-page-container class="my-card">
      <q-card class="my-card" bordered>
        <!-- <q-card-section horizontal> -->
        <q-img class="col-5" :src="imgUrl + selectedMovieName.backdrop_path" />
        <q-card-section>
          <p class="text-bold">{{ selectedMovieName.original_title }}</p>
          <p v-if="selectedMovieName.original_name" class="text-bold">
            {{ selectedMovieName.name }}
          </p>
          <div v-if="selectedMovieName.origin_name">
            <p v-if="selectedMovieName.original_language != 'en'">
              Original name in
              {{ movieLanguage(selectedMovieName.original_language) }} language
              :
              {{ selectedMovieName.original_name }}
            </p>
          </div>
          <p v-if="selectedMovieName.origin_country">
            Origin Country: {{ movieCountry(selectedMovieName.origin_country) }}
          </p>
          <div v-if="selectedMovieName.first_air_date">
            <p>First Air Date: {{ selectedMovieName.first_air_date }}</p>
            <!-- <p>Total Episode: {{ selectedMovieName.networks   }}</p> -->
          </div>
          <div v-else>
            <p>Release Date: {{ selectedMovieName.release_date }}</p>
          </div>
          <p>
            Language:
            {{ movieLanguage(selectedMovieName.original_language) }}
          </p>
          <p>Genre: {{ movieGenre(selectedMovieName.genre_ids) }}</p>
          <p>
            Kids Movie: <slot v-if="!selectedMovieName.adult">Yes</slot>
            <slot v-else>No</slot>
          </p>
          <p>
            Rating: {{ selectedMovieName.vote_average }}/10 (Total Vote :
            {{ selectedMovieName.vote_count }})
          </p>
          <p class="text-justify">Overview: {{ selectedMovieName.overview }}</p>
          <p v-if="selectedMovieName.video">
            <q-btn label="Play" color="primary" />
          </p>
          <p v-else class="text-red">No Video available</p>
        </q-card-section>
        <!-- </q-card-section> -->
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import customHeader from "src/components/customHeader.vue";
import APILinks from "../mixins/APILinks";
export default {
  components: { customHeader },
  props: ["data"],
  mixins: [APILinks],
  data() {
    return {
      selectedMovieName: JSON.parse(this.data),
      imgUrl: "https://image.tmdb.org/t/p/w500",
    };
  },
  mounted() {
    console.log(this.selectedMovieName);
  },
  methods: {
    movieLanguage(language) {
      let languageName = this.languageObj.find((x) => x.acn == language);
      if (languageName == null) return "N\A";
      return Object.values(languageName)[1];
    },
    movieGenre(genreId) {
      if (genreId == "") return "NA";
      const genres = genreId.map((x) => {
        let genresVal = this.genreId.find((ele) => ele.id == x);
        if (genresVal == null) return "N\A";
        return genresVal.name;
      });
      return genres.toString();
    },
    movieCountry(country) {
      console.log(country[0]);
      let countryName = this.countriesArray.find((x) => x.acn == country[0]);
      if (countryName == null) return "N\A";
      return Object.values(countryName)[1];
    },
  },
};
</script>

<style></style>
