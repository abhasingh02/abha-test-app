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
          <p v-if="selectedMovieName.original_name" class="text-bold">
            {{ selectedMovieName.name }}
          </p>
          <p v-if="selectedMovieName.original_language != 'en'">
            Original name in
            {{ movieLanguage(selectedMovieName.original_language) }} language :
            {{ selectedMovieName.original_name }}
          </p>
          <p class="text-bold">{{ selectedMovieName.original_title }}</p>
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
export default {
  components: { customHeader },
  props: ["data"],
  data() {
    return {
      selectedMovieName: JSON.parse(this.data),
      imgUrl: "https://image.tmdb.org/t/p/w500",
      definedGenres: [
        { id: 12, name: " Adventure" },
        { id: 14, name: " Fantasy" },
        { id: 16, name: " Animation" },
        { id: 18, name: " Drama" },
        { id: 27, name: " Horror" },
        { id: 28, name: " Action" },
        { id: 35, name: " Comedy" },
        { id: 53, name: " Thriller" },
        { id: 99, name: " Documentary" },
        { id: 878, name: " Science Fiction Movie" },
        { id: 9648, name: " Mystery" },
        { id: 10751, name: " Family" },
        { id: 10763, name: " News" },
        { id: 10764, name: " Reality" },
        { id: 10765, name: " Sci-Fi & Fantasy" },
        { id: 10766, name: " Soap" },
      ],
      languageObj: [
        { acn: "en", Lang: "English" },
        { acn: "sv", lang: "Swedish" },
        { acn: "ja", lang: "Japanese" },
        { acn: "fr", lang: "French" },
        { acn: "cn", lang: "Chinese" },
        { acn: "ko", lang: "Korean" },
        { acn: "ar", lang: "Arabic" },
        { acn: "hi", lang: "Hindi" },
        { acn: "pt", lang: "Portuguese" },
        { acn: "tl", lang: "Tagalog" },
      ],
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
      const genres = genreId.map((x) => {
        let genresVal = this.definedGenres.find((ele) => ele.id == x);
        if (genresVal == null) return "N\A";
        return genresVal.name;
      });
      return genres.toString();
    },
  },
};
</script>

<style></style>
