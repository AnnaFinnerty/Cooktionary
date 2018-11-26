function Actuator(data){
    console.log("Actuator running!");
    
    this.build = new Build(this.emit.bind(this),data.isMobile);
    
    this.content = document.querySelector('.content');
    this.showing = "big-search";
    this.result_type = "expanded";
    this.language = data.language;
    this.collections = data.collections;
    this.searchCriteria = data.searchCriteria;
    this.searchByOptions = data.searchByOptions;
    this.browseCategories = data.browseCategories;
    this.searchingBy = data.searchingBy;
    this.browsingBy = data.browsingBy;
    this.incentives = data.incentives;
    this.acuator_data = data;
    
    this.events = {};
    this.awake();
}

Actuator.prototype.awake = function(){
    var logo = document.querySelector(".logo");
    this.build.bindEventListener("clean_search","change_page","click");
    var logo_container = this.build.makeElement(logo,"Div","logo-container inline");
    var icons = ["fennel_bulb","tomato","dragonfruit"];
    var icon = icons[Math.floor(Math.random()*icons.length)];
    
    // add icon
    
    var bwImg = this.build.makeImg(logo_container,"logos/"+icon+"-bw","","logo-item");
    this.build.makeImg(bwImg,"logos/"+icon+"-color",icon,"logo-item fade-out");
    var added = document.querySelector("#"+icon);
        added.addEventListener("mouseover",function(){
            this.className = "logo-item fade-in";
        })
        added.addEventListener("mouseout",function(){
            this.className = "logo-item fade-out";
        })
    this.build.bindEventListener(icon,"logo-hover","mouseover");
    
    var header_dropdown_options = [{display: "search",id:"clean_search"}, 
                                   {display: "browse",id:"browse"},
                                   {display: "blog",id:"blog"}
                                  ];
    var container = document.querySelector(".header");
    this.build.buildMenu(container,"menu-button",header_dropdown_options,"menu-button","change_page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");
}

Actuator.prototype.actuate = function(page,data){
    this.clearContainer(this.content);
    console.log(data);
    switch(page){
        case "results":
            this.showSidebar();
            this.showSearchResults(data);
            break;
         
        case "full": 
            this.showSidebar();
            this.showFull(data);
            break
            
        case "browse": 
            this.showSidebar();
            this.showBrowse(data);
            break
            
        case "advanced": 
            this.showSidebar();
            this.showAdvancedSearch(data);
            break
            
        case "blog":
            this.showBlog(data);
            break;
            
        default:            // big-search
            //this.showSidebar();
            this.showCleanSearch(data);
            break;
    }
    this.showing = page;
}

Actuator.prototype.showSearchResults = function(results){
    this.result_type = "expanded";
    var container = this.build.makeElement(this.content,"Div","results-container");
    var content = this.build.makeElement(container,"Div","results-content");
    for(var i=0;i<results.length;i++){
        var result = results[i];
        this.build.buildResult(content,result,this.result_type);
    }
}

Actuator.prototype.showFull = function(request){
    //console.log("showing full!");
    //console.log(request);
    this.result_type = "full";
    var container = this.build.makeElement(this.content,"Div","full-container");
    this.build.buildResult(container,request,this.result_type);
}

Actuator.prototype.showCleanSearch = function(searchOptions){
    console.log(this.searchingBy);
    console.log(this.searchByOptions);
    var container = this.build.makeElement(this.content,"Div","big-search-container");
    var searchbar = this.build.makeSearchBar(container,"big-search");
    this.build.buildMenu(container,this.acuator_data.searchingBy,this.acuator_data.searchByOptions,"search-options","update_search","options");
    this.recentBar(this.acuator_data.incentives);
}

Actuator.prototype.showAdvancedSearch = function(){
    console.log("Showing Advanced Search");
    var search_criteria = this.searchCriteria;
    
    var container = this.build.makeElement(this.content,"Div","advanced-search-container");
    var controls_container = this.build.makeElement(container,"Div","");
    for(var criterium in search_criteria){
        this.build.makeElement(controls_container,"Div","search-criteria-label","",criterium);
    }
    var results_container = this.build.makeElement(this.content,"Div","advanced-search-results-container");
}

Actuator.prototype.showBrowse = function(dataObj){
    console.log(dataObj);
    var type = dataObj.type;
    console.log(type);
    var data = dataObj.data;
    var container = this.build.makeElement(this.content,"Div","browse-container");
    
    var browse_header = this.build.makeElement(container,"Div","browse-header","","Browse by:");
    var dropdown_options = [{display: "name",id:"name"}, 
                            {display: "cuisine",id:"cuisine"},
                            {display: "language",id:"language"}
                            ];
    this.build.buildMenu(browse_header,"browse-menu",dropdown_options,"visible","update_browse","name");
    
    
    var content = this.build.makeElement(container,"Div","browse-content");
    if(type == "name"){
       for(var i=0;i<data.length;i++){
            var result = data[i];
            this.build.buildResult(content,result,"browse");
       } 
    } else {
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            for( var header in obj){
                this.build.makeElement(content,"Div","browse-subhead","",header);
                var entries = obj[header];
                for(var e = 0; e<entries.length; e++){
                    var entry = obj[header][e];
                    this.build.buildResult(content,entry,"browse");
                }
            }
       } 
    }
}

Actuator.prototype.showBlog = function(){
    this.build.makeElement(this.content, "Div","blog-header","","blog");
    var container = this.build.makeElement(this.content,"Div","blog-container","");
}


Actuator.prototype.showSidebar = function(){
    var sidebar_container = this.build.makeElement(this.content,"Div","sidebar-container");
    
    var browse_header = this.build.makeElement(sidebar_container,"Div","sidebar-header","","Browse By");
    this.build.makeElement(browse_header,"Div","sidebar-subhead","name","Alphabetical");
    this.build.bindEventListener("name","update_browse","click");
    this.build.makeElement(browse_header,"Div","sidebar-subhead","cuisine","Cuisine");
    this.build.bindEventListener("cuisine","update_browse","click");
    this.build.makeElement(browse_header,"Div","sidebar-subhead","language","Language");
    this.build.bindEventListener("language","update_browse","click");
    this.build.makeElement(browse_header,"Div","sidebar-subhead","name","More");
    this.build.bindEventListener("language","update_browse","click");
    
    this.build.makeElement(sidebar_container,"Div","sidebar-header","name","Collections");
    this.build.makeElement(sidebar_container,"Div","sidebar-collections-container","");
    
    this.build.makeElement(sidebar_container,"Div","sidebar-header","search_advanced","Advanced Search");
    this.build.bindEventListener("search_advanced","update_search","click");
    
    
    this.build.makeElement(sidebar_container,"Div","ad ad-sidebar","ad-sidebar");
}


Actuator.prototype.recentBar = function(data){
    //needs to be refocused to something else
    console.log(data);
    var recent_container = this.build.makeElement(this.content,"Div","recent-container inline");
    var recent_content = this.build.makeElement(recent_container,"Div","recent-content inline");
    for(var recent in data){
        //var recent_item = this.makeElement(recent_content,"Div","recent-item",recent,recent);
        var display_name = this.build.returnName(recent);
        var recent_image = this.build.makeImg(recent_content,recent,recent,"recent-image",display_name);
        this.build.bindEventListener(recent,"show_full","click");
    }
}

Actuator.prototype.updateResults = function(container_id,new_results){
    
}


Actuator.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

Actuator.prototype.emit = function (event, data) {
  console.log("action logged:  " + event + ", " + data);
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

Actuator.prototype.clearContainer = function(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
