import React from 'react';
import ReactDOM from 'react-dom';

class VideoItem extends React.Component {
	render(){
		var videoChange=this.props.videoChange;
		var videoKey=this.props.videoKey;
		var vChange=function(){
			videoChange(videoKey);
		} 
		return (
			<div className="videoItem" onClick={vChange}>
				<img className="videoImg" src={this.props.imageUrl}></img>
				<li className="videoTitle">{this.props.title}</li>
			</div>
		);
	}
}

export default VideoItem;