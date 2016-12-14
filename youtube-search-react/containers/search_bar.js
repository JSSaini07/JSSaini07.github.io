import React from "react";
import ReactDOM from "react-dom";

var searchRef='';

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		searchRef=this;
	}
	keyChange(){
		searchRef.props.changeKeyword(searchRef.refs.searchInput.value);
	}
	render(){
		return <input className="searchBar" ref="searchInput" onChange={this.keyChange} type="text"></input>
	}
}

export default SearchBar;