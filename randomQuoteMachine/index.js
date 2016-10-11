

$(document).ready(function(){
	generateQuote();
	$(window).on('resize',function(){reposition()});
	$('.next').on('click',function(){generateQuote()});
});

colors=['#F95759','#f1c40f','#27ae60','#2980b9'];

function generateQuote() {
	$.ajax({
		url:'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
		method:'POST',
		headers:{
			"X-Mashape-Key":"i7thVRv5xjmshyw6z3CjfjM0G8UPp1cCM9bjsnm7u10gCoNDBW"
		},
		success:function(r){
			r=JSON.parse(r);
			$('.quoteContainer').height($('.container').outerHeight);
			$('.quoteText').text(r.quote);
			$('.name').text(r.author);
			color=colors[parseInt((Math.random()*1234)%colors.length)];
			$('.quoteContainer').css({'display':'inline-block','color':color,'border':'2px solid '+color});
			reposition();
		}
	});
}

function reposition() {
	height=$('.quoteContainer').outerHeight();
	topMargin=(window.innerHeight-height)/2;
	$('.quoteContainer').css({'margin-top':topMargin+'px'});
}

$('.tweet').on('click',function(){
	window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+$('.quoteContainer').text());
})


// taken from A PEN BY html5andblog

jQuery(document).ready(function($){

var windowXArray = [],
    windowYArray = [];

for (var i = 0; i < $(window).innerWidth(); i++) {
    windowXArray.push(i);
}
    
for (var i = 0; i < $(window).innerHeight(); i++) {
    windowYArray.push(i);
}

function randomPlacement(array) {
    var placement = array[Math.floor(Math.random()*array.length)];
    return placement;
}
    

var canvas = oCanvas.create({
   canvas: '#canvas',
   background: '#2c3e50',
   fps: 60
});

setInterval(function(){

var rectangle = canvas.display.ellipse({
   x: randomPlacement(windowXArray),
   y: randomPlacement(windowYArray),
   origin: { x: 'center', y: 'center' },
   radius: 0,
   fill: '#27ae60',
   opacity: 1
});

canvas.addChild(rectangle);

rectangle.animate({
  radius: 10,
  opacity: 0
}, {
  duration: '1000',
  easing: 'linear',
  callback: function () {
			this.remove();
		}
});

}, 100);

$(window).resize(function(){
canvas.width = $(window).innerWidth();
canvas.height = $(window).innerHeight();
});

$(window).resize();

});