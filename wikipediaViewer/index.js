
$(document).ready(function(){
	$('.input').focus();
	$('body').on('keyup',function(e){
		if($('.input').is(':focus')&&e.key=='Enter'&&$('.input').val()!=""&&$('.input').val().length>0) {
			fetchContent($('.input').val());
		}
	})
});

function fetchContent(query) {
	try{
		$('.welcome').remove();
	}catch(e){}
	$('.tab').remove();
	$.ajax({
		'url':'http://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+query,
		'method':'GET',
		'success':function(r){
			r=r.query.pages;
			var data=Object.keys(r);
			for(var i=0;i<data.length;i++){
				var tab=document.createElement('div');
				var tabContent=document.createElement('div');
				var headerContainer=document.createElement('div');
				var tabHeader=document.createElement('div');
				var icon=document.createElement('div');
				var tabDescription=document.createElement('div');
				tab.className='tab';
				tabContent.className='tabContent';
				headerContainer.className='headerContainer';
				tabHeader.className='tabHeader';
				icon.className='icon';
				tabDescription.className='tabDescription';
				$(tabHeader).text(r[data[i]].title);
				$(tabDescription).text(r[data[i]].extract);
				console.log(r[data[i]]);
				try {
					$(icon).css({'background':'url("'+r[data[i]].thumbnail.source+'")','background-size':'30px 30px','background-repeat':'no-repeat'})
				}catch(e){}
				headerContainer.appendChild(tabHeader);
				headerContainer.appendChild(icon);
				tabContent.appendChild(headerContainer);
				tabContent.appendChild(tabDescription);
				tab.appendChild(tabContent);
				$(tab).attr('link','https://en.wikipedia.org/?curid='+data[i]);
				$(tab).on('click',function(){
					window.open($(this).attr('link'));
				})
				$('.content').append(tab);	
			}
		}
	});
}