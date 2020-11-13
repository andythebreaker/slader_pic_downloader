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


var outstr=String(new Date().today() + "-" + new Date().timeNow())+"\n"+ "currrentULR=" + document.URL+"\n";
var mainlist = document.getElementsByClassName('image-reg');
var mainlist2 = document.getElementsByClassName('image');
var pic_count=0;
var file_name_pre = document.URL.replace(/\//g, '_').replace(/\:/g, '_').replace(/\=/g, '_').replace(/\./g, '_').replace(/\&/g, '_');
outstr=outstr+file_name_pre+"\n";
var map = new Map();

/*mainlist.forEach(element => {
    outstr=outstr+"pic_count="+String(pic_count)+"\n";
    outstr=outstr+String(element.src)+"\n";
});*/

/*var mainlist_element =mainlist[0];
    outstr=outstr+"pic_count="+String(pic_count)+"\n";
    outstr=outstr+String(mainlist_element.src)+"\n";*/

    for(var mainlist_element of mainlist){
        //outstr=outstr+"pic_count="+String(pic_count)+"\n";
        //outstr=outstr+"ABC="+String(String(document.body.innerHTML).indexOf(String(mainlist_element.src)))+"\n";
        map.set(String(document.body.innerHTML).indexOf(String(mainlist_element.src)),String(mainlist_element.src));
        //outstr=outstr+String(mainlist_element.src)+"\n";
        pic_count=pic_count+1;
        /*var link = document.createElement('a');
    link.href = mainlist_element.src;
    link.download=file_name_pre+".png";
    link.target="_blank";
    link.click();*/
    //startDownload(mainlist_element.src);
    }

    //2
    //outstr=outstr+"================\n";
    for(var mainlist_element of mainlist2){
        //outstr=outstr+"pic_count="+String(pic_count)+"\n";
        //outstr=outstr+"ABC="+String(String(document.body.innerHTML).indexOf(String(mainlist_element.src)))+"\n";
        map.set(String(document.body.innerHTML).indexOf(String(mainlist_element.src)),String(mainlist_element.src));
        //outstr=outstr+String(mainlist_element.src)+"\n";
        pic_count=pic_count+1;
    }

    var mapAsc = new Map([...map.entries()].sort((e1, e2) => e1[0] - e2[0]));
    //outstr=outstr+"##################\n";
    var count_new_kind=0;
    for (var [key, value] of mapAsc) {
        outstr=outstr+"pic_count="+String(count_new_kind)+";AbsolutePosition="+String(key)+"\n"+String(value)+"\n";
        count_new_kind=count_new_kind+1;
    }

download(outstr, 'slader_pic_download_log', 'txt');