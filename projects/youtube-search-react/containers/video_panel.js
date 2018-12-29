import React from 'react';
import ReactDOM from 'react-dom';

class VideoPanel extends React.Component{
	render(){
		var videoUrl='https://www.youtube.com/embed/'+this.props.selectedVideo.id.videoId;
		return( 
			<div className="videoPanel col-sm-9">
				<iframe src={videoUrl} className="selectedVideo"></iframe>
				<div className="selectedVideoDescription">{this.props.selectedVideo.snippet.description}</div>
			</div>
		);
	}
}

export default VideoPanel;