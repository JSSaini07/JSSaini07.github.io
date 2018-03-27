var canvas = document.getElementById('intro-canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var confettiList = [];

var commonConfettiProps = {
  minWidth: 10,
  maxWidth: 200,
  minRotationSpeed: 1,
  maxRotationSpeed: 5,
  possibleColors: ["black","blue","green","red","orange"]
}

function getRandom(limitX,limitY){
  var num = parseInt((Math.random()*limitY)%limitY);
  return num;
}

function confetti(){
  this.x = getRandom(100,canvas.width-commonConfettiProps.maxWidth-100);
  this.y = getRandom(100,canvas.height-100);
  this.width = getRandom(commonConfettiProps.minWidth,commonConfettiProps.maxWidth);
  this.height = parseInt(this.width/10);
  this.color = commonConfettiProps.possibleColors[getRandom(0,commonConfettiProps.possibleColors.length)];
  this.rotateDirection = getRandom(0,2);
  this.angle = getRandom(commonConfettiProps.minRotationSpeed,commonConfettiProps.maxRotationSpeed)/10;
  this.fallSpeed = null;
}

function redrawCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i=0;i<confettiList.length;i++){
    var tempConfetti = confettiList[i];
    ctx.fillStyle = tempConfetti.color;
    var direction = 1;
    if(tempConfetti.rotateDirection==0){direction=-1;}
    ctx.translate(tempConfetti.x,tempConfetti.y);
    ctx.rotate((direction*(Math.PI*tempConfetti.angle))/180);
    ctx.fillRect(0,0,tempConfetti.width,tempConfetti.height);
    ctx.rotate(-1*direction*((Math.PI*confetti.angle)/180));
    ctx.translate(-tempConfetti.x,-tempConfetti.y);
  }
}

var int = setInterval(redrawCanvas,10);

for(var i=0;i<3;i++){
  var confettiElement = new confetti();
  confettiList.push(confettiElement);
}
