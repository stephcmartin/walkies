let latitude = '';
let longitude = '';
let tempC = '';

$(document).ready(function() {
  $.getJSON('http://ipinfo.io', function(data) {
    console.log('ipin data is', data)
    let location = data.loc.split(',');
    latitude = location[0];
    longitude = location[1];
    getWeather(latitude, longitude);
  })
})

function getWeather(latitude, longitude) {
  let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=d69f2008e97dcdb3702715154c478061';
  console.log('url for location is', url)
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data){
      console.log('data is', data),
      console.log(data.main.temp),
      console.log('the incorrect temperture is', (data.main.temp - 273.15))
    }
  })
}

$("#submitWeather").click(function () {
  event.preventDefault()
  console.log(document.getElementById('countryInput').value)
  $("#location").append(document.getElementById('countryInput').value);
  }
)
