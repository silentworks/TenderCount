var fetchFreq = 60000;
var req;
var unreadCount = 0;
var discussions;

getMessages();
setInterval(getMessages, fetchFreq);

function getMessages() {
  var subDomain = localStorage['subdomain'];
  var apiKey = localStorage['apikey'];

  if (subDomain === undefined || subDomain === "" || apiKey === undefined || apiKey === "") {
    chrome.browserAction.setTitle({"title": "Tender Count - API Key or Subdomain setting incomplete"});
    chrome.browserAction.setIcon({"path": "../img/tabicon_error.png"});
    chrome.browserAction.setBadgeText({text: '0'});
    return false;
  }

  req = new XMLHttpRequest();
  req.open("GET", "http://api.tenderapp.com/" + subDomain + "/discussions/pending?auth=" + apiKey);
  req.setRequestHeader("Accept", "application/json");
  req.onload = processMessages;
  req.send();
}

function processMessages() {
  var res = JSON.parse(req.responseText);
  unreadCount = res.total;

  chrome.browserAction.setTitle({"title": "Tender Count"});
  chrome.browserAction.setIcon({"path": "../img/tabicon.png"});

  if (unreadCount > 0) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: [255, 0, 0, 255]
    });
    chrome.browserAction.setBadgeText({text: '' + unreadCount});
  }
}

chrome.browserAction.onClicked.addListener(function (t) {
  var slashLength;
  var customDomain = localStorage['customdomain'];

  if (customDomain === undefined || customDomain === '') {
    customDomain = localStorage['subdomain'] + '.tenderapp.com/';
  }

  if (customDomain !== undefined) {
    if (customDomain.indexOf('/') !== -1) {
      slashLength = customDomain.indexOf('/');
      customDomain = customDomain.substr(0, slashLength);
    }
    
    chrome.tabs.create({
      "url": 'http://' + customDomain + '/dashboard/pending'
    });
  }
});