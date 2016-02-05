function executeExtendScript(tab) {
    var pattern = /^https:\/\/(.*)\.slack\.com/i;
    if (pattern.test(tab.url)) {
        chrome.tabs.executeScript(null, {file: 'js/extend.js'});
    }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    executeExtendScript(tab);
});

chrome.browserAction.onClicked.addListener(function(tab) {
    executeExtendScript(tab);
});