chrome.tabs.onUpdated.addListener(function(id, info, tab){
    if (tab.url.indexOf('echo360.org') != -1 && info.status === "complete") {
        chrome.pageAction.show(tab.id);
        chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
            chrome.tabs.executeScript(null, {file: "inject.js"});
        });
    } else {
        chrome.pageAction.hide(tab.id);
    }
});
