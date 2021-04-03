function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

var ifdoall = false;
var prev_page = 0;
var Global_variable_title = "";
chrome.browserAction.onClicked.addListener(function (tab) {

    chrome.tabs.executeScript(tab.id, { file: "autoclick.js" }, function () {
        ifdoall = (ifdoall) ? false : true;
    });

});

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    if (changeInfo.url) {
        if (changeInfo.url.toString().search("https://www.slader.com/textbook/") !== -1) {
            if (parseInt(changeInfo.url.toString().split('/')[5], 10) >= prev_page) {
                Global_variable_title = "";
                function checkFlag() {
                    if (Global_variable_title.search("~pic_download_loaded") === -1) {
                        //download(tab.title, "url_test2", "txt");
                        chrome.tabs.get(tabId, function (tab2) {
                            Global_variable_title = tab2.title;
                        });
                        setTimeout(() => {
                            checkFlag();
                        }, 500);
                        /* 每隔1000 milliseconds會檢查一次flag狀態是否變化*/
                        console.log("等候中...");
                    } else {
                        if (ifdoall) {

                            chrome.tabs.executeScript(tab.id, { file: "rename_title_withDoAll.js" }, function () {
                                //no move
                            });

                        } else {
                            chrome.tabs.executeScript(tab.id, { file: "rename_title_noDo.js" }, function () {
                                //no move
                            });
                        }
                    }
                }
                checkFlag();
            }
        }
        prev_page = parseInt(changeInfo.url.toString().split('/')[5], 10);
    }
});
