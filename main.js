function menuHandler()
{
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    document.querySelector("#close-nav-menu").addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });

}

let greetingtext = "";
let date = new Date(); 
let currentDate = date.getHours();
function greetingHandler()
{
if(currentDate >= 5 && currentDate < 12) 
{
    greetingtext = "Good morning";
}
else if(currentDate >= 12 && currentDate < 18) 
{
    greetingtext = "Good afternoon";
}
else if(currentDate >= 18 && currentDate < 22)
{
    greetingtext = "Good evening";
}
else 
{
    greetingtext = "Good night";
}
document.querySelector("#greeting").innerHTML = greetingtext; 
}

function celsiusToFahr(temperature)
{
    let fahr = (temperature * 9/5) + 32;
    return fahr.toFixed(2);    
}
 
function updateClock()
{
    
let date = new Date();
let timeString = date.toLocaleTimeString();

let dateHrs = String(date.getHours()).padStart(2, '0');
let dateMins = String(date.getMinutes()).padStart(2, '0');
let dateSecs = String(date.getSeconds()).padStart(2, '0');
document.querySelector('[data-time = "hours"]').innerHTML = dateHrs;
document.querySelector('[data-time = "minutes"]').innerHTML = dateMins;   
document.querySelector('[data-time = "seconds"]').innerHTML = dateSecs;
}
setInterval(updateClock, 1000);
updateClock();
 let images = ["./assets/gallery/image1.jpg", "./assets/gallery/image2.jpg", "./assets/gallery/image3.jpg"];
 let currentIndex = 0;
 
 function changeImage() 
{
    imageTag = document.querySelector("#gallery img");
    const thumbnailContainer = document.querySelector(".thumbnails");

  thumbnailContainer.innerHTML = "";
  for (let i = 0; i < images.length; i++) {
    const thumb = document.createElement("img");
    thumb.src = images[i];
    thumb.setAttribute("data-index", i);
    if (i === currentIndex) {
      thumb.setAttribute("data-selected", "true");
    } else {
      thumb.setAttribute("data-selected", "false");
    }
    thumbnailContainer.appendChild(thumb);
  }    
    imageTag.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;   
}
 setInterval(changeImage, 2000);
 changeImage();
 menuHandler();
 greetingHandler();
 
 let products = 
[
{
    title: "AstroFiction",
    author: "John Doe",
    price: 49.90,
    currency: "$",
    image: "./assets/products/img6.png",
    alt: "AstroFiction"
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35.00,
    currency: "$",
    image: "./assets/products/img1.png",
    alt: "Space Odissey"
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    currency: "Free",
    image: "./assets/products/img2.png",
    alt: "Doomed City"
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    currency: "Free",
    image: "./assets/products/img2.png",
    alt: "Doomed City"
  }

];
function updateProductsCount()
{
    totalProducts = products.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totalProducts;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = products.filter(product => product.price === 0).length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = products.filter(product => product.price > 0).length;
    return totalProducts;
}
 updateProductsCount();

function productHandler(products) 
{
    let productsArea = document.querySelector(".products-area");
  for (let i = 0; i < products.length; i++) {
    const product = products[i]; // this is OK now

    // Create main container
    const productDiv = document.createElement("div");
    productDiv.className = "product-item";
        //productDiv.setAttribute("data-price", product.price === 0 ? "free" : "paid");

    // Create image tag
    const img = document.createElement("img");
    img.src = product.image;
    

    // Create product details container
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "product-details";

    // Title
    const title = document.createElement("h3");
    title.className = "product-title";
    title.innerText = product.title;

    // Author
    const author = document.createElement("p");
    author.className = "product-author";
    author.innerText = product.author;

    // Price Label
    const priceTitle = document.createElement("p");
    priceTitle.className = "price-title";
    priceTitle.innerText = "Price";

    // Actual Price
    const price = document.createElement("p");
    price.className = "product-price";
    price.innerText = product.price === 0 ? "Free" : `${product.currency} ${product.price}`;

    // Append all child elements
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(author);
    detailsDiv.appendChild(priceTitle);
    detailsDiv.appendChild(price);

    productDiv.appendChild(img);
    productDiv.appendChild(detailsDiv);

    productsArea.appendChild(productDiv);

  }
}
function filterProducts(products) {
  document.querySelector("#free").addEventListener("click", function () {
    let filtered = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].price === 0) {
        filtered.push(products[i]);
      }
    }
    document.querySelector(".products-area").innerHTML = "";
    productHandler(filtered);        
  });

  document.querySelector("#paid").addEventListener("click", function () {
    let filtered = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].price > 0) {
        filtered.push(products[i]);
      }
    }
    document.querySelector(".products-area").innerHTML = "";
    
    productHandler(filtered); 
  });

  document.querySelector("#all").addEventListener("click", function () {
   
    document.querySelector(".products-area").innerHTML = "";
    productHandler(products); 
  }); 
}
navigator.geolocation.getCurrentPosition(function(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
     getWeather(latitude, longitude);
});
function getWeather(lat, lon) {
  const apiKey = "fdf648efe57f628a8ef13d2510d374c3"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const temperature = data.main.temp;
      const userLocation = data.name;
      const weatherCondition = data.weather[0].description;

      const weatherText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside`; 
      const fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature)}°F outside`;

      document.querySelector("#weather").innerText = weatherText;

      document.querySelector(".weather-group").addEventListener("click", function (e) {
        if (e.target.id === "celsius") {
          document.querySelector("#weather").innerText = weatherText;
        }
        if (e.target.id === "fahr") {
          document.querySelector("#weather").innerText = fahrText;
        }
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
productHandler(products);
filterProducts(products);
