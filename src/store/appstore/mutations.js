// export function increament(state) {
//   state.count++;
// }

export function selectedTab(state, tabId) {
  console.log(tabId);
  state.tabSelected = tabId;
}
export function updateYear(state, selectedYear) {
  state.year = selectedYear;
}

export function updateGenre(state, genreId) {
  console.log(genreId);
  state.genre = genreId;
}

export function savedPage(state, pageNo) {
  console.log("page: " + pageNo);
  state.pPage = pageNo;
}

export function updateQuery(state, newQuery) {
  console.log("query:", newQuery);
  state.queryVal = newQuery;
}
