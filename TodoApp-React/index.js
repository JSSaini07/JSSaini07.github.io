
var Event=React.createClass({
	render:function(){
		return <h1>{this.props.val}</h1>
	}
});

var EventAdder=React.createClass({
	render:function(){
		return (
			<div>
				<input type="text" className='addEvent'></input>
				<div className='addEventButton'>Add</div>
			</div>
			);
	}
});

var Board=React.createClass({
	getInitialState:function() {
		var events=[];
		return {events:events};
	},
	renderEmpty:function(){
		return <div className="emptyTask"> No Task Added :( </div>
	},
	renderNormal:function(){
		return (
			<div>
			{
				this.state.events.map(function(text,i){
					return <Event val={text}/>
				})
			}
			</div>
		);
	},
	render:function(){
		return (
		<div>
			<EventAdder/>
			<div>{(this.state.events.length==0)?this.renderEmpty():this.renderNormal()}</div>;
		</div>
		);
	}
});

ReactDOM.render(<Board/>,document.getElementById('root'));