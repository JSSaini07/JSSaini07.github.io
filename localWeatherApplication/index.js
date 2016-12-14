
var city='';
var country='';
var tempCelsius='';
var tempFahrenheit='';
var backgrounds={
	'Clear':'https://media.giphy.com/media/lyVNcb1n5Ob0Q/giphy.gif',
	'Clouds':'https://media.giphy.com/media/3yPbhOd3gvJXq/giphy.gif',
	'Rain':'https://media.giphy.com/media/3o6ozmF4ZGOG3DWZyg/giphy.gif',
	'Smoke':'https://media.giphy.com/media/3yPbhOd3gvJXq/giphy.gif',
	'Haze':'https://media.giphy.com/media/hLP8nZ7HmukyA/giphy.gif'
}

$(document).ready(function(){
	$.getJSON('https://ipinfo.io', function(data){
  		city=data.city;
  		country=data.country;
  		$('.city').text(city+', '+country);
  		getWeather();
	});
	$('.degCelsius').on('click',function(){
		if($('.active').hasClass('degFahrenheit')){
			$('.weatherContent').text(tempCelsius);
			$('.active').removeClass('active');
			$('.degCelsius').addClass('active');
		}
	});
	$('.degFahrenheit').on('click',function(){
		if($('.active').hasClass('degCelsius')){
			$('.weatherContent').text(tempFahrenheit);
			$('.active').removeClass('active');
			$('.degFahrenheit').addClass('active');
		}
	});
});

function getWeather() {
  console.log('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&units=metric&appid=f1a3d4344c446b4b097a4c121e4ba71d');
	$.ajax({
		url:'http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&units=metric&appid=f1a3d4344c446b4b097a4c121e4ba71d',
		method:'GET',
		success:function(r){
      console.log(r);
			tempCelsius=parseInt(r.main.temp);
			tempFahrenheit=parseInt((tempCelsius*9)/5)+32;
			$('.weatherContent').text(tempCelsius);
			$('.degCelsius').addClass('active');
			$('.weatherDescription').text(r.weather[0].description)
			$('.weather').css({'display':'inline-block'});
      $('.weather').css({'background':'url("'+backgrounds[r.weather[0].main]+'")','background-size':'100% 94vh','background-repeat':'no-repeat'});
		}
	})
}

