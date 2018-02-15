let latitude = ''
let longitude = ''
// setting time
const time = new Date().getHours()
console.log('time is', time)

if( time >= 6 &&  time <= 12){
  let d = document.querySelector('.day')
  d.innerText = 'Morning'
  }
else if( time > 12 &&  time <= 18){
  let d = document.querySelector('.day')
  d.innerText = 'Day'
  }
 else if( time > 18 &&  time < 22){
  let d = document.querySelector('.day')
  d.innerText = 'Evening'
  }
else{
   let d = document.querySelector('.day')
   d.innerText = 'Night'
 }

// retriving location
$(document).ready(function() {
  $.getJSON('http://ipinfo.io/json', function(data) {
    console.log('ipin data is', data);
    console.log('data.loc is', data.loc);
    console.log(data.region, data.country);
    $(".location").text(data.region);
    $('.location').append(' , ', data.country);
    let location = data.loc.split(',');
    latitude = location[0];
    longitude = location[1];
    getWeather(latitude, longitude);
  })
})

// updating UI
function getWeather(latitude, longitude) {
  let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=d69f2008e97dcdb3702715154c478061';
  console.log('url for location is', url)
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data){
      console.log('data is', data);
      console.log('the incorrect temperture in C is', (data.main.temp - 273.15));
      $(".temp").text(Math.round(data.main.temp - 273.15));
      $('.temp').append('°C');
      console.log('moisture', data.weather[0].main);
      $('.moisture').text(data.weather[0].main);
      console.log('wind data', data.wind.speed);
      $('.w').text(data.wind.speed);
      $('.h').text(data.main.humidity);
      $('.h').append('%');
      decisionLogic(data);
      showWeather(data.weather);
    }
  })
}
function showWeather(conditions){
  console.log('conditions array', conditions);
  conditions.forEach(function(element){
    console.log('element.main is', element.main);
    $("#weather-icon").append(element.main, ', ')
  })
}

function decisionLogic(weatherData){
  if (false){
    $("#message").text('Yes! He is going to be a very happy puppy.')
  } else {
    $("#message").text('No. He has to play inside. 😔')
  }
}

$("#submitWeather").click(function () {
  event.preventDefault()
  console.log(document.getElementById('countryInput').value)
  $("#location").append(document.getElementById('countryInput').value);
  }
)
