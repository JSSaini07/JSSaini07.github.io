import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SparklinesComponent from './sparklinesComponent'

class WeatherDisplay extends React.Component {
	constructor(props){
		super(props);
		this.renderCity=this.renderCity.bind(this);
	}
	renderCity(weather,key){ 
		var temp=weather.data.list.map((weatherObj)=>weatherObj.main.temp);
		var pressure=weather.data.list.map((weatherObj)=>weatherObj.main.pressure);
		var humidity=weather.data.list.map((weatherObj)=>weatherObj.main.humidity);
		var avgTemp=0,avgPressure=0,avgHumidity=0;
		for(var i=0;i<temp.length;i++)
		{
			avgTemp+=temp[i];
			avgPressure+=pressure[i];
			avgHumidity+=humidity[i];
		}
		avgTemp=parseInt(avgTemp/temp.length);
		avgPressure=parseInt(avgPressure/pressure.length);
		avgHumidity=parseInt(avgHumidity/humidity.length);
		return(
			<tr key={key}>
				<td>{weather.data.city.name}</td>
				<td><SparklinesComponent data={temp} color="orange"/><div>{avgTemp+' (K)'}</div></td>
				<td><SparklinesComponent data={pressure} color="blue"/><div>{avgPressure+' (hPa)'}</div></td>
				<td><SparklinesComponent data={humidity} color="black"/><div>{avgHumidity+' (%)'}</div></td>
			</tr>
		);
	}
	render(){
		if(!this.props.weather.length){
			return <div></div>
		}
		return(
			<table className="table table-hover">
			  <thead className='thead-inverse'>
			    <tr>
			      <th>City</th>
			      <th>Temprature</th>
			      <th>Pressure</th>
			      <th>Humidity</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{
			  		this.props.weather.map(this.renderCity)
			  	}
			  </tbody>
			</table>
		);
	}
}

function mapStateToProps(state){
	return({
		weather:state.weather
	});
}

export default connect(mapStateToProps)(WeatherDisplay);