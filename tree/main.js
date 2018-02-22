import React from 'react';
import ReactDOM from 'react-dom';
import MyContainer from './containers/MyContainer'

document.getElementById('inputTree').value=`[ {"key":1, "name":"Stella Payne Diaz", "title":"CEO"},
{"key":2, "name":"Luke Warm", "title":"VP Marketing/Sales", "parent":1},
{"key":3, "name":"Meg Meehan Hoffa", "title":"Sales", "parent":2},
{"key":4, "name":"Peggy Flaming", "title":"VP Engineering", "parent":1},
{"key":5, "name":"Saul Wellingood", "title":"Manufacturing", "parent":4},
{"key":6, "name":"Al Ligori", "title":"Marketing", "parent":2},
{"key":7, "name":"Dot Stubadd", "title":"Sales Rep", "parent":3},
{"key":8, "name":"Les Ismore", "title":"Project Mgr", "parent":5},
{"key":9, "name":"April Lynn Parris", "title":"Events Mgr", "parent":6},
{"key":10, "name":"Xavier Breath", "title":"Engineering", "parent":4},
{"key":11, "name":"Anita Hammer", "title":"Process", "parent":5},
{"key":12, "name":"Billy Aiken", "title":"Software", "parent":10},
{"key":13, "name":"Stan Wellback", "title":"Testing", "parent":10},
{"key":14, "name":"Marge Innovera", "title":"Hardware", "parent":10},
{"key":15, "name":"Evan Elpus", "title":"Quality", "parent":5},
{"key":16, "name":"Lotta B. Essen", "title":"Sales Rep", "parent":3}]`;

var inputTreeData = null;

var node=null;

document.getElementById('submitTree').addEventListener('click',function(){
  if(node){ReactDOM.unmountComponentAtNode(document.getElementById('app'));}
  inputTreeData = JSON.parse(document.getElementById('inputTree').value||'{}')||placeholerInputTreeData;
  renderTree();
});

function renderTree(){
  var children={};
  for(var i=0;i<inputTreeData.length;i++){
    if(inputTreeData[i].parent){
      if(children[inputTreeData[i].parent]!=undefined){children[inputTreeData[i].parent]++;}
      else{children[inputTreeData[i].parent]=1;}
    }
  }
  console.log(children)
  for(var i=0;i<inputTreeData.length;i++){
    var t=inputTreeData[i];
    node = ReactDOM.render(<MyContainer id={t.key} name={t.name} title={t.title} parent={t.parent} children={children[t.parent]}/>,document.getElementById('app'));
  }
}

document.getElementById('submitTree').click();

d3.select("body").select("svg").attr("width",window.innerWidth).attr("height",window.innerHeight-200);
