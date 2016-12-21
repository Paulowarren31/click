//content script injected into every page. Records clicks and saves them.


$(function(){

  //TODO 
  //this looks weird having all this code inside the get function
  chrome.storage.local.get('clicks', function(res){
    var clicks = res.clicks

    
    //TODO
    //make clicking better cause it kind of sucks
    
    //on link click
    $('a, img, div img').on('click', function(e){
      console.log('clicked')

      if(clicks != undefined){
        saveClick(clicks)
      }

    })


  })

})

//increments and saves, shouldnt be undefined
function saveClick(clicks){
  clicks++;
  chrome.storage.local.set({
    ['clicks']: clicks
  });

}
