change = document.querySelectorAll('input[type="range"]')
change.forEach(element => {
  element.addEventListener('change', ()=>{


var hrange = document.getElementById('hrange')
var wndrange = document.getElementById('wndrange')
var value = document.getElementById('value')


var ht = document.querySelectorAll('.ht')
var wnd = document.querySelectorAll('.wnd')
var turbine = document.querySelector('.mover')

    h1 = 30
    var h2 = hrange.value
    v_h1 = wndrange.value
    
    
    // rendering values
    ht.forEach(element => {
      element.innerHTML = h2
    });
    wnd.forEach(element => {
      element.innerHTML = v_h1
    });
    // getting velocity
    var v2 = velocity2(h2,v_h1,z)
    // rendering the velocity 2
    value.innerHTML = v2.toFixed(2)+ ' m/s';
    // rendering house supply
    document.querySelector('.supplyValue').innerHTML =  house_supply(v2.toFixed(2)).toFixed(2)
    // updating the graph
    graph_update(v2.toFixed(1))
    // changing the position of turbine
    turbine.style.bottom  = (h2*1.5)-150   + 'px'
    // rotation speed 
    document.querySelector('img#xyz').style.webkitAnimationDuration = (1/(v_h1))+1.2 + 's'
    // velocity greater than 25 not accepted
    if (v2.toFixed(0)>25){
      alert('The wind speed is greater than 25 m/s. The wind turbine must be shut down')
      document.querySelector('img#xyz').style.webkitAnimationDuration = 0 + 's'
    }
    else if (v2.toFixed(0)==0){
      document.querySelector('img#xyz').style.webkitAnimationDuration = 0 + 's'
    }
  })
});

function velocity2(h2,v_h1,z){
  v2 = v_h1 * (Math.log(h2/z)/Math.log(10/z)) //log wind profile formula
  return v2
}

function windEnergy(x){

  performance = (0.45*0.5*((3.1417*50*50)) * Math.pow(x,3))/1000 // performance formula
  return performance

}


function house_supply(x){ //houses supplied formula
  if (x<12){
  performance = windEnergy(x)
  supply = ((performance*8760))/3500
  console.log(performance)
  return supply
}
  else if(x>=12 && x<25){
   performance = 3050
  supply = ((performance*8760))/3500
  console.log(performance)
  return supply
  }
  else{
    return 0
  }
} 


function graph_update(x){

  var arr = [];
    for (var i = 0; i < 12; i= i+0.1) {
    arr.push(i.toFixed(1)); 
  }
  console.log(arr)

  x_axis_2 = ['13.0','14.0','15.0','16.0','17.0','18.0','19.0','20.0','21.0','22.0','23.0','24.0','25.0','26.0','27.0','28.0','29.0','30.0']
  generated_x = [...arr,...x_axis_2]
  

 generated_y = []
 for (i in arr) {
    generated_y.push(windEnergy(arr[i]));
}

generated_y = [...generated_y,'3053','3053','3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053','0','0','0','0','0' ]

  Plotly.react( document.getElementById('tester'), [
    {
    x: generated_x,
    y:  generated_y
  
  },
  
    {
    x: parseFloat(x)>12?[(Math.ceil(parseFloat(x))).toString()]:[x],
    y: parseFloat(x)>=25?[0]:parseFloat(x)>12?['3053']:[generated_y[generated_x.indexOf(x)]],
    mode: 'lines+markers',
    type: 'scatter'
  }
  ] ,{
    margin: { b: 30,t:25 },
    showlegend:false,
    xaxis:{
      title:{
        text:'Wind Speed(m/s)'
      }
    },
    yaxis:{
      title:{
        text:'Performance(Kw)'
      }
    },
    title: {
      text:'Tubrine Performance',
      font: {
        family: 'Courier New, monospace',
        size: 18  
      },
      xref: 'paper',
      x: 0.9,
    },
  })
    
}



function initial_graph(x){
  var arr = [];
  for (var i = 0; i < 12; i= i+0.1) {
  arr.push(i.toFixed(1)); 
}
console.log(arr)
x_axis_2 = ['13.0','14.0','15.0','16.0','17.0','18.0','19.0','20.0','21.0','22.0','23.0','24.0','25.0','26.0','27.0','28.0','29.0','30.0']
generated_x = [...arr,...x_axis_2]


generated_y = []
for (i in arr) {
  generated_y.push(windEnergy(arr[i]));
}

generated_y = [...generated_y,'3053','3053','3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053', '3053','0','0','0','0','0' ]


  Plotly.newPlot( document.getElementById('tester'), [
    {
    x: generated_x,
    y:  generated_y
  
  },
  
    {
   
    x:[0],
    y:[0],
    mode: 'lines+markers',
    type: 'scatter'
  }
  ] ,{
    margin: { b: 30,t:25 },
    showlegend:false,
    xaxis:{
      title:{
        text:'Wind Speed(m/s)'
      }
    },
    yaxis:{
      title:{
        text:'Performance(kW)'
      }
    },
    title: {
      text:'Turbine Performance',
      font: {
        family: 'Courier New, monospace',
        size: 18  
      },
      xref: 'paper',
      x: 0.9,
    },
  })
    
}


initial_graph('12.3')
