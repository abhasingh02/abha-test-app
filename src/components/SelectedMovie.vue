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
          <p>{{ selectedMovieName.release_date }}</p>
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
    };
  },
  mounted() {
    console.log(this.selectedMovieName);
  },
  methods: {
    movieLanguage(language) {
      // console.log(language);
      if (language == "en") return "English";
      if (language == "sv") return "Swedish";
      if (language == "ja") return "Japanese";
      if (language == "fr") return "French";
      // if (language == "ch") return "Chinese";
      if (language == "ko") return "Korean";
    },
    movieGenre(genreId) {
      // console.log(genreId);
      const definedGenres = [35, 18, 878, 27];
      let intersection = genreId.filter((x) => definedGenres.includes(x));
      // console.log(intersection);
      if (intersection[0] == null) return "N/A";
      const genres = intersection.map(checkFunction);
      function checkFunction(x) {
        if (x == 878) return "Science Fiction Movie";
        if (x == 35) return "Comedy";
        if (x == 18) return "Drama";
        if (x == 27) return "Horror";
      }
      return genres.toString();
    },
  },
};
</script>

<style></style>
