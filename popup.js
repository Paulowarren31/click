$(function(){


  init();


  $('#button_begin').click(function(e){
    saveName();
  })

})

function init(){
  //if no name ask for name,
  //else send to main screen
  chrome.storage.local.get(['name', 'clicks'], function(res){
    console.log(res)
    if(res.name === undefined){
      //show intro stuff
      $('#intro').removeClass('hidden-xs-up');
    }
    else{
      initBurst();
      //show main screen
      $('#main').removeClass('hidden-xs-up');
      $('#name_main').text('Welcome ' + res.name + '!');
      $('#counter').text(res.clicks + ' clicks');
    }
  })
}

function initBurst(){
  var getVars = ['clicks', 'color', 'count', 'shape']

  chrome.storage.local.get(getVars, function(res){

    var len = res.clicks.toString().length;
    var count = len != 1 ? len*(len-1) : 1;

    //setup burst
    var shape = new mojs.Burst({
      count:        30, 
      top:          '45%',
      x:            67,
      radiusX:      {0:40},
      radiusY:      {0:50},

      children:     {
        shape: 'curve',
        stroke: res.color,
        radius: { 0: 65 },
        duration: 1500,
      },
    });

    const timeline = new mojs.Timeline({
      repeat: 999,

    }).add(shape).play();


  })

}


function saveName(){
  var name = $('#name_input').val();

  //default values
  chrome.storage.local.set({
    'name': name,
    'clicks': 0,
    'color': 'black',
    'count': 1,
    'shape': 'line',
  })
}
