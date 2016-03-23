var numberOfChucks = 0;
var numChuckImages = 6;
var chuckAPI = 'http://api.icndb.com/jokes/random';

chrome.browserAction.onClicked.addListener(doChuck);

function doChuck() {
  // eerst, get een random joke via de API
  var request = new XMLHttpRequest();
  request.open('GET',chuckAPI, true);
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      showNotification(data.value.joke);
    } else {
      showNotification("Er ging iets mis :(");
    }
  };

  request.onerror = function () {
    showNotification("Er ging iets mis :(");
  };

  request.send();
}

function showNotification(message) {
  var notificationOptions = {
    'type':       'basic',
    'title':      'Chuck #' + (numberOfChucks + 1),
    'message':    message,
    'iconUrl':   'images/' + Math.floor(1 + Math.random() * numChuckImages) + '.jpg',
  };
  chrome.notifications.create(String(numberOfChucks++), notificationOptions);
}
