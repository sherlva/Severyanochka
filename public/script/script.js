const startnumbers = document.querySelectorAll("#stars");
let cartStars = document.querySelectorAll(".cart_stars");

const cartPrice = document.querySelectorAll(".with_card_price");

cartPrice.forEach((item) => {
  const price = +item.getAttribute("data-price");
  const discount = +item.getAttribute("data-discount");

  item.innerHTML = price - (price / 100) * discount + " ₽";
});

const starHTML = `<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M6.10326 0.816985C6.47008 0.0737389 7.52992 0.0737404 7.89674 0.816986L9.11847 3.29249C9.26413 3.58763 9.5457 3.7922 9.87141 3.83953L12.6033 4.2365C13.4235 4.35568 13.751 5.36365 13.1575 5.94219L11.1807 7.8691C10.945 8.09884 10.8375 8.42984 10.8931 8.75423L11.3598 11.4751C11.4999 12.292 10.6424 12.9149 9.90881 12.5293L7.46534 11.2446C7.17402 11.0915 6.82598 11.0915 6.53466 11.2446L4.09119 12.5293C3.35756 12.9149 2.50013 12.292 2.64024 11.4751L3.1069 8.75423C3.16254 8.42984 3.05499 8.09884 2.81931 7.8691L0.842496 5.94219C0.248979 5.36365 0.576491 4.35568 1.39671 4.2365L4.12859 3.83953C4.4543 3.7922 4.73587 3.58763 4.88153 3.29249L6.10326 0.816985Z"
    fill="#FF6633" />
</svg>`;

for (let i = 0; i < startnumbers.length; i++) {
  let numStart = startnumbers[i].value;
  for (let j = 1; j <= numStart; j++) {
    const span = document.createElement("span");
    span.innerHTML = starHTML;
    cartStars[i].append(span);
  }
}


function openCity(evt, cityName) {
  var i, content_changes, location_nav_name;

  content_changes = document.getElementsByClassName("content_changes");
  for (i = 0; i < content_changes.length; i++) {
    content_changes[i].style.display = "none";
  }

  location_nav_name = document.getElementsByClassName("location_nav_name");
  for (i = 0; i < location_nav_name.length; i++) {
    location_nav_name[i].className = location_nav_name[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();  