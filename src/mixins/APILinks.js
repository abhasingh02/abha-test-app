export default {
  data() {
    return {
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
      selectedLink: "",
    };
  },
  methods: {
    setLink(tabIn, selYear) {
      if (tabIn == "t_0") {
        this.selectedLink = this.url + this.listLink + this.apiKey;
      }
      if (tabIn == "t_1") {
        this.selectedLink = this.url + this.popularMovieAPI + this.apiKey;
      }
      if (tabIn == "t_2") {
        this.selectedLink = this.url + this.bestMovies + this.apiKey;
      }
      if (tabIn == "t_3") {
        this.selectedLink = this.url + this.kidsMovie + this.apiKey;
      }
      if (tabIn == "t_4") {
        this.selectedLink =
          this.url + this.yearBest1 + selYear + this.yearBest2 + this.apiKey;
      }
      return this.selectedLink;
    },
  },
};
