let movies = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    image:
      "https://images.moviesanywhere.com/143cdb987186a1c8f94d4f18de211216/fdea56fa-2703-47c1-8da8-70fc5382e1ea.jpg",
    slogan: "Let The Magic Begin.",
    price: 25.95,
    oldprice: 36.99,
    count: 1,
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    image:
      "https://i.pinimg.com/originals/42/de/3e/42de3ec6745614f3d8796ce30467746b.jpg",
    slogan: "Something evil has returned to Hogwarts!",
    price: 24.85,
    oldprice: 59.99,
    count: 1,
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    image: "https://i.ebayimg.com/images/g/NvIAAOSwnL5iOALQ/s-l1600.jpg",
    slogan: "Everything will change.",
    price: 26.95,
    oldprice: 36.75,
    count: 1,
  },
  {
    id: 4,
    title: "The Lord of The Rings",
    image: "https://m.media-amazon.com/images/I/710XTe7ND-L.jpg",
    slogan: "One ring to rule them all",
    price: 25.69,
    oldprice: 69.99,
    count: 1,
  },
  {
    id: 5,
    title: "HIS DARK MATERIALS",
    image: "https://flxt.tmsimg.com/assets/p17378321_b_v13_ab.jpg",
    slogan: "I'll be looking for you",
    price: 19.99,
    oldprice: 38.25,
    count: 1,
  },
  {
    id: 6,
    title: "Spirited Away",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    slogan:
      "Nothing that happens is ever forgotten, even if you can't remember it",
    price: 30.95,
    oldprice: 74.99,
    count: 1,
  },
  {
    id: 7,
    title: "Howl's Moving Castle",
    image:
      "https://cdn.shopify.com/s/files/1/1057/4964/products/Howls-Moving-Castle-Vintage-Movie-Poster-Original-Japanese-B1-28x40-7059_1667b890-f78d-4ce9-b3a5-66e82553ecc5.jpg?v=1628737495",
    slogan: "A Heart's A Heavy Burden",
    price: 29.25,
    oldprice: 56.75,
    count: 1,
  },
  {
    id: 8,
    title: "My Neighbor Totoro",
    image:
      "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
    slogan: "Everybody, try laughing. Then whatever scares you will go away!",
    price: 27.95,
    oldprice: 44.99,
    count: 1,
  },
];

let basket = document.getElementById("basket");
let store = document.getElementById("store");
let hero = document.getElementById("hero-container");
let cash = document.getElementById("cash");
let supTag = document.getElementById("count");
let basket_icon = document.getElementById("basket-icon");

function getLocal(e) {
  let get = JSON.parse(localStorage.getItem(e));
  return get;
}

function setArrLocal(old, item) {
  let get = getLocal(old);
  localStorage.setItem(old, JSON.stringify([...get, item]));
  let getNew = getLocal(old);
  return getNew;
}

function setOne(old, item) {
  let setter = localStorage.setItem(old, JSON.stringify(item));
  return setter;
}

let defaultMoney = getLocal("balance");
if (defaultMoney === null) {
  setOne("balance", 250);
  defaultMoney = getLocal("balance");
  cash.innerHTML = defaultMoney;
} else {
  cash.innerHTML = defaultMoney;
}

if (getLocal("basket") === null) {
  setOne("basket", []);
}

basket_icon.addEventListener("click", () => {
  store.style.display === "none"
    ? (store.style.display = "flex")
    : (store.style.display = "none");
});

if (getLocal("movies") === null) {
 setOne("movies", []);
}

function filmMountWriter() {
  setOne("movies", movies);
  let localmovies = getLocal("movies");
  localmovies.forEach((e) => {
    hero.innerHTML += `    
        <div class="main-container">
            <div class="poster-container">
                <a href="#"><img src="${e.image}" class="poster" /></a>
            </div>
            <div class="ticket-container">
                <div class="ticket__content">
                    <h4 class="ticket__movie-title">${e.title}</h4>
                    <p class="ticket__movie-slogan">
                        ${e.slogan}
                    </p>
                    <p class="ticket__current-price">$<span id="price">${e.price}</span></p>
                    <p class="ticket__old-price">$${e.oldprice}</p>
                    <button onclick=addBasket(${e.id}) class="ticket__buy-btn">Buy now</button>
                </div>
            </div>
        </div> 
        `;
  });
}

