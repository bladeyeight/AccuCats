const $cityName = $('#city-name');
const $temp = $("#temp");
const $feels = $('#feels');
const $input = $('input[type="text"]')
const $catImg = $('#catimg')
const $label1 = $('#label1')
const $label2 = $('#label2')
const $label3 = $('#label3')

function getWeatherData(event){
    
      userInput = $input.val();
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=56f272dd8bbe1d5d168b496cc64bb1a9&units=imperial` 
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
    $("#kitty").css("display", "block")
    $("#kitty").css("margin-left", "auto")
    $("#kitty").css("margin-right", "auto")
    $("#kitty").css("position", "relative")
    $("#kitty").css("bottom", "30px")
    
}
  function renderWeather(data){
      $label1.text("Weather:  ");
      $label2.text("Temperature:  ");
      $label3.text("Feels Like:  ");
    $cityName.text(data.weather[0].description);
    $temp.text(data.main.temp);
    $feels.text(data.main.feels_like);
  }

  $('form').on('submit', doAjax);

  async function doAjax(event){
      event.preventDefault();
      await getCatData();
      await getWeatherData();
  }
