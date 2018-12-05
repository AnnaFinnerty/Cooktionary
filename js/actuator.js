function Actuator(data,menuOptions){
    //console.log("Actuator running!");
    
    this.build = new Build(this.emit.bind(this),this.registerMenu.bind(this),data.isMobile, menuOptions);
    this.menuOptions = menuOptions;
    this.menus = {};
    
    this.content = document.querySelector('.content');
    //this.showing = "big-search";
    this.result_type = "expanded";
    
    this.acuator_data = data;
    this.isMobile = data.isMobile;
    
    this.header = new Header(this.build,this.isMobile);
    this.sidebar = new Sidebar(this.build, this.menuOptions.collections);
    
    
    this.current_page;
    this.current_data;
    
    this.events = {};
}

Actuator.prototype.actuate = function(page,data,actuator_data){
    this.acuator_data = actuator_data;
    this.clearContainer(this.content);
    console.log(data);
    
    //check to see if logo needs to be adjusted
    
    if(!this.isMobile){
          this.header.toggleHeader(page); 
    }
    
    switch(page){
        case "results":
            if(!this.isMobile){
               this.sidebar.showSidebar(); 
            }
            this.showSearchResults(data);
            break;
         
        case "full": 
            if(!this.isMobile){
               this.sidebar.showSidebar(); 
            }
            this.showFull(data);
            break
            
        case "browse": 
            if(!this.isMobile){
               this.sidebar.showSidebar(); 
            }
            this.showBrowse(data);
            break
            
        case "advanced": 
            if(!this.isMobile){
               this.sidebar.showSidebar(); 
            }
            this.showAdvancedSearch(data);
            break
            
        case "blog":
            if(!this.isMobile){
               this.sidebar.showSidebar(); 
            }
            this.showBlog(data);
            break;
            
        default:            // big-search
            this.sidebar.hideSidebar();
            this.showCleanSearch(data);
            break;
    }
    this.current_page = page;
    this.current_id = data;
}

Actuator.prototype.reloadPage = function(data,a_data){
    var current_data = data ? data : this.current_data;
    var acuator_data = a_data ? a_data : this.acuator_data;
    this.actuate(this.current_page,current_data,acuator_data);
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
    this.recentBar(this.acuator_data.incentives);
}

Actuator.prototype.showAdvancedSearch = function(){
    console.log("Showing Advanced Search");
    var search_criteria = this.acuator_data.searchCriteria;
    var search_data = this.menuOptions.searchData;
    var controls_container = this.build.makeElement(this.content,"Div","advanced-search-container");
    for(var criterium in search_data){
        if(criterium != "text"){
            var label = this.build.makeElement(controls_container,"Div","search-criteria-label","",criterium);
            var display_options = [];
            var first_entry;
            if(search_data[criterium].length){
                for(var i = 0;i<search_data[criterium].length;i++){
                    var item = search_data[criterium][i];
                    var obj = {};
                    obj['display'] = this.build.capitalize(this.build.returnName(item));
                    obj['id'] = criterium + "_" + item;
                    display_options.push(obj)
                }
            this.build.buildMenu(label,criterium,display_options,"advanced-select","update_search","<span class='glyphicons glyphicons-plus-sign advanced-select-menu icon'></span>");
            }
            console.log(display_options);
            
        }
    }
    var results_container = this.build.makeElement(this.content,"Div","advanced-search-results-container");
     var search_terms_container = this.build.makeElement(results_container,"Div","search-terms-container");
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
    this.build.buildMenu(browse_header,"browse-menu", dropdown_options, "visible", "update_browse", this.acuator_data.browsingBy);
    
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
    
    var container = this.build.makeElement(this.content,"Div","blog-container","");
    this.build.makeElement(container, "Div","blog-header","","blog");
}

Actuator.prototype.recentBar = function(data){
    //needs to be refocused to something else
    //console.log(data);
    var recent_container = this.build.makeElement(this.content,"Div","recent-container inline");
    var recent_content = this.build.makeElement(recent_container,"Div","recent-content inline");
    for(var recent in data){
        //var recent_item = this.makeElement(recent_content,"Div","recent-item",recent,recent);
        var display_name = this.build.returnName(recent);
        var recent_image = this.build.makeImg(recent_content,recent,recent,"recent-image",display_name);
        this.build.bindEventListener(recent,"show_full","click");
    }
}

Actuator.prototype.updateData = function(newData){
    console.log("new data!");
    console.log(newData);
    this.acuator_data = newData;
}

Actuator.prototype.updateResults = function(container_id,new_results){
    
}

Actuator.prototype.registerMenu = function(name,func){
    console.log("registering menu!");
    if(!this.menus[name]){
        this.menus[name] = func;
    }
    console.log(this.menus);
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
