const marquee = document.querySelector(".marquee");
const myMarquee = new Marquee(marquee);
myMarquee.getMarqueeInfo();
const searchBar = document.querySelector(".searchBar");
const form = new SearchForm(searchBar);
form.newSearchBar();
const resultList = document.getElementById("resultList");
const results = new ResultList(resultList);
results.fetchResults();
button.addEventListener("click", () => {
  results.fetchResults();
});
