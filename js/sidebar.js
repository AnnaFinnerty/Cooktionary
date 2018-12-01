function Sidebar(build,collections){
    
    this.build = build;
    this.collections = collections;
    
    this.sidebarShowing = false;
    this.awake();
}

Sidebar.prototype.awake = function(){
    console.log("Building sidebar");
    var sidebar_container = document.querySelector('.sidebar-container');
    
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
    var collections = this.collections;
    for(var i=0;i<collections.length;i++){
        var obj = collections[i];
        var id = "collection-" + obj.field + "_" + obj.tag
        var collection = this.build.makeElement(collections_container, "Div", "collection-item", id, obj.display);
        this.build.bindEventListener(id,"run_search","click");
        
    }
    
    this.build.makeElement(sidebar_container,"Div","ad ad-sidebar","ad-sidebar");
    this.sidebarContainer = sidebar_container;
    console.log(this.sidebarContainer);
}

Sidebar.prototype.showSidebar = function(){
    this.sidebarContainer.className = "sidebar-container";
}

Sidebar.prototype.hideSidebar = function(){
    this.sidebarContainer.className = "sidebar-container hidden";
}
