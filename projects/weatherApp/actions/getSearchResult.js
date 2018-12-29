import axios from 'axios';

export default function getSearchResult(searchTerm){
	const API_KEY='f1a3d4344c446b4b097a4c121e4ba71d';
	var url='http://api.openweathermap.org/data/2.5/forecast?appid='+API_KEY+'&q='+searchTerm;
	const request=axios.get(url);
   	return {
   	 			type:'FETCH_WEATHER',
   	 			payload:request
   	 	   }
}