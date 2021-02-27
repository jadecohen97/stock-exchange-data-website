class Marquee{
    constructor(element){
        this.marqueelink = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com//api/v3/actives`;
        this.marquee = element;
    }


getMarqueeInfo() {
    fetch(this.marqueelink)
    .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++){
this.addMarqueeInfo(data, i);
          }
        
        })
}

addMarqueeInfo(data, i){
    const span = document.createElement("span");
    span.classList.add("spans");
    span.innerHTML = `${data[i].ticker}`;
    console.log(data)
    marquee.appendChild(span);
        const priceSpan = document.createElement("span");
        priceSpan.classList.add("priceSpan");
        priceSpan.innerHTML = `$${data[i].price}`;
        marquee.appendChild(priceSpan);
}



}