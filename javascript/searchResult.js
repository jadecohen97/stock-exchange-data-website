class ResultList {
  constructor(element) {
    this.resultList = element;
  }
  fetchResults() {
    fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`
    )
      .then((response) => response.json())
      .then((data) => {
        while (this.resultList.childElementCount > 0) {
          this.resultList.removeChild(this.resultList.lastChild);
        }
        for (let i = 0; i < data.length; i++) {
          let profileApi = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
          fetch(profileApi)
            .then((res) => res.json())
            .then((da) => {
              let img = `<img src = "${da.profile.image}">`;
              let a = document.createElement("a");
              this.resultList.appendChild(a);
                if (da.profile.changes < 0){
                  a.innerHTML = `${img} ${data[i].name.replace(new RegExp(input.value, "gi"), (match) => `<mark>${match}</mark>`)} (${data[i].symbol.replace(new RegExp(input.value, "gi"), (match) => `<mark>${match}</mark>`)}) <span class = "negative">${da.profile.changesPercentage} </span>`;
                }
              else{
                 a.innerHTML = `${img} ${data[i].name.replace(new RegExp(input.value, "gi"), (match) => `<mark>${match}</mark>`)} (${data[i].symbol.replace(new RegExp(input.value, "gi"), (match) => `<mark>${match}</mark>`)}) <span class = "positive">${da.profile.changesPercentage} </span>`;
              }
              a.setAttribute(
                "href",
                `company.html?symbol=${data[i].symbol}`
              );
              let newItem = document.createElement("li");
              newItem.appendChild(a);
              this.resultList.appendChild(newItem);
            });
        }
      });
  }
}
