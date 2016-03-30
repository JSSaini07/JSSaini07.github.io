
$(document).ready(function(){
    $('.title').html(sessionStorage.title);
    $('.content').html(sessionStorage.content);
    animateContent();
    animatePublish();
    $('.title').on('keyup',animateContent);   // to show contentPanel only when title is not empty 
    $('.content').on('keyup',animatePublish); // to show publish button only when content is not empty
})


// animateContent runs on every keyPress in title div and if title div is not empty it displays content panel

function animateContent(){
        console.log(sessionStorage.title);
        sessionStorage.title=document.getElementsByClassName('title')[0].innerHTML;
        if($('.title').html()=="")
        {
            $('.content').clearQueue().animate({'marginLeft':'120%'},400,function(){$('.content').css({'display':'none'});});
            $('#publish').clearQueue().animate({'marginLeft':'120%'},400,function(){$('.publish').css({'display':'none'});});
        }
        else
        {
            $('.content').css({'display':'inline-block'});
            $('.content').animate({'marginLeft':'0%'},400);
            if($('.content').html()!="")
            {
                $('#publish').animate({'marginLeft':'5%'},400);
            }
        }
};

// animatePublish runs on every keyPress in content div and if content div is not empty it displays publish button

function animatePublish(){
    console.log(sessionStorage.content);
        sessionStorage.content=document.getElementsByClassName('content')[0].innerHTML
        if($('.content').html()=="")
        {
            $('#publish').clearQueue().animate({'marginLeft':'120%'},400,function(){$('#publish').css({'display':'none'});});
        }
        else
        {
             $('#publish').css({'display':'inline-block'});
             $('#publish').animate({'marginLeft':'5%'},400);
        }
};