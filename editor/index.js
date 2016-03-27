editArea=document.getElementsByClassName('editArea')[0]

container = document.getElementById('container');

container.addEventListener('mouseup',function(){showEditBox()});
container.addEventListener('keyup',function(){showEditBox()});

currentAction=''

function showEditBox()
{
    txt=window.getSelection().toString();
    if(txt!="")
    {
        menu.style='display:initial';
        menu = document.getElementById('menu');
        textPosition=window.getSelection().getRangeAt(0).getBoundingClientRect();
        positionX=(textPosition.left+textPosition.right)/2-menu.offsetWidth/2;
        positionY=textPosition.top-40;
        menu.style='display:initial;top:'+positionY+'px;left:'+positionX+'px;';
    }
    else
    {
        menu.style='display:0px';   
    }
}

function edit(action,argument)
{
     document.execCommand(action,false,argument);
}

