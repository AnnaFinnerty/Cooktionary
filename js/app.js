function App(){
    console.log("App Running!");
    
    this.storageManager = new StorageManager(this.goBack.bind(this));
    
    var isMobile = this.detectMobile();
    
    this.errorManager = new ErrorManager();
    this.adManager = new AdManager();
    this.searchManager = new SearchManager(this.updateAcuator.bind(this));
    
    this.language = "english";
    
    this.acuator_data = {
        language: this.language,
        isMobile: isMobile,
        collections: this.searchManager.collections,/*STATIC -- REMOVE*/
        searchByOptions: this.searchManager.searchByOptions,/*STATIC -- REMOVE*/
        browseCategories: this.searchManager.browseCategories,/*STATIC -- REMOVE*/
        searchingBy: this.searchManager.searchBy,
        browsingBy: this.searchManager.browsingBy,
        searchCriteria: this.searchManager.searchCriteria,
        searchData: this.searchManager.searchData,/*STATIC -- REMOVE*/
        incentives: this.storageManager.incentives,/*STATIC -- REMOVE*/
        recent: this.searchManager.recent
    }
    this.actuator = new Actuator(this.acuator_data);
    this.inputManager = new InputManager();
    
    this.awake();
}

App.prototype.awake = function(){
     
    this.actuator.on("change_page",this.changePage.bind(this));
    this.actuator.on("update_text",this.updateSearchText.bind(this));
    this.actuator.on("update_search",this.updateSearchParameter.bind(this));
    this.actuator.on("run_search",this.runSearch.bind(this));
    this.actuator.on("update_browse",this.updateBrowse.bind(this));
    this.actuator.on("show_random",this.showRandom.bind(this));
    this.actuator.on("show_full",this.showFull.bind(this));
    this.actuator.on("go_back",this.goBack.bind(this));
    this.actuator.on("register",this.registerAd.bind(this));
    
    this.inputManager.on("enter",this.runSearch.bind(this));
    
    this.loadScreen();
}

App.prototype.actuate = function(page,data){
    this.actuator.actuate(page,data,this.acuator_data);
    this.updateHistory(page,data);
}

App.prototype.updateAcuator = function(){
    console.log("updating actuator data");
    this.actuator.updateData(this.acuator_data);
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
    if(page === "clean_search"){
        this.actuate("clean_search",[this.searchManager.searchBy, this.searchManager.searchByOptions,this.storageManager.incentives]);
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
    this.actuate("clean_search",[this.searchManager.searchBy, this.searchManager.searchByOptions,this.storageManager.incentives]);
}

App.prototype.quickSearch = function(criteria){
    console.log("quickSearch");
    console.log(criteria);
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
    console.log(searchData);
    var split = searchData.split("_");
    var criteria = split[0];
    var newData = "";
    for(var i = 1; i<split.length;i++){
        newData = i==1 ? newData + split[i] : newData + "_" + split[i];
    }
    if(searchData == "search_advanced"){
        this.changePage("advanced",this.searchManager.searchCriteria);
    } else if (searchData == "show_random") {
        this.showRandom();
    } else {
        this.searchManager.updateSearchCriteria(criteria,newData);
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

