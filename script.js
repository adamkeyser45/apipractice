var cityNameTitle = document.querySelector("#cityNameTitle");
var newsTitle = document.querySelector("#newsTitle");
var newsDescrip = document.querySelector("#newsDescrip");
var newsURL = document.querySelector("#newsURL");
var newsImg = document.querySelector("#newsImg");
var newsBtn = document.querySelector("#newsBtn");
var cityInput = document.querySelector("#city");
var search = document.querySelector("#user-form");


// function when button is clicked
var citySearch = function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();
    
    // check if the name is good
    if (cityName) {
        //send to the getData Function
        getData(cityName);
        search.value = "";
    } else {
        alert("Please enter an actual city name");
    }
};

var getData = function(cityName) {

    // url to fetch with the searched city name
    var apiUrl = "https://gnews.io/api/v3/search?q=" + cityName + "&token=4ccdaf26cc2857fd5d937371daceb613";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            //send parsed JSON data to displayNewsData() function to display to page
            response.json().then(function(data) {
                displayNewsData(data, cityName);
                });
        } else {
                alert("Error: " + response.statusText);
        };
    });
};

// displays info to page
var displayNewsData = function(data, cityName) {
    // console logs the first article about the searched city
    console.log(data.articles[0]);

    // Displays the city's name, the title of the article, a description of the article, the URL to the article, and the main article img
    cityNameTitle.textContent = cityName;
    newsTitle.textContent = data.articles[0].title;
    newsDescrip.textContent = data.articles[0].description;
    newsURL.textContent = data.articles[0].url;
    newsImg.setAttribute("src", data.articles[0].image);
};

newsBtn.addEventListener("click", citySearch);