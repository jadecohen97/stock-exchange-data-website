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
            let img = `<img src = "${da.profile.image}" style ="width:20px; height:20px">`;
            let a = document.createElement("a");
            resultList.appendChild(a);

            a.innerHTML = `${img} ${data[i].name} (${data[i].symbol}) <span class = "changes"> ${da.profile.changesPercentage}</span>`;
            

            // let stockChanges = da.profile.changesPercentage;

            // if (stockChanges.includes("-")) {
            //   stockChanges.style.color = "green";
            // } else {
            //   stockChanges.style.color = "red";
            // }

            // const changes = document.querySelector(".changes");
            // console.log(change.length);
            // // for (let v = 0 ; v < change.length; v++){
            // if (change.includes("-")) {
            //   changes.style.color = "red";
            // } else {
            //   changes.style.color = "rgb(93, 192, 93)";
            // }
            // }

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

const marquee = document.querySelector(".marquee");
function fetchCurrentPrice() {
  let priceAPI = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com//api/v3/actives`
  fetch(priceAPI)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      const span = document.createElement("span");
      span.classList.add("spans");
      span.innerHTML = data[i].ticker;
      marquee.appendChild(span);
      const priceSpan = document.createElement("span");
      priceSpan.classList.add("priceSpan");
      priceSpan.innerHTML = `$${data[i].price}`;
      marquee.appendChild(priceSpan);


      }
    });
  }
fetchCurrentPrice();
