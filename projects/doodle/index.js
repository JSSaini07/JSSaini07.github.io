//////////////// canvas settings ////////////////////

var canvas = document.getElementById('canvas');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
var context=canvas.getContext('2d');


//////////////// draw logic //////////////////

lineWidth=1

enterState=false
drawState=false
eraserstate=-1

coords={'x':0,'y':0}

coordinatesFetch=[getCoordinates,getCoordinatesTouch]

selectListeners={
	'down':['mousedown','touchstart'],
	'up':['mouseup','touchend'],
	'move':['mousemove','touchmove']
}

devicetouch=0

if('ontouchstart' in document.documentElement)
{
	devicetouch=1;
}

menu=document.getElementById('menu')

menu.addEventListener('click',function(){
	if(menu.offsetHeight==40)
	{
		menu.style="height:initial";
	}
	else
	{
		menu.style="height:40px";
	}
})

function getCoordinates(e)
{
	coords.x=e.pageX;
	coords.y=e.pageY;
}

function getCoordinatesTouch(e)
{
	coords.x=e.changedTouches[0].pageX;
	coords.y=e.changedTouches[0].pageY;
}

canvas.addEventListener((selectListeners.down)[devicetouch],function(e){
	(coordinatesFetch[devicetouch])(e)
	drawState=true
})

canvas.addEventListener('mouseleave',function(){
	drawState=false
})

canvas.addEventListener((selectListeners.move)[devicetouch],function(e){
	if(eraserstate==1)
		{
			if(document.getElementsByClassName('jscolor')[0].value!=document.getElementsByClassName('jscolor')[1].value)
			{
				document.getElementsByClassName('jscolor')[0].value=document.getElementsByClassName('jscolor')[1].value
				document.getElementsByClassName('jscolor')[0].style='background:#'+document.getElementsByClassName('jscolor')[0].value;
			}	
		}
	if(slider.offsetLeft<=controller.offsetLeft)
	{
			slider.style="margin-left:0px";
	}
	if(slider.offsetLeft>=controller.offsetLeft+100)
	{
		slider.style="margin-left:100px";
	}
	if(drawState==true)
	{
		context.beginPath()
		context.moveTo(coords.x,coords.y)
		context.strokeStyle="#"+document.getElementsByClassName('jscolor')[0].value
		context.lineJoin = 'round';
		context.miterLimit = 2;
		if(lineWidth>=4)
		{
			console.log('here')
			context.arc(coords.x,coords.y,0.1,0,2*Math.PI)	
		}
		context.lineWidth=lineWidth
		coordinatesFetch[devicetouch](e)
		context.lineTo(coords.x,coords.y)
		context.stroke()
		context.fill()
		coordinatesFetch[devicetouch](e)
	}
})

canvas.addEventListener((selectListeners.up)[devicetouch],function(e){
	enterState=false
	drawState=false
})

////////// control logic //////////////

controller=document.getElementById('sizechange')
slider=document.getElementById('sizecontroller')

controller.addEventListener((selectListeners.down)[devicetouch],function(){
	enterState=true
})

controller.addEventListener((selectListeners.move)[devicetouch],function(e){
	if(enterState==true)
	{
		coordinatesFetch[devicetouch](e)
		slider.style="margin-left:"+(coords.x-80)+"px;"
		lineWidth=1+parseInt((slider.style.marginLeft).split('px')[0])/20;
	}
})

controller.addEventListener((selectListeners.up)[devicetouch],function(){
	enterState=false
})

slider.addEventListener((selectListeners.down)[devicetouch],function(e){
	enterState=true
	fontsize.style="display:initial";
})

slider.addEventListener((selectListeners.up)[devicetouch],function(e){
	enterState=false
	fontsize.style="display:none";
})

erase=document.getElementById('erase');

background=document.getElementsByClassName('jscolor')[1]

erase.addEventListener('click',function(){
	eraserstate*=-1;
	if(eraserstate==1)
	{
		erase.innerHTML="Eraser Selected"
		document.getElementById('sizetext').innerHTML="Eraser Size"
		document.getElementsByClassName('jscolor')[0].value=background.value;
		document.getElementsByClassName('jscolor')[0].style='background:#'+document.getElementsByClassName('jscolor')[0].value;
		document.body.style="cursor:url('./eraser.png') 15 0, auto;";
	}
	else
	{
		erase.innerHTML="Select Eraser"
		document.getElementById('sizetext').innerHTML="Pen Size"
		document.getElementsByClassName('jscolor')[0].value='000000';
		document.getElementsByClassName('jscolor')[0].style='background:#'+document.getElementsByClassName('jscolor')[0].value;
		document.body.style="cursor:url('./pen.png') 15 0, auto;";
	}
})

function backgroundchange(){
	context.clearRect(0,0,canvas.width,canvas.height);
	canvas.style="background:"+"#"+background.value;
}

clear=document.getElementById('clear')

clear.addEventListener('click',function(){
	context.clearRect(0,0,canvas.width,canvas.height);
})