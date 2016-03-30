
function preview() {
    $(document).ready(function(){
        title = $('.title').text();
        content = $('.content').text();
        $('#publish').addClass('hide');
        $('#inputText').slideUp(400,function(){
            $('#displayText').slideDown(600);
        });
        $('#displayTitle').html(title);
        $('#displayContent').html(content);
    })
}