function addBasket(e) {
  let myBalance = getLocal("balance");
  let localmovies = getLocal("movies");
  let currentFilm = localmovies.find((item) => item.id === e);

  if (!(myBalance >= currentFilm.price)) {
    alert(
      "Your balance is not enough.\nIf you want to buy other films, please increase your balance in your profile."
    );
  }

  let newBalance = (
    myBalance - currentFilm.price >= 0
      ? myBalance - currentFilm.price
      : myBalance
  ).toFixed(2);

  checkMoney(currentFilm);

  setOne("balance", newBalance);
  let defaultMoney = getLocal("balance");
  cash.innerHTML = defaultMoney;

  counter();
  basketWriter();
}

function checkMoney(currentFilm) {
  let defaultMoney = getLocal("balance");
  defaultMoney >= currentFilm.price && addSimpleBasket(currentFilm);
}

function addSimpleBasket(y) {
  let arr = getLocal("basket");
  let checker = arr.find((x) => x.id === y.id);

  if (checker === undefined) {
    setArrLocal("basket", y);
  } else {
    let newArr = arr.map((z) => {
      if (z.id === y.id) {
        return { ...z, count: z.count + 1 };
      }
      return z;
    });
    setOne("basket", newArr);
  }
}

function counter() {
  let arr = getLocal("basket");
  supTag.textContent = arr.length;
}

function basketWriter() {
  let arr = getLocal("basket");
  store.innerHTML = "";
  arr.forEach((e) => {
    store.innerHTML += `
        <p>${e.title} <span>${e.count}</span>
        <span id='basket-del-btn' onclick='deletedByBasket(${e.id})'>X</span>
        </p>
        `;
  });
}

function deletedByBasket(id) {
  let myBalance = getLocal("balance");

  let arr = getLocal("basket");
  let current = arr.find((e) => e.id == id);

  if (current.count <= 1) {
    let newArr = arr.filter((e) => e.id !== id);
    setOne("basket", newArr);
  } else {
    let newArr = arr.map((e) => {
      if (e.id == id) {
        return { ...e, count: e.count - 1 };
      }
      return e;
    });
    setOne("basket", newArr);
  }

  let newBalance = (+myBalance + current.price).toFixed(2);
  setOne("balance", newBalance);
  let defaultMoney = getLocal("balance");
  cash.innerHTML = defaultMoney;

  basketWriter();
  counter();
}

filmMountWriter();

// -------- Search part --------

if (getLocal("search") === null) {
  setOne("search", "");
}

let input = document.querySelector("#inp-text");
let search_btn = document.querySelector("#search-btn");

input.addEventListener("keyup", writeSearch);
search_btn.addEventListener("click", writeSearch);

function writeSearch() {
    hero.innerHTML = "";
    let localmovies = getLocal("movies");
    localmovies.forEach((e) => {
      let title = e.title.toLowerCase();
      let inpValue = input.value.toLowerCase();
      console.log(title, inpValue)
      if (
        title.includes(inpValue) &&
        inpValue != ""
      ) {
       setOne("search", e);
      let search =getLocal("search");
        hero.innerHTML += `    
        <div class="main-container">
            <div class="poster-container">
                <a href="#"><img src="${search.image}" class="poster" /></a>
            </div>
            <div class="ticket-container">
                <div class="ticket__content">
                    <h4 class="ticket__movie-title">${search.title}</h4>
                    <p class="ticket__movie-slogan">
                        ${search.slogan}
                    </p>
                    <p class="ticket__current-price">$<span id="price">${search.price}</span></p>
                    <p class="ticket__old-price">$${search.oldprice}</p>
                    <button onclick=addBasket(${search.id}) class="ticket__buy-btn">Buy now</button>
                </div>
            </div>
        </div> 
        `;
      }
    });
  
    if (input.value === "") {
      filmMountWriter();
    }
}
