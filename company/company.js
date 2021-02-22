const companyName = document.getElementById("name");
const logo = document.getElementById("logo");
const description = document.getElementById("description");
const webLink = document.getElementById("webLink");
const stockPrice = document.getElementById("stockPrice");

const urlParams= new URLSearchParams(window.location.search);
let symbol = urlParams.get('symbol');
console.log(symbol);
// for (let p of symbol) {
//       console.log(p);
// }

function fetchProfile(){
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
    fetch (url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.profile.companyName);
        companyName.innerHTML = data.profile.companyName;
        const img = document.createElement('img'); 
         img.src = data.profile.image;
         let src = document.getElementById("logo");
        src.appendChild(img);
description.innerHTML = data.profile.description
let link = document.createElement("a");
webLink.appendChild(link);
link.innerHTML = data.profile.website;
link.setAttribute("href",data.profile.website);
stockPrice.innerText = "Stock Price:" + ' $' + data.profile.price;
const percChange = document.getElementById("percChange");
let change = data.profile.changesPercentage;
percChange.innerHTML = change;

    if (change.includes('+')){
        percChange.style.color = "red";
        console.log(change);
    }
    else {
        percChange.style.color = "rgb(93, 192, 93)"
    }
    


        console.log(data);
    });

}
function fetchHistory(){
    let link = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
    fetch (link)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

});


}



fetchProfile();
fetchHistory();