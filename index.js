//////////////// canvas settings ////////////////////

var canvas = document.getElementById('canvas');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
var context=canvas.getContext('2d');


//////////////// draw logic //////////////////

enterState=false

x=0
y=0

lineWidth=1
drawState=false

eraserstate=-1

canvas.addEventListener('touchstart',function(e){
	x=e.x
	y=e.y
	drawState=true
})

canvas.addEventListener('touchmove',function(e){
	alert('drawState');
	if(eraserstate==1)
		{
			if(document.getElementsByClassName('jscolor')[0].value!=document.getElementsByClassName('jscolor')[1].value)
			{
				document.getElementsByClassName('jscolor')[0].value=document.getElementsByClassName('jscolor')[1].value
				document.getElementsByClassName('jscolor')[0].style='background:#'+document.getElementsByClassName('jscolor')[0].value;
			}	
		}
	if(drawState==true)
	{
		context.beginPath()
		context.moveTo(x,y)
		context.strokeStyle="#"+document.getElementsByClassName('jscolor')[0].value
		context.lineJoin = 'round';
		context.miterLimit = 2;
		context.lineWidth=lineWidth
		context.lineTo(e.x,e.y)
		context.stroke()
		context.fill()
		x=e.x
		y=e.y
	}
})

canvas.addEventListener('touchend',function(e){
	enterState=false
	drawState=false
})

canvas.addEventListener('touchleave',function(){
	drawState=false
})

////////// control logic //////////////

controller=document.getElementById('sizechange')
slider=document.getElementById('sizecontroller')
fontsize=document.getElementById('fontsize')

enterState=false

controller.addEventListener('touchstart',function(){
	enterState=true
})

controller.addEventListener('touchmove',function(e){
	if(enterState==true)
	{
		slider.style="margin-left:"+(e.x-100)+"px;"
		fontsize.style="margin-left:"+(e.x-100)+"px;"
		fontsize.innerHTML=fontsize.style.marginLeft;
		lineWidth=1+parseInt((slider.style.marginLeft).split('px')[0])/20;
	}
})

controller.addEventListener('touchstart',function(){
	enterState=false
})


slider.addEventListener('touchstart',function(e){
	enterState=true
	fontsize.style="display:initial";
})

slider.addEventListener('touchend',function(e){
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
		document.getElementsByClassName('jscolor')[0].value=background.value;
		document.getElementsByClassName('jscolor')[0].style='background:#'+document.getElementsByClassName('jscolor')[0].value;
		document.body.style="cursor:url('./eraser.png') 15 0, auto;";
	}
	else
	{
		erase.innerHTML="Select Eraser"
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