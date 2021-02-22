const button = document.getElementById("button");
const resultList = document.getElementById("resultList");
const input = document.getElementById("input");
button.addEventListener("click", fetchResults);
const spinner = document.getElementById("spinner");
function loadSpinner() {
  spinner.classList.add("spinner-border");
}
function hideSpinner() {
  spinner.classList.remove("spinner-border");
}
function fetchResults() {
    loadSpinner();
  let serverURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`;
  fetch(serverURL)
    .then((response) => response.json())
    .then((data) => {
        while (resultList.childElementCount > 0) {
            resultList.removeChild(resultList.lastChild);
          }
        for (let i = 0; i < data.length; i++){
        let a = document.createElement("a");
        resultList.appendChild(a);
        a.innerHTML = data[i].name + '(' + data[i].symbol + ')';
        a.setAttribute("href",`/company/company.html?symbol=${data[i].symbol}`);
        let newItem = document.createElement("li")
        newItem.appendChild(a);
        resultList.appendChild(newItem);
        hideSpinner();
        }
    });   
}

