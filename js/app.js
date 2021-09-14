const $cityName = $('#city-name');
const $temp = $("#temp");
const $feels = $('#feels');
const $weather = $('#weather');
const $input = $('input[type="text"]')
const $catImg = $('#catimg')

function getWeatherData(event){
    event.preventDefault();
      userInput = $input.val();
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=01a0da2a36f369665070a8130312e823&units=imperial` 
    }).then(
      (data) => {
          if (data.Response === "False"){
              alert("City not found!");
            }
        console.log(data);
        $(document).ajaxStop(renderWeather(data));
  
      },
      (error) => {
        console.log("Oops something went wrong: ", error);
      }
    );
  }

  function getCatData(event){
      event.preventDefault();
    $.ajax({
        url: `https://api.thecatapi.com/v1/images/search` 
      }).then(
        (catData) => {
            if (catData.Response === "False"){
                alert("Cat not found!");
              }
          console.log(catData);
          $(document).ajaxStop(renderCat(catData));
    
        },
        (error) => {
          console.log("Oops something went wrong: ", error);
        }
      );
}
function renderCat(catData){
    $catImg.prepend(`<img src = "${catData[0].url}" />`)
}
  function renderWeather(data){
    $cityName.text(data.name);
    $temp.text(data.main.temp);
    $feels.text(data.main.feels_like);
    $weather.text(data.weather[0].main)};

    $('form').on('submit', getWeatherData, getCatData);
