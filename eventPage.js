var contextMenuItem = {
  "id": "spendMoney",
  "title": "SpendMoney",
  "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value){
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData){
  //if(clickdata.menuItemId == "spendMoney" && clickData.selectionText){
  if(clickData.selectionText){
    if(isInt(clickData.selectionText)){
      chrome.storage.sync.get(['total', 'limit'], function(budget){
        var newTotal = 0;
        if(budget.total){
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({'total': newTotal}, function(){
          if(newTotal >= budget.limit){
            var notiOptions = {
              type: 'basic',
              iconUrl: 'icon48.png',
              title: 'total Reset',
              message: 'Oh! looks like you have reached the limit.'
            };

            chrome.notifications.create('limitNotif', notiOptions);
          }
        });
      });
    }
  }
});


chrome.storage.onChanged.addListener(function(changes, storageName){
  chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});
