
$(document).ready(function(){
  layoutInit();
  applyEvents();
  placeTimelines();
});

function layoutInit(){
  var left = $('.selected-menu-item')[0].getClientRects()[0].left;
  $('.moving-menu-item').css({'display':'inline-block','left':left+'px'});
}

function applyEvents(){
  $('.menu-item').on('mouseenter',function(){
    $('.moving-menu-item').clearQueue();
    var left = this.getClientRects()[0].left;
    $('.moving-menu-item').animate({'left':left+'px'},200);
  });
  $('.menu-item').on('mouseleave',function(){
    $('.moving-menu-item').clearQueue();
    var left = $('.selected-menu-item')[0].getClientRects()[0].left;
    $('.moving-menu-item').animate({'left':left+'px'},200);
  });
  $('.menu-item').on('click',function(){
    $('.selected-menu-item').removeClass('selected-menu-item');
    $(this).addClass('selected-menu-item');
    console.log($('#'+$(this).attr('target')).offset().top);
    $('html, body').animate({
        scrollTop: $('#'+$(this).attr('target')).offset().top+document.body.scrollTop
    }, 800);
  });
  $('.filter-item').on('click',function(){
    if(this.innerText!='All' && !$(this).hasClass('.filter-item-selected')){
      $($('.filter-item')[0]).removeClass('filter-item-selected');
    }
    if($(this).hasClass('filter-item-selected')){
      $(this).removeClass('filter-item-selected');
    } else{
      $(this).addClass('filter-item-selected');
    }
    if($('.filter-item-selected').length==0){
      $('.filter-item')[0].click();
    }
    renderProjects();
  });
  $(document.body).on('scroll',function(){
    var header = $('#header');
    var menu_items = $('.menu-item');

    // logic for fixing header on scroll
    header_offset_top = header.offset().top;
    if(header_offset_top<=0){
      header.addClass('header-fixed');
    }

    var sections = [];
    menu_items.map(function(i,j){
        sections.push(j.getAttribute('target'));
    });

    //logic to unfix header
    if($('#'+sections[1]).offset().top>=0){
      header.removeClass('header-fixed');
    }

    if($('#'+sections[1]).offset().top<=100){
      fillSkills();
    }

    if($(document.body).scrollTop() + $(document.body).height() == $(document).height()){
        $('.selected-menu-item').removeClass('selected-menu-item');
        $(menu_items[menu_items.length-1]).addClass('selected-menu-item');
        $(menu_items[menu_items.length-1]).trigger('mouseleave');
        return;
    }

    for(var i=0;i<sections.length;i++){
      var j = sections.length-i-1;
      if($('#'+sections[j]).offset().top<=100){
        $('.selected-menu-item').removeClass('selected-menu-item');
        $(document.querySelectorAll('.menu-item[target='+sections[j]+']')[0]).addClass('selected-menu-item');
        $(document.querySelectorAll('.menu-item[target='+sections[j]+']')[0]).trigger('mouseleave');
        return;
      }
    }
  });

  $('#timeline-section svg circle').on('mouseenter',function(){
      var targetWorkDetails = $(this).attr('target');
      $('.'+targetWorkDetails).clearQueue();
      $('.'+targetWorkDetails).slideDown(200);
  });

  $('#timeline-section svg circle').on('mouseleave',function(){
      var targetWorkDetails = $(this).attr('target');
      $('.'+targetWorkDetails).clearQueue();
      $('.'+targetWorkDetails).slideUp(200);
  });

  $('#intro-button').on('click',function(){
    $('.menu-item')[1].click();
  })

}

function fillSkills(){
  var skills = $('.right-content .skill-container .skill-value-fill');
  var width = $('.right-content .skill-container .skill-value')[0].getClientRects()[0].width;
  for(var i=0;i<skills.length;i++){
    var skill = skills[i];
    var parentContainer = $(skill).parent();
    var value = parseInt(parentContainer.attr('value'));
    var calculatedWidth = (value*width)/100;
    parentContainer.find('.skill-value-fill-name').text(value+'%');
    $(skill).animate({'width':calculatedWidth+'px'},1400);
  }
}

function renderProjects(){
  $('.projectItem').addClass('hiddenProjectItem');
  var filteredItems = document.querySelectorAll('.filter-item-selected');
  var filteredItemsMap = {};
  filteredItems = $(filteredItems).map(function(e,r){return r.innerText;})
  for(var i=0;i<filteredItems.length;i++){
    filteredItemsMap[filteredItems[i].split(' ').join('')]=1;
  }
  if(filteredItemsMap['All']==1){
    $('.hiddenProjectItem').removeClass('hiddenProjectItem');
    return;
  }else {
    var projectItems = $('.projectItem');
    for(var i=0;i<projectItems.length;i++){
      var currentProjectItem = $(projectItems[i]);
      var projectTags = currentProjectItem.find('.tag')
      projectTags = projectTags.map(function(i,j){return j.innerText;})
      var showFlag = false;
      for(j=0;j<projectTags.length;j++){
        if(filteredItemsMap[projectTags[j]]==1){showFlag=true;break;}
      }
      if(showFlag){
        currentProjectItem.removeClass('hiddenProjectItem');
      }
    }
  }
}

function placeTimelines(){
  var svg = $('#timelinePath svg');
  var svg_coords = svg[0].getClientRects()[0];
  var tooltip1 = $('.customTooltipFirst');
  var tooltip2 = $('.customTooltipSecond');
  var tooltip3 = $('.customTooltipThird');
  var tooltip4 = $('.customTooltipFourth');

  var x1 = svg_coords.x+20;
  var x2 = svg_coords.x+60;
  var x3 = svg_coords.x+20;
  var x4 = svg_coords.x+60;

  var y1 = svg.find('circle')[1].getClientRects()[0].y+10 - (tooltip1[0].getClientRects()[0].height/2) - $('#timeline-section')[0].getClientRects()[0].y;
  var y2 = svg.find('circle')[2].getClientRects()[0].y+10 - (tooltip2[0].getClientRects()[0].height/2) - $('#timeline-section')[0].getClientRects()[0].y;
  var y3 = svg.find('circle')[3].getClientRects()[0].y+10 - (tooltip3[0].getClientRects()[0].height/2) - $('#timeline-section')[0].getClientRects()[0].y;
  var y4 = svg.find('circle')[4].getClientRects()[0].y+10 - (tooltip4[0].getClientRects()[0].height/2) - $('#timeline-section')[0].getClientRects()[0].y;

  tooltip1.css({'left':x1+'px', 'top':y1+'px'});
  tooltip2.css({'right':x2+'px', 'top':y2+'px'});
  tooltip3.css({'left':x3+'px', 'top':y3+'px'});
  tooltip4.css({'right':x4+'px', 'top':y4+'px'});

  $('.workDetailsFirst').css({'right':(x1+29)+'px','top':y1+'px'});
  $('.workDetailsSecond').css({'left':(x2-11)+'px','top':y2+'px'});
  $('.workDetailsThird').css({'right':(x3+29)+'px','top':y3+'px'});
  $('.workDetailsFourth').css({'left':(x4-11)+'px','top':y4+'px'});
}
