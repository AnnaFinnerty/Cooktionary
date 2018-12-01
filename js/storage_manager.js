window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function StorageManager(updatePageCallback){
    //console.log("Storage Manager running!");
    this.callback = updatePageCallback;
    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
    
    this.recent = [];
    this.incentives = fakeData;
    this.recent_ingrediants = this.getRecentIngrediants();
    console.log(this.recent_ingrediants);
    this.language = this.getLanguage();
    
    //console.log(this.language);
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
    //console.log(page);
    var pagename = id ? "#" + page + "/" + id : "#" + page;
    history.pushState({page: this.pagecount},null,pagename);
    this.pagecount++;
    this.recent.push(pagename);
    if(page == "full"){
        this.storeRecentIngrediant(id);
    }
}

StorageManager.prototype.storeRecentIngrediant = function(newIngrediant){
    //console.log("Storing new ingrediant!");
    //console.log(newIngrediant);
    var recent = this.recent_ingrediants;
    var test = true;
    for(var i = 0; i<recent.length;i++){
        var r = recent[i];
        //console.log(r);
        if(r === newIngrediant){
            test = false;
        }
        if(r == ""){
            recent.splice(i,1);
        }
    }
    if(test){
        recent.push(newIngrediant);
        if(recent.length > 3){
            recent.splice(0,1);
        }
    }
    
    this.recent_ingrediants = recent;
    this.setRecentIngrediants(recent);
    //console.log(this.recent_ingrediants);
}

StorageManager.prototype.newPage = function(pagename){
    console.log(pagename);
    var split = this.splitPageName(pagename);
    var page = split[0];
    var data = split[1]
    this.callback(page,data);
}

StorageManager.prototype.getCurrentPage = function(){
    var page = "" + document.location + "";
    return page;
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

StorageManager.prototype.localStorageSupported = function(){
      var testKey = "test";

      try {
        var storage = window.localStorage;
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
}

StorageManager.prototype.getLanguage = function(){
    //console.log("getting language");
    return this.storage.getItem("language") || "english";
}

StorageManager.prototype.setLanguage = function (newLanguage) {
    console.log("setting recent ingrediants");
    this.storage.setItem("language", newLanguage);
    console.log(this.storage);
};

StorageManager.prototype.getRecentIngrediants = function(){
    //console.log("getting recent ingrediants");
    var recent = this.stringToArray(this.storage.getItem("recent"));
    console.log(recent);
    return recent || [] ;
}

StorageManager.prototype.setRecentIngrediants = function(){
    console.log("setting recent ingrediants");
    this.storage.setItem("recent",this.arrayToString(this.recent_ingrediants));
    console.log(this.storage);
}

StorageManager.prototype.arrayToString = function(arr){
    var str = "";
    for(var i = 0 ; i< arr.length; i++){
        str = i == 0 ? str + arr[i] : str + "," + arr[i];
    }
    return str;
}

StorageManager.prototype.stringToArray = function(str){
    var arr = [];
    var split;
    try{
        split = str.split(",");
    } catch(err){
        split = [];
    }
    for(var i = 0; i<split.length; i++){
        if(split[i] != ""){
            arr.push(split[i]);
        }
    }
    return arr
}