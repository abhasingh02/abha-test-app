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
