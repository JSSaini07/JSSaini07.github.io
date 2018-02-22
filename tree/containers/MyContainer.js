import React from 'react';
import ReactDOM from 'react-dom';

class MyContainer extends React.Component {
    constructor(props){
  		super(props);
  		this.resetMouseState=this.resetMouseState.bind(this);
      this.moveLines=this.moveLines.bind(this);
      this.findFarthest=this.findFarthest.bind(this);
  	}
    resetMouseState(){
      var elements = document.querySelectorAll('g');
      for(var i=0;i<elements.length;i++){
        elements[i].setAttribute('dragState',0);
      }
    }
    moveLines(g){
      var state=parseInt(g.getAttribute("dragState"));
      if(state){
        var x=event.offsetX;
        var y=event.offsetY;
        var offsetX= parseInt(d3.select(g).attr("width"))/2;
        var offsetY= parseInt(d3.select(g).attr("height"))/2;
        g.setAttribute("transform","translate("+(x-offsetX)+','+(y-offsetY)+')');
        var sourceLines = document.querySelectorAll('line[source="'+g.getAttribute('boxId')+'"]');
        var destinationLines = document.querySelectorAll('line[destination="'+g.getAttribute('boxId')+'"]');
        for(var i=0;i<sourceLines.length;i++){
          var line = sourceLines[i];
          line.setAttribute("x2",(x-offsetX));
          line.setAttribute("y2",(y-offsetY));
        }
        for(var i=0;i<destinationLines.length;i++){
          var line = destinationLines[i];
          line.setAttribute("x1",(x-offsetX));
          line.setAttribute("y1",(y-offsetY));
        }
      }
    }
    findFarthest(){
        var farthestX = 0,farthestY = 0;
        var elements = document.querySelectorAll('g');
        for(var i=0;i<elements.length;i++){
          var box= elements[i].getClientRects()[0];
          if(box.x > farthestX){farthestX = box.x;}
          if(box.y > farthestY){farthestY = box.y;}
        }
        document.getElementById('app').setAttribute('width',farthestX+200);
        document.getElementById('app').setAttribute('height',farthestY+200);
    }
    render(){
      var ref=this;
      var rectangleWidth = 200,rectangleHeight = 100;
      var svgContainer = d3.select("body").select("svg");
      var x=0,y=0,parentX=0,parentY=0,parent = ref.props.parent
      var g = svgContainer.append("g")
                          .attr("width",110)
                          .attr("height",110)
                          .attr("boxId",ref.props.id)
                          .attr("childOf",ref.props.parent)
                          .attr("dragState","0")
                          .attr("transform",function(){
                            if(parent==undefined){y=0;x=(1920-rectangleWidth)/2;}
                            else{
                              var parentElement = document.querySelectorAll('g[boxId="'+parent+'"]')[0].getClientRects()[0];
                              var childNumber = document.querySelectorAll('g[childOf="'+parent+'"]').length-1;
                              var totalChildren = ref.props.children;
                              var marginX = parseInt((1920 - (totalChildren*rectangleWidth))/totalChildren);
                              if(marginX<=0){marginX = 40;}
                              x = (childNumber*(parentElement.width+marginX))
                              y =(parentElement.y + parentElement.height + 40);
                              parentX = parentElement.x;
                              parentY = parentElement.y;
                              if(x==0){x=40;}
                              if(y==0){y=40;}
                            }
                            return "translate(" + x + "," + y + ")";
                          })
      var rectangle = g.append("rect")
                      .attr("width",rectangleWidth)
                      .attr("height",rectangleHeight)
                      .attr("stroke","black")
                      .attr("fill","#3d7fba")
                      .attr("stroke", "#a0a0a0")
      if(parent){
        var line= svgContainer.append("line")
                    .attr("x1",x)
                    .attr("y1",y)
                    .attr("x2",parentX)
                    .attr("y2",parentY+92)
                    .attr("source",parent)
                    .attr("destination",ref.props.id)
                    .attr('stroke-width',2)
                    .attr("stroke","red")
      }
      g.append("text").attr('fill', 'black').attr('dy',rectangleHeight/2).text('Name: '+this.props.name).attr("fill","white").attr("font-weight","bold");
      g.append("text").attr('fill', 'black').attr('dy',rectangleHeight/2+20).text('Title: '+this.props.title).attr("fill","white").attr("font-weight","bold");
      g.nodes()[0].addEventListener('mousedown',function(){this.setAttribute("dragState",1)});
      document.addEventListener('mouseup',function(){ref.resetMouseState()});
      g.nodes()[0].addEventListener('mousemove',function(){ref.moveLines(this)});
      ref.findFarthest();
      return '';
    }
}

export default MyContainer;
