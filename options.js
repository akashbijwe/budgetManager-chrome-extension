$(function(){

  chrome.storage.sync.get('limit', function(budget){
    $("#limit").val(budget.limit);
  });

  $("#saveLimit").on("click", function(){
    var limit = $("#limit").val();

    if(limit){
      chrome.storage.sync.set({'limit': limit}, function(){
        close();
      });
    }
  });

  $("#resetTotal").on("click", function(){
    chrome.storage.sync.set({'total': 0}, function(){

      var notiOptions = {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'total Reset',
        message: 'Total has been reset to 0!'
      };

      chrome.notifications.create('limitNotif', notiOptions);
    });
  });

});
