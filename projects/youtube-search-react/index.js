import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './containers/search_bar'
import VideoContainer from './containers/video_container';
import VideoPanel from './containers/video_panel';

let ref='';

setTimeout(function(){

class MainAppContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={keyword:'spiderman'};
		this.getVideos(this.state.keyword);
		ref=this;
	}
	render(){
		if(this.state.selectedVideo==undefined){
			return <div>Loading......</div>
		}
		else{	
			return (
				<div>
					<SearchBar changeKeyword={this.changeKeyword}/>
					<VideoPanel selectedVideo={this.state.selectedVideo}/>
					<VideoContainer videos={this.state.videos} videoChange={this.changeSelectedVideo}/>
				</div>
			);
		}	
	}
	getVideos(keyword){
		var tempref=this;
		var request=gapi.client.youtube.search.list({
			part:'snippet',
			type:'video',
			q:keyword,
			maxResults:10
		});
		request.execute(function(videos){
			tempref.setState({videos:videos.items,selectedVideo:videos.items[0]});
		});
	}
	changeSelectedVideo(key){
		ref.setState({selectedVideo:ref.state.videos[key]});
	}
	changeKeyword(key){
		ref.setState({keyword:key});
		ref.getVideos(ref.state.keyword);
	}
}

ReactDOM.render(<MainAppContainer/>,document.getElementById('app'));

},1000);