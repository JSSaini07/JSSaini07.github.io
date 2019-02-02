var monitorScroll = true;

$(document).ready(function(){
  track();
  handleProjectFilters();
  placeTimelines();
  $('#intro-section #intro-header #contact').click(function(){
    $('html, body').animate({
      scrollTop: $('#contact-section').offset().top,
    }, 800);
  });
  $('#submit-contact-form').click(function(){
    var name = $('#contact-form-name').val();
    var email = $('#contact-form-email').val();
    var content = $('#contact-form-content').val();
    var helperText = $('#submit-contact-form-helper-text');
    helperText.removeClass('submit-contact-form-helper-text-success');
    helperText.removeClass('submit-contact-form-helper-text-fail');
    $.ajax({
      url: "http://jssemailservice.herokuapp.com/send",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        name: name,
        email: email,
        content: content
      }),
      success: function(res) {
        if(res.status){
          helperText.addClass('submit-contact-form-helper-text-success');
          helperText.text('Sent');
        } else {
          helperText.addClass('submit-contact-form-helper-text-fail');
          helperText.text('Failed to send the message');
        }
        helperText.show();
      },
      error: function(err) {
        helperText.addClass('submit-contact-form-helper-text-fail');
        helperText.text('Failed to send the message');
        helperText.show();
        console.log(err);
      }
    }); 
  });
});

function showSkillProgress() {
  var skills = $('#skill-content-container .skill-progress');
  for(var i=0;i<skills.length;i++) {
    var skillItem = $(skills[i]);
    var progress = skillItem.data('progress');
    skillItem.css({opacity: '1.0'});
    skillItem.animate({width: progress+'%'}, 2000);
  }
}

function scrollEvents() {
  if($('#skill-container')[0].getBoundingClientRect().y < 0.95 * window.innerHeight) {
    monitorScroll = false;
    showSkillProgress();
    placeTimelines(); // just to be sure that DOM loading did not interfere with timeline placing
  }
}

var monitorScrollInterval = setInterval(function(){
  if(!monitorScroll){
    clearInterval(monitorScrollInterval);
  }
  scrollEvents();
}, 200);

function handleProjectFilters() {
  $('.project-technology').on('click',function(){
    var currentSelectedFilters = $('.filter-selected');
    if($(this).hasClass('filter-selected')){
      $(this).removeClass('filter-selected');
      if($('.filter-selected').length === 0){
        $('.project-technology[data-filter="All"]').addClass('filter-selected');
      }
    }
    else if((currentSelectedFilters.length === 1 && $(currentSelectedFilters[0]).data('filter') === 'All') || $(this).data('filter') === 'All') {
      currentSelectedFilters.removeClass('filter-selected');
      $(this).addClass('filter-selected');
    }
    else {
      $(this).addClass('filter-selected');
    }
    var selectedTags = $('.filter-selected').map(function(index,elem){return $(elem).data('filter')});
    selectedTags = Array.from(selectedTags);
    handleProjectVisibility(selectedTags);
  });
}

function handleProjectVisibility(selectedTags) {
  var projectItems = $('.project-item');
  if(selectedTags.length === 1 && selectedTags[0] === 'All') {
    projectItems.removeClass('project-hidden');
    return;
  }
  projectItems.map(function(index, element) {
    var tags = $(element).find('.tag');
    tags = tags.filter(function(index,tag) {
      return selectedTags.indexOf($(tag).text())>=0;
    });
    $(element).removeClass('project-hidden');
    if(tags.length === 0){
      $(element).addClass('project-hidden');
    }
  });
}

function placeTimelines(){
  var svg = $('#timeline-path svg');
  var svg_coords = svg[0].getBoundingClientRect();
  var tooltip1 = $('.customTooltipFirst');
  var tooltip2 = $('.customTooltipSecond');
  var tooltip3 = $('.customTooltipThird');
  var tooltip4 = $('.customTooltipFourth');
  var tooltip5 = $('.customTooltipFifth');

  var x1 = svg_coords.x+60;
  var x2 = svg_coords.x+60;
  var x3 = svg_coords.x+60;
  var x4 = svg_coords.x+60;
  var x5 = svg_coords.x+60;
  
  var y1 = svg.find('circle')[1].getBoundingClientRect().y+10 - (tooltip1[0].getBoundingClientRect().height/2) - $('#timeline-section')[0].getBoundingClientRect().y;
  var y2 = svg.find('circle')[2].getBoundingClientRect().y+10 - (tooltip2[0].getBoundingClientRect().height/2) - $('#timeline-section')[0].getBoundingClientRect().y;
  var y3 = svg.find('circle')[3].getBoundingClientRect().y+10 - (tooltip3[0].getBoundingClientRect().height/2) - $('#timeline-section')[0].getBoundingClientRect().y;
  var y4 = svg.find('circle')[4].getBoundingClientRect().y+10 - (tooltip4[0].getBoundingClientRect().height/2) - $('#timeline-section')[0].getBoundingClientRect().y;
  var y5 = svg.find('circle')[5].getBoundingClientRect().y+10 - (tooltip5[0].getBoundingClientRect().height/2) - $('#timeline-section')[0].getBoundingClientRect().y;

  tooltip1.css({'left':x1+'px', 'top':y1+'px'});
  tooltip2.css({'right':x2+'px', 'top':y2+'px'});
  tooltip3.css({'left':x3+'px', 'top':y3+'px'});
  tooltip4.css({'right':x4+'px', 'top':y4+'px'});
  tooltip5.css({'left':x5+'px', 'top':y5+'px'});

  $('.customTooltipSecond .customTip').css({'left': tooltip2[0].getBoundingClientRect().width -2 });
  $('.customTooltipFourth .customTip').css({'left': tooltip4[0].getBoundingClientRect().width -2 });
}

function handleParallax() {
  var containers = $('.parallax');
  for(var i=0;i<containers.length;i++) {
    var currentContainer = $(containers[i]);
    // $(currentContainer).css({position: 'relative'});
    var top = currentContainer[0].getBoundingClientRect().y;
    var height = currentContainer.height();
    if((top < window.innerHeight) && (top + height >= 0)) {
      var change = (top - window.innerHeight)/20;
      currentContainer.css({
        top: change
      })
    }
  }
}

function track() {
  $.ajax({
    url: 'http://jssemailservice.herokuapp.com/track',
    method: 'get',
  });
}

window.onresize = placeTimelines;

// setInterval(handleParallax, 1);
