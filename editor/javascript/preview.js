

function done() {
    setPreview();
    $('#displayText').slideDown(600);
    links = $('#previewContent').find('a');
    if(links.length==0)
    {
        $('#links').text('No Links Inserted');        
    }
    else
    {
        str="";
        
        for(i=0;i<links.length;i++)
        {
            color="#dc2c3e";
            if(i%2==0)
            {
                color = "#248de9";
            }
            str = str+"<p><a href='"+links[i].innerHTML+"' style='color:"+color+"'>"+links[i].innerHTML+"</a></p>";
        }
        $('#links').html(str);
    }
};

function preview() {
    $(document).ready(function(){
        setPreview();
        $('#clearEditor').hide();
        $('#previewButton').hide();
        $('#backToEditor').show();
        $('#publish').hide();
        $('#displayText').slideUp(400,function(){$('#inputText').slideUp(400,function(){$('#preview').slideDown(600);});});
})};

function setPreview()
{
    $(document).ready(function(){
        title = $('.title').text();
        content = $('.content').html();
        while(content.includes('&lt;')==true)
        {
            content=content.replace('&lt;','<');
        }
        while(content.includes('&gt;')==true)
        {
            content=content.replace('&gt;','>');
        }
        $('#previewTitle').html(title);
        $('#previewContent').html(content);
        links = $('#previewContent').find('a');
        for(i=0;i<links.length;i++)
        {
            if(links[i].href=="")
            {
                links[i].href=links[i].innerHTML;        
            }
        }
    });
}