import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchBar';
import WeatherDisplay from './weatherDisplay';
import allReducers from '../reducers/index';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise';

var createStoreWithMiddleware=applyMiddleware(promiseMiddleware)(createStore);
var store=createStoreWithMiddleware(allReducers);

class MainApp extends React.Component{
	render(){
		return(
			<Provider store={store}>
				<div>
					<SearchBar/>
					<hr/>
					<WeatherDisplay/>
				</div>
			</Provider>
		);
	}
}

export default MainApp;