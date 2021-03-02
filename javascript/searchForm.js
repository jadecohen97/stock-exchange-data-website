class SearchForm {
  constructor(element) {
    this.searchBar = element;
  }
  newSearchBar() {
    let btn = document.createElement("button");
    btn.setAttribute("id", "button");
    btn.setAttribute("class", "btn btn-outline-light");
    btn.innerText = "search";
    let input = document.createElement("input");
    input.setAttribute("id", "input");
    input.type = "text";
    input.placeholder = "seach for company stock symbol";
    this.searchBar.appendChild(input);
    this.searchBar.appendChild(btn);
  }
}
