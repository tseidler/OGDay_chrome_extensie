var chucking = false;
var numChuckImages = 6;
var chuckAPI = 'http://api.icndb.com/jokes/random?escape=javascript';

chrome.browserAction.onClicked.addListener(toggleChuck);
function toggleChuck() {
  chucking = !chucking;

  if(chucking) {
    chrome.browserAction.setBadgeText({text: 'BAM'});
    doChuck();
  } else {
    chrome.browserAction.setBadgeText({text: ''});
  }
};

function doChuck() {
  if(!chucking) { return; }
  // eerst, get een random joke via de API
  var request = new XMLHttpRequest();
  request.open('GET',chuckAPI, true);
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      showNotification(data.value.joke, data.value.id);
    } else {
      showNotification("Er ging iets mis :(", 0);
    }
  };

  request.onerror = function () {
    showNotification("Er ging iets mis :(", 0);
  };
  request.send();

  var volgendeChuck = Math.floor(5 + Math.random() * 5) * 1000;
  console.log('Volgende chuck in ' + (volgendeChuck / 1000) + 's');
  setTimeout(doChuck, volgendeChuck);

}

function showNotification(message, number) {
  var notificationOptions = {
    'type':       'basic',
    'title':      'Chuck fact #' + number,
    'message':    message,
    'iconUrl':   'images/' + Math.floor(1 + Math.random() * numChuckImages) + '.jpg',
  };
  chrome.notifications.create(String(number), notificationOptions);
}
