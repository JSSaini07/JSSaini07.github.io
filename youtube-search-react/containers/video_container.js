import React from 'react';
import ReactDOM from 'react-dom';
import VideoItem from './video_item';

class VideoContainer extends React.Component {
	render(){
		var videoChange=this.props.videoChange;
		return (
			<ul className="videoContainer col-sm-2">
			{
				this.props.videos.map(function(obj,i){
					return <VideoItem title={obj.snippet.title} videoKey={i} imageUrl={obj.snippet.thumbnails.high.url} videoChange={videoChange}></VideoItem>
				})
			}
			</ul>
		);
	}
}

export default VideoContainer;