
var bombProbability=0.2;
var revealDampingFactor=1.8;
var sizeRatio=0.02196193265;
var width=window.innerWidth;
var firstClick=true;
var stateMatrix=[];

$(document).ready(function(){
	createMatrix();

	$('.col').on('click',function(){
		if(firstClick){
			init(this.className);
			firstClick=false;
		}
		checkClick(this);
	});
});

function createMatrix() {
	for(var i=0;i<14;i++)
	{
		var row=document.createElement('div');
		var arr=[];
		$(row).addClass('row');
		for(var j=0;j<14;j++) {
			var col=document.createElement('div');
			$(col).addClass('col row'+i+'col'+j);
			$(col).css({'width':sizeRatio*width+'px','height':sizeRatio*width+'px'});
			$(col).attr('row',i);
			$(col).attr('col',j);
			$(row).append(col);
			arr.push(0);
		}
		$('.gamePanel').append(row);
		stateMatrix.push(arr);
	}
}

function init(exemptClass){
	exemptClass=exemptClass.split(' ')[1];
	for(var i=0;i<14;i++)
	{
		for(var j=0;j<14;j++)
		{
			var isBomb=getProbability(bombProbability);
			var currentClass='row'+i+'col'+j;
			if(isBomb&&currentClass!=exemptClass){
				stateMatrix[i][j]=-1;
			}
		}
	}
	for(var i=0;i<14;i++)
	{
		for(var j=0;j<14;j++)
		{
			if(stateMatrix[i][j]!=-1){
				if(i-1>=0&&j-1>=0&&stateMatrix[i-1][j-1]==-1){
					stateMatrix[i][j]++;
				}
				if(i-1>=0&&stateMatrix[i-1][j]==-1){
					stateMatrix[i][j]++;
				}
				if(i-1>=0&&j+1<=13&&stateMatrix[i-1][j+1]==-1){
					stateMatrix[i][j]++;
				}
				if(j-1>=0&&stateMatrix[i][j-1]==-1){
					stateMatrix[i][j]++;
				}
				if(j+1<=13&&stateMatrix[i][j+1]==-1){
					stateMatrix[i][j]++;
				}
				if(i+1<=13&&j-1>=0&&stateMatrix[i+1][j-1]==-1){
					stateMatrix[i][j]++;
				}
				if(i+1<=13&&stateMatrix[i+1][j]==-1){
					stateMatrix[i][j]++;
				}
				if(i+1<=13&&j+1<=13&&stateMatrix[i+1][j+1]==-1){
					stateMatrix[i][j]++;
				}
			}
		}
	}
}

function getProbability(prob){
	var x=Math.random();
	if(x<=prob){
		return true;
	}
	return false;
}

function checkClick(cell){
	var row=$(cell).attr('row');
	var col=$(cell).attr('col');
	if(stateMatrix[row][col]==-1){
		gameOver();
	}
	else{
		startReveal(row,col,0.9);
		stateMatrix[row][col]=-2;
	}
}

function startReveal(row,col,prob){
	if(row<0||row>13||col<0||col>13||stateMatrix[row][col]<0){
		return;
	}
	$('.row'+row+'col'+col).text(stateMatrix[row][col])
	stateMatrix[row][col]=-2;
	if(getProbability(prob)){startReveal(row-1,col-1,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row-1,col,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row-1,col+1,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row,col-1,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row,col+1,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row+1,col-1,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row+1,col,prob/revealDampingFactor)}
	else{return;}
	if(getProbability(prob)){startReveal(row+1,col+1,prob/revealDampingFactor)}
	else{return;}
}

function gameOver(){
	alert('Game Over');
}