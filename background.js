
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == 'click'){
      click();
    }
});

setInterval(function(){
  chrome.storage.local.get(['clicks','prod'], function(res){
    chrome.storage.local.set({
      'clicks': res.clicks + res.prod
    }, function(){
      chrome.runtime.sendMessage({type: 'refresh'});
    })
  })
}, 60*1000);
  

function click(){
  chrome.storage.local.get('clicks', function(res){
    var clicks = res.clicks
    if(clicks != undefined){
      chrome.storage.local.set({
        'clicks': clicks + 1
      })
    }
  })
}


