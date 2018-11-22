function Actuator(isMobile){
    console.log("Actuator running!");
    
    this.build = new Build(this.emit.bind(this),isMobile);
    
    this.content = document.querySelector('.content');
    this.showing = "big-search";
    this.result_type = "expanded";
    this.language = "english";
    
    this.events = {};
    this.awake();
}

Actuator.prototype.awake = function(){
    var logo = document.querySelector(".logo");
    this.build.bindEventListener("clean-search","change-page","click");
    var logo_container = this.build.makeElement(logo,"Div","logo-container inline");
    var icons = ["fennel_bulb","tomato"];
    
    // add icons
    for(var i=0;i<icons.length;i++){
        var bwImg = this.build.makeImg(logo_container,"logos/"+icons[i]+"-bw","","logo-item");
        this.build.makeImg(bwImg,"logos/"+icons[i]+"-color",icons[i],"logo-item fade-out");
        var added = document.querySelector("#"+icons[i]);
        added.addEventListener("mouseover",function(){
            this.className = "logo-item fade-in";
        })
        added.addEventListener("mouseout",function(){
            this.className = "logo-item fade-out";
        })
        this.build.bindEventListener(icons[i],"logo-hover","mouseover");
    }
    var header_dropdown_options = [{display: "search",id:"clean-search"}, 
                                   {display: "browse",id:"browse"},
                                   {display: "blog",id:"blog"}
                                  ];
    var container = document.querySelector(".header");
    this.build.buildMenu(container,"menu-button",header_dropdown_options,"menu-button","change-page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");
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
            
        case "blog":
            this.showBlog(data);
            break;
            
        default:            // big-search
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
    var container = this.build.makeElement(this.content,"Div","big-search-container");
    var searchbar = this.build.makeSearchBar(container,"big-search");
    this.build.buildMenu(container,searchOptions[0],searchOptions[1],"search-options","update-search","options");
    this.recentBar(searchOptions[2]);
}

Actuator.prototype.showAdvancedSearch = function(){
    console.log("Showing Advanced Search");
    var advanced_search_container = this.makeElement(this.content,"Div","advance-search-container");
}

Actuator.prototype.showBrowse = function(data){
    var browse_header = this.build.makeElement(this.content,"Div","browse-header","","Browse by:");
    var dropdown_options = [{display: "name",id:"name"}, 
                            {display: "cuisine",id:"cuisine"},
                            {display: "language",id:"language"}
                            ];
    this.build.buildMenu(browse_header,"browse-menu",dropdown_options,"visible","update-browse","name");
    var container = this.build.makeElement(this.content,"Div","browse-container");
    var content = this.build.makeElement(container,"Div","browse-content");
    for(var i=0;i<data.length;i++){
        var result = data[i];
        this.build.buildResult(content,result,"browse");
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
    this.build.bindEventListener("name","change-page","click");
    this.build.makeElement(browse_header,"Div","sidebar-subhead","cuisine","Cuisine");
    this.build.makeElement(browse_header,"Div","sidebar-subhead","language","Language");
    this.build.makeElement(browse_header,"Div","sidebar-header","name","Advanced Search");
    this.build.makeElement(sidebar_container,"Div","ad","ad-sidebar");
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
        this.build.bindEventListener(recent,"show-full","click");
    }
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
