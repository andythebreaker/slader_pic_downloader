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

// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

//https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
/*function download_pic_fucn(parm_) {
    var node_item = document.createElement("DIV");
    var textnode = document.createTextNode("Water");
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
  }*/
/*function startDownload(url) {

  window.location.href = url;
}*/

function do_all_copy() {
    var outstr = String(new Date().today() + "-" + new Date().timeNow()) + "\n" + "currrentULR=" + document.URL + "\n";
    var mainlist = document.getElementsByClassName('image-reg');
    var mainlist2 = document.getElementsByClassName('image');

    //=======================new part 2021======================
    var listOfSolutionContent = document.getElementsByClassName('solution-content');
    var listOfCommentUserContent = document.getElementsByClassName('comment user-content');

    //=======================ned of new part 2021======================

    var pic_count = 0;
    var file_name_pre = document.URL.replace(/\//g, '_').replace(/\:/g, '_').replace(/\=/g, '_').replace(/\./g, '_').replace(/\&/g, '_');
    outstr = outstr + file_name_pre + "\n";
    var map = new Map();

    for (var mainlist_element of mainlist) {
        map.set(String(document.body.innerHTML).indexOf(String(mainlist_element.src)), String(mainlist_element.src));
        pic_count = pic_count + 1;
    }

    //2
    for (var mainlist_element of mainlist2) {
        map.set(String(document.body.innerHTML).indexOf(String(mainlist_element.src)), String(mainlist_element.src));
        pic_count = pic_count + 1;
    }

    var prev_index = 0;
    for (var Slisc of listOfSolutionContent) {
        var tmpStringLisc = Slisc.textContent.replaceAll('\n','`1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./');
        var tmpIntIndexOfStuff = String(document.body.innerHTML).indexOf(String(Slisc.innerHTML), prev_index);
        map.set(tmpIntIndexOfStuff, tmpStringLisc);
        prev_index = tmpIntIndexOfStuff;
        pic_count = pic_count + 1;
    }

    prev_index = 0;
    for (var Slisc of listOfCommentUserContent) {
        var tmpStringLisc = Slisc.textContent.replaceAll('\n','`1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./');
        var tmpIntIndexOfStuff = String(document.body.innerHTML).indexOf(String(Slisc.innerHTML), prev_index);
        map.set(tmpIntIndexOfStuff, tmpStringLisc);
        prev_index = tmpIntIndexOfStuff;
        pic_count = pic_count + 1;
    }

    var mapAsc = new Map([...map.entries()].sort((e1, e2) => e1[0] - e2[0]));
    var count_new_kind = 0;
    for (var [key, value] of mapAsc) {
        outstr = outstr + "pic_count=" + String(count_new_kind) + ";AbsolutePosition=" + String(key) + "\n" + String(value) + "\n";
        count_new_kind = count_new_kind + 1;
    }

    download(outstr, 'slader_pic_download_log', 'txt');

}

// 1. Create the button
var button_ab = document.createElement("button");
button_ab.innerHTML = "<div id=ab_button><a style=\"background-color:#FFC991\">download_this_page</a></div>";
// 2. Append somewhere
var body = document.getElementsByClassName('Textbook__header-img')[0].appendChild(button_ab);
// 3. Add event handler
button_ab.addEventListener("click", function () {
    console.log("button_ab.addEventListener (\"click\", function()!");
    do_all_copy();
});


window.onload = function () {
    document.title += "~pic_download_loaded";
    function checkFlag() {
        if (document.title.search("~pic_download_loaded") !== -1) {
            setTimeout(() => {
                checkFlag();
            }, 500);
            /* 每隔1000 milliseconds會檢查一次flag狀態是否變化*/

            console.log("等候中...");
        } else {
            /* do something*/
            if (document.title.search("doall_") !== -1) {
                console.log("等候完畢!");
                console.log("page load!");
                do_all_copy();
                document.getElementsByClassName("next")[0].click();
            }
        }
    }
    checkFlag();



}