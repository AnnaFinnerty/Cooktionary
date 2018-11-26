function App(){
    console.log("App Running!");
    
    this.storageManager = new StorageManager(this.goBack.bind(this));
    
    var isMobile = this.detectMobile();
    this.adManager = new AdManager();
    this.searchManager = new SearchManager();
    this.language = "english";
    
    this.acuator_data = {
        language: this.language,
        isMobile: isMobile,
        collections: this.searchManager.collections,
        searchByOptions: this.searchManager.searchByOptions,
        browseCategories: this.searchManager.browseCategories,
        searchingBy: this.searchManager.searchBy,
        browsingBy: this.searchManager.browsingBy,
        searchCriteria: this.searchManager.searchCriteria,
        incentives: this.storageManager.incentives,
        recent: this.searchManager.recent
    }
    this.actuator = new Actuator(this.acuator_data);
    this.inputManager = new InputManager();
    
    
    //this.lastPage = "clean-search";
    
    
    this.awake();
}

App.prototype.awake = function(){
     
    this.actuator.on("change-page",this.changePage.bind(this));
    this.actuator.on("update-text",this.updateSearchText.bind(this));
    this.actuator.on("update-search",this.updateSearchParameter.bind(this));
    this.actuator.on("run-search",this.runSearch.bind(this));
    this.actuator.on("update-browse",this.updateBrowse.bind(this));
    this.actuator.on("show-random",this.showRandom.bind(this));
    this.actuator.on("show-full",this.showFull.bind(this));
    this.actuator.on("go-back",this.goBack.bind(this));
    this.actuator.on("register",this.registerAd.bind(this));
    
    this.inputManager.on("enter",this.runSearch.bind(this));
    
    this.loadScreen();
}

App.prototype.actuate = function(page,data){
    this.actuator.actuate(page,data);
    this.updateHistory(page,data);
}

App.prototype.updateAcuator = function(){
    
}

App.prototype.updateHistory = function(page,data){
    var id;
    switch(page){
        case "full":
            id = data.id;
            break;
            
        case "browse":
            id = this.searchManager.browsingBy;
            break;
            
        default:
            id = null;
            break;
    }
    this.storageManager.updateHistory(page,id);
}

App.prototype.goBack = function(page,data){
    console.log("Go back!")
    console.log(page);
    console.log(data);
    
    switch(page){
        case "full":
            this.showFull(data);
            break;
            
        case "browse":
            this.updateBrowse(data);
            break;
            
        case "back-button":
            var lastPage = this.storageManager.getLastPage();
            console.log(lastPage);
            page = lastPage[0];
            data = lastPage[1];
            this.changePage(page,data);
            break;
            
        default:
            this.changePage(page,data);
            break;
    }
}

App.prototype.changePage = function(page,data){
    console.log("Changing page!");
    console.log(page);
    if(page === "clean-search"){
        this.actuate("clean-search",[this.searchManager.searchBy, this.searchManager.searchByOptions,this.storageManager.incentives]);
        //this.loadScreen();
    } else {
        this.actuate(page,data);
    }  
}

App.prototype.loadScreen = function(){
    var data = {
        searchBy: this.searchManager.searchBy,
        searchOptions: this.searchManager.searchByOptions,
        recent: this.storageManager.recent
    }
    this.actuate("clean-search",[this.searchManager.searchBy, this.searchManager.searchByOptions,this.storageManager.incentives]);
}

App.prototype.runSearch = function(){
    console.log("running search!");
    
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      var results = self.searchManager.search();    
      resolve(results);
    });

    promise.then(function(results) {
      self.changePage("results",results);
    })
}

App.prototype.updateBrowse = function(newSetting){
    console.log("update browse");
    this.searchManager.updateBrowseSettings(newSetting);
    var data = {
        type: this.searchManager.browsingBy,
        data: this.searchManager.browse()
    }
    this.changePage("browse",data);
}

App.prototype.updateSearchParameter = function(searchData){
    console.log("updating search!");
    if(searchData == "search_advanced"){
        this.changePage("advanced",this.searchManager.searchCriteria);
    } else if (searchData == "show_random") {
        this.showRandom();
    } else {
        this.searchManager.updateSearchParameters(searchData);
    }
}

App.prototype.showFull = function(request){
    //another promise should be added here when running from actual database
    var record = this.searchManager.findSingleRecord(request);
    this.changePage("full",record);
}

App.prototype.showRandom = function(){
    //another promise should be added here when running from actual database
    var record = this.searchManager.showRandom();
    console.log(record);
    this.changePage("full",record);
}

App.prototype.detectMobile = function(){
    if(window.innerWidth < 500){
        console.log("Mobile sizing detected!");
        return true
    } else {
        return false
    }
}

App.prototype.updateSearchText = function(newText){
    console.log("updating search text!");
    this.searchManager.updateSearchText(newText);
}

App.prototype.registerAd = function(newAd){
    this.adManager.registerAd(newAd);
}

/*
App.prototype.handleSearch = function(action,searchData){
    console.log("handling search!");
    console.log(action);
    console.log(searchData);
    this.searchManager.search(searchData);
}
*/

