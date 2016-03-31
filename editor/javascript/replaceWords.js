words=null;
paragraphs=null;
paragraphslength=0;
replaceWords=[];
wordCount=0;

function replace(callback,wordSize)
{
    $.ajax({
            type: "GET",
            url: "http://randomword.setgetgo.com/get.php",
            dataType: "jsonp",
            jsonpCallback: 'RandomWordComplete',
            success: function(result){return callback(result.Word,wordSize)},
            error: function(result){return callback(result.Word,wordSize)}
        });
}

function callback(x,wordSize)
{
    if(wordSize<=0)
    {
        updateContent();
        return;
    }
    replaceWords.push(x);
    replace(callback,wordSize-1);
}

function convert()
{
    $(document).ready(function(){
        console.log($('.animate'));
        $('.animate').removeClass('animate');
    })
    words=null;
    paragraphs=null;
    paragraphslength=0;
    replaceWords=[];
    wordCount=0;
    paragraphs=$('p');
    paragraphslength=paragraphs.length;
    addSpacesOnTags();
    for(i=0;i<paragraphslength;i++)
    {
        words=paragraphs[i].innerHTML.split(" ");
        for(j=0;j<words.length;j++)
        {
            if(words[j].length==4&&words[j]!='</u>'&&words[j]!='<br>'&&words[j]!='</b>'&&words[j]!='</i>')
            {
                wordCount+=1;  
            }
        }
    }
    replace(callback,wordCount);
}

function addSpacesOnTags()
{
    for(i=0;i<paragraphs.length;i++)
    {
         str=paragraphs[i].innerHTML;
         str=str.replace(new RegExp('<', 'g'), ' <');
         str=str.replace(new RegExp('>', 'g'), '> ');
         paragraphs[i].innerHTML=str;
    }
}

function removeSpaceOnTags()
{
    for(i=0;i<paragraphs.length;i++)
    {
         str=paragraphs[i].innerHTML;
         str=str.replace(new RegExp(' <', 'g'), '<');
         str=str.replace(new RegExp('> ', 'g'), '>');
         paragraphs[i].innerHTML=str;
    }
}

function updateContent()
{
    k=0;
    for(i=0;i<paragraphs.length;i++)
    {
        str=""
        words=paragraphs[i].innerHTML.split(" ");
        for(j=0;j<words.length;j++)
        {
            if(words[j].length==4&&words[j]!='</u>'&&words[j]!='<br>'&&words[j]!='</b>'&&words[j]!='</i>')
            {
                str+="<span class='animate'>&nbsp"+replaceWords[k]+"&nbsp</span>";
                k++;
            }
            else
            {
                str+=" "+words[j];   
            }
        }
        paragraphs[i].innerHTML=str;
    }
    removeSpaceOnTags();
}