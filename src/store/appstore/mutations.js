// export function increament(state) {
//   state.count++;
// }

export function selectedTab(state, tabId) {
  console.log(state);
  console.log(tabId);
  state.tabSelected = tabId;
}
