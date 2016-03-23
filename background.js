var numberOfChucks = 0;
var numChuckImages = 6;

chrome.browserAction.onClicked.addListener(doChuck);

function doChuck() {
  var notificationOptions = {
    'type':       'image',
    'title':      'Chuck #' + numberOfChucks + 1,
    'message':    'Chuck Norris BAM',
    'iconUrl':    'icons/icon128.png',
    'imageUrl':   'images/' + Math.floor(1 + Math.random() * numChuckImages) + '.jpg',
  };
  chrome.notifications.create(String(numberOfChucks++), notificationOptions);
}
