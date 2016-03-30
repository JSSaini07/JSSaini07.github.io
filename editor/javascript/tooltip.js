window.addEventListener('keypress', function(ev){
    if(ev.keyCode == '13')
        document.execCommand('formatBlock', false, 'p');
}, false);

// apply is a generic function to which arguments are passed based on the operation to be performed viz. Bold,italics.... 

function apply(action,argument) {
    document.execCommand(action,false,argument);
}

inputText=document.getElementById('inputText');

tooltip = document.getElementById('tooltip');

// adding listeners to show the tooltip when some text is selected

inputText.addEventListener('mousemove',checkToolTip);

inputText.addEventListener('keyup',checkToolTip);


/* checkToolTip runs every time mouse moves or a key presses in the inputText div, it checks if some 
   text is selected and if it results to true it displays and positions the tooltip */

function checkToolTip() {
    selectedText = window.getSelection().toString();
    if(selectedText != "")
    {
        tooltip.style="display:inline-block;"
        textPosition=window.getSelection().getRangeAt(0).getBoundingClientRect(); 
        posX = (textPosition.left+textPosition.right-tooltip.offsetWidth)/2;
        posY = (textPosition.top-60);
        tooltip.style="display:inline-block;top:"+posY+"px;left:"+posX+"px";
    }
    else
    {
        tooltip.style="display:none;";
    }
}


