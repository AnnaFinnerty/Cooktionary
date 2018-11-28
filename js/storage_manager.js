function StorageManager(updatePageCallback){
    console.log("Storage Manager running!");
    this.callback = updatePageCallback;
    this.recent = [];
    this.incentives = fakeData;
    this.listen();
    this.pagecount = 1;
}

StorageManager.prototype.listen = function(){
    var self = this;
    window.onpopstate = function(event) {
        console.log("updating page history")
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        var page = "" + document.location + "";
        self.newPage(page);
    };
}

StorageManager.prototype.updateHistory = function(page,id){
    var pagename = id ? "#" + page + "/" + id : "#" + page;
    history.pushState({page: this.pagecount},null,pagename);
    this.pagecount++;
    this.recent.push(pagename);
}

StorageManager.prototype.newPage = function(pagename){
    console.log(pagename);
    var split = this.splitPageName(pagename);
    var page = split[0];
    var data = split[1]
    this.callback(page,data);
}

StorageManager.prototype.getLastPage = function(){
    var lastPage = this.recent[this.recent.length-2];
    var split = this.splitPageName(lastPage);
    return split;
}

StorageManager.prototype.splitPageName = function(pagename){
    var split1 = pagename.split("#");
    console.log(split1);
    var split2 = split1[1].split("/");
    var page = split2[0];
    var data;
    if(split2.length > 1){
        data = split2[1];
    } else {
        data = null;
    }
    return [page,data];
}
