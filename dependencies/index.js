
$(document).ready(function(){
	$('.option').on('click',function(){
		if(!$(this).hasClass('activeOption')){
			$('.activeOption').removeClass('activeOption');
			$(this).addClass('activeOption');
			$('.activePanel').removeClass('activePanel');
			$('.'+$(this).attr('targetPanel')).addClass('activePanel');
		}
	});
	$('.projectContainer').on('click',function(){
		var location=$(this).attr('targetLocation');
		window.open('http://jssaini07.github.io/'+location);
	});
	$('.svgContainer').on('click',function(){
		var location=$(this).attr('targetLocation');
		window.open('http://jssaini07.github.io/svg/'+location);
	});
});