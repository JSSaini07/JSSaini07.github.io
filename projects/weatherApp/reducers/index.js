import {combineReducers} from 'redux';
import weatherReducer from './reducer_weather';

export default combineReducers({
	weather:weatherReducer
});