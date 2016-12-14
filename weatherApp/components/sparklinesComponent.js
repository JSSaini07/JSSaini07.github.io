import React from 'react';
import ReactDOM from 'react-dom';
import { Sparklines,SparklinesLine,SparklinesReferenceLine } from 'react-sparklines';

export default class SparklinesComponent extends React.Component{
	render(){
		return(
			<Sparklines data={this.props.data}>
  				<SparklinesLine color={this.props.color} />
  				<SparklinesReferenceLine type="avg" />
			</Sparklines>
		);
	}
}