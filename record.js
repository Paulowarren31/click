//content script injected into every page. Records clicks and saves them.

$(function(){
  //on link click
  $('a, img, div img').on('click', function(e){

    chrome.runtime.sendMessage({type: 'click'});
    console.log('clicked')

  })


})
