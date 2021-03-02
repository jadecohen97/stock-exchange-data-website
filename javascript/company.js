const companyName = document.getElementById("name");
const logo = document.getElementById("logo");
const description = document.getElementById("description");
const webLink = document.getElementById("webLink");
const stockPrice = document.getElementById("stockPrice");
const urlParams = new URLSearchParams(window.location.search);
const title = document.getElementById("title");
const symbol = urlParams.get("symbol");
function fetchProfile() {
  let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      title.innerHTML = data.profile.companyName;
      companyName.innerHTML = data.profile.companyName;
      const img = document.createElement("img");
      img.src = data.profile.image;
      let src = document.getElementById("logo");
      src.appendChild(img);
      description.innerHTML = data.profile.description;
      let link = document.createElement("a");
      webLink.appendChild(link);
      link.innerHTML = data.profile.website;
      link.setAttribute("href", data.profile.website);
      link.style.color = "black";
      stockPrice.innerText = "Stock Price:" + " $" + data.profile.price;
      const percChange = document.getElementById("percChange");
      let change = data.profile.changesPercentage;
      percChange.innerHTML = change;
      if (change.includes("-")) {
        percChange.style.color = "#e74c3c";
      } else {
        percChange.style.color = "#2ecc71";
      }
    });
}
function fetchHistory() {
  let link = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      let array = [];
      for (let i = 0; i < 12; i++) {
        let dates = data.historical[i * 30].date;
        array.push(dates);
      }
      let reverse = array.reverse();
      let arrayClose = [];
      for (let i = 0; i < 12; i++) {
        let close = data.historical[i * 30].close;
        arrayClose.push(close);
      }
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: reverse,
          datasets: [
            {
              label: "Stock Price History",
              backgroundColor: "darkgrey",
              borderColor: "rgb(85, 83, 83)",
              data: arrayClose,
            },
          ],
        },
        options: {},
      });
    });
}
fetchProfile();
fetchHistory();
