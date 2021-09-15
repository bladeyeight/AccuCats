const $cityName = $('#city-name');
const $temp = $("#temp");
const $feels = $('#feels');
const $weather = $('#weather');
const $input = $('input[type="text"]')
const $catImg = $('#catimg')

function getWeatherData(event){
    
      userInput = $input.val();
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=56f272dd8bbe1d5d168b496cc64bb1a9&units=imperial` 
    }).then(
      (data) => {
          if (data.Response === "False"){
              alert("City not found!");
            }
        console.log(data);
        renderWeather(data);
    
  
      },
      (error) => {
        console.log("Oops something went wrong: ", error);
      }
    );
  }

 function getCatData(event){
      ;
    $.ajax({
        url: `https://api.thecatapi.com/v1/images/search` 
      }).then(
        (catData) => {
            if (catData.Response === "False"){
                alert("Cat not found!");
              }
          console.log(catData);
     renderCat(catData);
    
        },
        (error) => {
          console.log("Oops something went wrong: ", error);
        }
      );
}
function renderCat(catData){
    $catImg.html("");
    $catImg.append(`<img id = "kitty" src = "${catData[0].url}" width = 400 height = 300 />`);
    $("#kitty").css("border-radius", "60%")
    $("#kitty").css("border", "solid 6px pink")
    
}
  function renderWeather(data){
    $cityName.text(data.name);
    $temp.text(data.main.temp);
    $feels.text(data.main.feels_like);
    $weather.text(data.weather[0].main)};

  $('form').on('submit', doAjax);

  async function doAjax(event){
      event.preventDefault();
      await getCatData();
      await getWeatherData();
  }
