import React from 'react';
import ReactDOM from 'react-dom';
import getSearchResult from '../actions/getSearchResult'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.handleFormSubmit=this.handleFormSubmit.bind(this);
	}
	handleFormSubmit(e){
		e.preventDefault();
		this.props.getSearchResult(this.refs.citySearchTerm.value);
	}
	render(){
		return (
			<form onSubmit={this.handleFormSubmit} className="cityInputForm col-sm-6 input-group input-group-lg">
				<input ref="citySearchTerm" type="text" className="form-control" placeholder="Enter your city name"></input>
  				<span className="input-group-btn">
    				<button onClick={this.handleFormSubmit} type="button" className="btn btn-secondary" type="button">Submit</button>
  				</span>
			</form>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getSearchResult:getSearchResult},dispatch)
}

export default connect(null,mapDispatchToProps)(SearchBar);