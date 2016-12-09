
var EventRemove=React.createClass({
	removeEvent:function(){
		this.props.eventRemove(this.props.eventId);
	},
	render:function(){
		return <span className='fa fa-2x fa-remove deleteEvent' onClick={this.removeEvent}></span>
	}
});

var EventCompleted=React.createClass({
	eventCompleted:function(){
		console.log(this.props.eventId);
		this.props.eventCompleted(this.props.eventId);
	},
	render:function(){
		return <span className='fa fa-2x fa-check completedEvent' onClick={this.eventCompleted}></span>
	}
});

var Event=React.createClass({
	render:function(){	
		if(this.props.completed){
			return (
					<div className="eventBox">
							<strike className="eventText completed" data-key={this.props.eventId}>{this.props.children}</strike>
							<div className="eventCompletedContainer"><EventCompleted eventId={this.props.eventId} eventCompleted={this.props.eventCompleted}/></div>
							<div className="eventRemoveContainer"><EventRemove eventId={this.props.eventId} eventRemove={this.props.eventRemove}/></div>
					</div>
				);
		}
		else
		{
			return (
				<div className="eventBox">
						<h1 className="eventText" data-key={this.props.eventId}>{this.props.children}</h1>
						<div className="eventCompletedContainer"><EventCompleted eventId={this.props.eventId} eventCompleted={this.props.eventCompleted}/></div>
						<div className="eventRemoveContainer"><EventRemove eventId={this.props.eventId} eventRemove={this.props.eventRemove}/></div>
				</div>
			);
		}
	}
});

var EventAdder=React.createClass({
	addEvent:function(){if(this.refs.eventInput.value.length!=0){this.props.addEvent(this.refs.eventInput.value)}},
	render:function(){
		return (
			<div>
				<input type="text" ref='eventInput' className='eventInput'></input>
				<div className='addEventButton' onClick={this.addEvent}>Add</div>
			</div>
			);
	},
	componentDidMount() {
		var tempref=this;
		this.refs.eventInput.addEventListener('keydown',function(e){
			if(e.code=='Enter'){
				tempref.addEvent(this.value);
			}
		})
	}
});

var Board=React.createClass({
	getInitialState:function() {
		var events=[];
		var completed=[];
		return {events:events,completed:completed};
	},
	addEvent:function(text){
		var temp1=this.state.events;
		var temp2=this.state.completed;
		temp1.push(text);
		temp2.push(false);
		this.setState({events:temp1,completed:temp2});
	},
	removeEvent:function(key){
		var temp1=this.state.events;
		var temp2=this.state.completed;
		temp1.splice(key,1);
		temp2.splice(key,1);
		this.setState({events:temp1,completed:temp2});
	},
	completedEvent:function(key){
		var temp=this.state.completed;
		temp[key]=!temp[key];
		this.setState({events:this.state.events,completed:temp});
	},
	renderEmpty:function(){
		return <div className="emptyTask"> No Task Added <span className='fa fa-frown-o'></span> </div>
	},
	renderNormal:function(){
		var tempref=this;
		console.log(tempref);
		return (
			<div>
			{
				this.state.events.map(function(text,i){
					return <Event eventId={i} eventRemove={tempref.removeEvent} eventCompleted={tempref.completedEvent} completed={tempref.state.completed[i]}>{text}</Event>
				})
			}
			</div>
		);
	},
	render:function(){
		return (
		<div>
			<EventAdder addEvent={this.addEvent}></EventAdder>
			<div>{(this.state.events.length==0)?this.renderEmpty():this.renderNormal()}</div>
		</div>
		);
	}
});

ReactDOM.render(<Board/>,document.getElementById('root'));