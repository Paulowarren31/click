

$(function(){
  init();

  //BEGIN BUTTON
  $('#button_begin').click(function(e){
    saveName();
    show('#main');
  })

  ////SHOP
  //
  //upgrade
  $('#buy-light').click(function(){
    chrome.storage.local.get(['prod', 'clicks'], function(res){
      console.log(res)
      if(res.prod != undefined){

        if(buy_prod(50, 10, res)){
          //refresh
          refresh();
        }
        else{
          //not enough money
        }

      }
    })
  })
  $('#buy-med').click(function(){

  })
  $('#buy-power').click(function(){

  })



})

function init(){

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.type == 'refresh') refresh();
  });
  //if no name ask for name,
  //else send to main screen
  chrome.storage.local.get(['name', 'clicks'], function(res){
    console.log(res)
    if(res.name === undefined){
      //show intro stuff
      show('#intro');
    }
    else{
      refresh();
      initBurst();
      //show main screen
      show('#main');
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
      count:        count,
      top:          155,
      x:            67,
      radiusX:      {0:40},
      radiusY:      {0:50},

      children:     {
        shape: res.shape,
        stroke: res.color,
        fill: 'teal',
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
    'clicks': 100,
    'prod': 0,
    'color': 'teal',
    'count': 1,
    'shape': 'line',
  })
}

function show(id){
  $(id).removeClass('hidden-xs-up');
}

function hide(id){
  $(id).addClass('hidden-xs-up');
}

function refresh(){
  chrome.storage.local.get(['clicks', 'prod'], function(res){
    console.log(res)
    $('#counter').text(res.clicks + ' clicks')
    $('#prod').text('+' + res.prod + ' clicks/min')
  })

}

function buy_prod(cost, prod, res){
  if(res.clicks >= cost){
    chrome.storage.local.set({
      'prod': res.prod + prod, //+10 per min
      'clicks': res.clicks - cost
    }, function(){
      refresh();
    })
  }
  else return false

}

function cheat(c){
  chrome.storage.local.set({
    'clicks': c
  }, function(){
    refresh();
  })
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
      'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue);
  }
});
