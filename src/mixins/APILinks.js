export default {
  data() {
    return {
      url: "https://api.themoviedb.org/4",
      apiKey: "api_key=cc9258a8e7cdd13082a808f2da68d5ad",
      // apiKey: "api_key=12b6e78ca3395639fe15c2a1763dccf0",
      pageNo: 1,
      listLink: "/list/",
      imgUrl: "https://image.tmdb.org/t/p/w500",
      popularMovieAPI: "/discover/movie?sort_by=popularity.desc&page=",
      kidsMovie:
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page=",
      yearBest: "/discover/movie?primary_release_year=",
      selectedLink: "",
      sortByavg: "&sort_by=vote_average.desc",
      genreLink: "/discover/movie?with_genres=",
      popularTV: "/tv/popular?",
      searchKey: "/search/multi?",
      inputQuery: "&language=en-US&include_adult=false&query=",
      genreId: [
        { id: 27, name: " Horror" },
        { id: 10749, name: "Romance" },
        { id: 10762, name: "Kids" },
        { id: 35, name: " Comedy" },
        { id: 10765, name: " Sci-Fi & Fantasy" },
        { id: 10759, name: " Action & Adventure" },
        { id: 14, name: " Fantasy" },
        { id: 16, name: " Animation" },
        { id: 18, name: " Drama" },
        { id: 10751, name: " Family" },
        { id: 28, name: " Action" },
        { id: 80, name: "Crime" },
        { id: 9648, name: " Mystery" },
        { id: 36, name: "History" },
        { id: 37, name: "Western" },
        { id: 53, name: " Thriller" },
        { id: 99, name: " Documentary" },
        { id: 878, name: " Science Fiction" },
        { id: 10402, name: "Music" },
        { id: 10752, name: "War" },
        { id: 12, name: " Adventure" },
        { id: 10763, name: " News" },
        { id: 10764, name: " Reality" },
        { id: 10766, name: " Soap" },
        { id: 10767, name: "Talk" },
        { id: 10768, name: "War & Politics" },
        { id: 10770, name: "TV Movie" },
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
        { acn: "te", lang: "Telugu" },
        { acn: "pt", lang: "Portuguese" },
        { acn: "tl", lang: "Tagalog" },
        { acn: "es", name: "Spanish" },
        { acn: "ru", name: "Russian" },
        { acn: "tr", name: "Turkey" },
        { acn: "pl", name: "Polish" },
      ],
      countriesArray: [
        { acn: "HK", name: "Hongkong" },
        { acn: "US", name: "United State of America" },
        { acn: "BR", name: "Brazil" },
        { acn: "KR", name: "Korea" },
        { acn: "AR", name: "Argentina" },
      ],
    };
  },
  methods: {
    setLink(tabIn, key) {
      console.log("key: " + key);
      if (tabIn == "t_0") {
        this.selectedLink =
          this.url + this.listLink + this.pageNo + "?" + this.apiKey;
      }
      if (tabIn == "t_1") {
        this.selectedLink =
          this.url + this.popularMovieAPI + this.pageNo + "&" + this.apiKey;
      }
      if (tabIn == "t_2") {
        this.selectedLink =
          this.url +
          this.genreLink +
          key +
          "&" +
          this.apiKey +
          "&page=" +
          this.pageNo;
      }
      if (tabIn == "t_3") {
        this.selectedLink =
          this.url + this.kidsMovie + this.pageNo + "&" + this.apiKey;
      }
      if (tabIn == "t_4") {
        this.selectedLink =
          this.url +
          this.yearBest +
          key +
          "&" +
          this.apiKey +
          "&page=1" +
          this.pageNo;
      }
      if (tabIn == "t_5") {
        this.selectedLink =
          this.url +
          this.popularTV +
          this.apiKey +
          "&language=en-US&page=" +
          this.pageNo;
      }
      if (tabIn == "t_in") {
        // &language=en-US&page=1&include_adult=false&query=s
        this.selectedLink =
          this.url +
          this.searchKey +
          this.apiKey +
          this.inputQuery +
          key +
          "&page=" +
          this.pageNo;
      }

      return this.selectedLink;
    },
  },
};
