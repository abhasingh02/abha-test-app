export default {
  data() {
    return {
      url: "https://api.themoviedb.org/4",
      // apiKey: "api_key=cc9258a8e7cdd13082a808f2da68d5ad",
      apiKey: "api_key=12b6e78ca3395639fe15c2a1763dccf0",
      listLink: "/list/1?",
      imgUrl: "https://image.tmdb.org/t/p/w500",
      popularMovieAPI: "/discover/movie?sort_by=popularity.desc&",
      kidsMovie:
        "/discover/movie?certification_country=IN&certification.lte=G&sort_by=popularity.desc&",
      yearBest1: "/discover/movie?primary_release_year=",
      yearBest2: "&sort_by=vote_average.desc&",
      selectedLink: "",
      genreId:
        "https://api.themoviedb.org/3/genre/tv/list?api_key=12b6e78ca3395639fe15c2a1763dccf0&language=en-US",
      popularTV: "/discover/tv?sort_by=popularity.desc&",
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
      // if (tabIn == "t_2") {
      //   this.selectedLink = this.genreId;
      // }
      if (tabIn == "t_3") {
        this.selectedLink = this.url + this.kidsMovie + this.apiKey;
      }
      if (tabIn == "t_4") {
        this.selectedLink =
          this.url + this.yearBest1 + selYear + this.yearBest2 + this.apiKey;
      }
      if (tabIn == "t_5") {
        console.log("tv selected");
        this.selectedLink = this.url + this.popularTV + this.apiKey;
      }

      return this.selectedLink;
    },
  },
};
