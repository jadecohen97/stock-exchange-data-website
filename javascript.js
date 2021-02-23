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
      hideSpinner();
      while (resultList.childElementCount > 0) {
        resultList.removeChild(resultList.lastChild);
      }
      for (let i = 0; i < data.length; i++) {
        let profileApi = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
        fetch(profileApi)
          .then((res) => res.json())
          .then((da) => {
            console.log(da.profile);
            let img = `<img src = "${da.profile.image}" style ="width:20px; height:20px">`;
            let a = document.createElement("a");
            resultList.appendChild(a);
            a.innerHTML = `${img} ${data[i].name} (${data[i].symbol}) ${da.profile.changesPercentage}`;
            a.setAttribute(
              "href",
              `/company/company.html?symbol=${data[i].symbol}`
            );
            let newItem = document.createElement("li");
            newItem.appendChild(a);
            resultList.appendChild(newItem);
            hideSpinner();
          });
      }
    });
}
