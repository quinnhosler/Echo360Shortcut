chrome.tabs.onUpdated.addListener(function(id, info, tab) {
    
    var echo = tab.url.indexOf('echo360.org');
    if (echo != -1 && info.status === "complete") {
        chrome.pageAction.show(tab.id);
        chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
            chrome.tabs.executeScript(null, {file: "inject.js"});
        });
    } else if (echo != -1) {
        chrome.pageAction.show(tab.id);
    } else {
        chrome.pageAction.hide(tab.id);
    }
});
