function Actuator(data){
    console.log("Actuator running!");
    
    this.build = new Build(this.emit.bind(this),data.isMobile);
    
    this.content = document.querySelector('.content');
    this.showing = "big-search";
    this.result_type = "expanded";
    
    this.acuator_data = data;
    
    this.events = {};
    this.awake();
}

Actuator.prototype.awake = function(){
    var header = document.querySelector(".header");
    this.logo = document.querySelector("#logo");
    
    this.toggleButtons = document.querySelector(".toggle-buttons");
    var random_button = this.build.makeElement(this.toggleButtons,"Button","sidebar-random-button","sidebar-show_random","<span class='glyphicons glyphicons-rabbit icon'></span>");
    this.build.bindEventListener("sidebar-show_random","update_search","click");
    
    this.build.makeSearchBar(this.toggleButtons,"sidebar-search");
    
    //this.build.makeElement(this.toggleButtons,"Button","sidebar-button","sidebar-search_advanced","ADVANCED");
    //this.build.bindEventListener("sidebar-search_advanced","update_search","click");
    
    
    this.build.bindEventListener("logo","change_page","click");
    var icon_container = document.querySelector(".icon-container");
    var icons = [{id:"fennel_bulb",width:"5vw",height:"10vh"},
                  {id:"tomato",width:"6vw",height:"5vw"},
                  {id:"dragonfruit",width:"6vw",height:"10vh"},
                  {id:"megrim",width:"10vw",height:"10vh"},
                 ];
    var icon = icons[Math.floor(Math.random()*icons.length)];
    
    // add random icon
    
    var id = "icon-" + icon.id + "";
    var bwImg = this.build.makeImg(icon_container,"logos/"+icon.id+"-bw","","logo-item");
        bwImg.style.height = icon.height;
        bwImg.style.width = icon.width;
    var cImg = this.build.makeImg(bwImg,"logos/"+icon.id+"-color",id,"logo-item fade-out");
        cImg.style.width = icon.width;
        cImg.style.height = icon.height;
    var added = document.querySelector("#"+id+"");
    added.addEventListener("mouseover",function(){
            this.className = "logo-item fade-in";
        })
    added.addEventListener("mouseout",function(){
            this.className = "logo-item fade-out";
        })

    this.build.bindEventListener(id,"show_full","click");
    
    var header_dropdown_options = [{display: "search",id:"clean_search"}, 
                                   {display: "browse",id:"browse",action:"update_browse"},
                                   {display: "blog",id:"blog"}
                                  ];
    var container = document.querySelector(".header");
    this.build.buildMenu(container,"menu-button",header_dropdown_options,"menu-button","change_page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");
}

Actuator.prototype.actuate = function(page,data,actuator_data){
    this.acuator_data = actuator_data;
    this.clearContainer(this.content);
    console.log(data);
    //check to see if logo needs to be adjusted
    this.toggleHeader(page);
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
            this.showSidebar();
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
    var container = this.build.makeElement(this.content,"Div","big-search-container");
    var searchbar = this.build.makeSearchBar(container,"big-search");
    this.build.buildMenu(container,this.acuator_data.searchingBy,this.acuator_data.searchByOptions,"search-options","update_search","options");
    this.recentBar(this.acuator_data.incentives);
}

Actuator.prototype.showAdvancedSearch = function(){
    console.log("Showing Advanced Search");
    var search_criteria = this.acuator_data.searchCriteria;
    var search_data = this.acuator_data.searchData;
    var controls_container = this.build.makeElement(this.content,"Div","advanced-search-container inline-wrap");
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
    
    var container = this.build.makeElement(this.content,"Div","blog-container","");
    this.build.makeElement(container, "Div","blog-header","","blog");
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
    
    this.build.makeElement(sidebar_container,"Div","sidebar-header hover","name","Collections");
    this.build.makeElement(sidebar_container,"Div","sidebar-collections-container","");
   
    var collections_container = this.build.makeElement(sidebar_container,"Div","collections-container inline-wrap");
    var collections = this.acuator_data.collections;
    for(var i=0;i<collections.length;i++){
        var obj = collections[i];
        var id = "collection-" + obj.field + "_" + obj.tag
        var collection = this.build.makeElement(collections_container, "Div", "collection-item", id, obj.display);
        this.build.bindEventListener(id,"run_search","click");
        
    }
    
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

Actuator.prototype.updateData = function(newData){
    console.log(newData);
    this.acuator_data = newData;
}

Actuator.prototype.updateResults = function(container_id,new_results){
    
}

Actuator.prototype.toggleHeader = function(page){
    console.log("toggling header!");
    var logo_style = this.logo.className;
    if(page != "clean_search"){
        this.logo.className = "logo-side";
        this.toggleButtons.className = "toggle-buttons-side inline";
    } else {
        this.logo.className = "logo-center";
        this.toggleButtons.className = "toggle-buttons-full invisible";
    }
}

Actuator.prototype.buildFullHeader = function(){
    var container = this.toggleButtons;
    var random_button = this.build.makeElement(container,"Button","sidebar-random-button","sidebar-show_random","RANDOM");
    this.build.bindEventListener("sidebar-show_random","update_search","click");
    this.build.makeSearchBar(container,"sidebar-search");
    this.build.makeElement(container,"Button","sidebar-button","sidebar-search_advanced","ADVANCED")
    this.build.bindEventListener("sidebar-search_advanced","update_search","click");
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