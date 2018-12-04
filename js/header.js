function Header(build,isMobile){
    this.build = build;
    this.isMobile = isMobile;
    this.buildHeader();
}

Header.prototype.buildHeader = function(){
    
    // Build the header
    this.header = document.querySelector(".header");
    this.logo = document.querySelector("#logo-clean_search");
    this.build.bindEventListener("logo-clean_search","change_page","click");
    this.icon = new Icon(this.build);
    
    
    //build toggle buttons
    this.toggleButtons = document.querySelector(".toggle-buttons");
    
    var blog_button = this.build.makeElement(this.toggleButtons,"Button","header-button","header-blog","blog");
    this.build.bindEventListener("header-blog","change_page","click");
    
    var advanced_button = this.build.makeElement(this.toggleButtons,"Button","header-button","header-advanced","search");
    this.build.bindEventListener("header-advanced","change_page","click");
    
    var random_button = this.build.makeElement(this.toggleButtons,"Button","header-button","sidebar-show_random","<span class='glyphicons glyphicons-rabbit icon random-icon'></span>");
    this.build.bindEventListener("sidebar-show_random","update_search","click");
     
    this.build.makeSearchBar(this.toggleButtons,"sidebar-search");
    
    
    
    
    var header_dropdown_options = [{display: "search",id:"clean_search"}, 
                                   {display: "browse",id:"browse",action:"update_browse"},
                                   {display: "blog",id:"blog"}
                                  ];
    
    var menu_button = this.build.buildMenu(this.header,"menu-button",header_dropdown_options,"menu-button","change_page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");
    this.menu_button = document.querySelector(".menu-button");
}

Header.prototype.toggleHeader = function(page){
    //console.log("toggling header!");
    var logo_style = this.logo.className;
    if(page != "clean_search"){
        this.header.className = "header header-center inline";
        this.logo.className = "logo-side";
        this.toggleButtons.className = "toggle-buttons-side inline";
        this.menu_button.className = "dropdown menu-button hidden";
        this.icon.shrinkIcon();
    } else {
        this.header.className = "header header-side inline";
        this.logo.className = "logo-center";
        this.toggleButtons.className = "toggle-buttons-full invisible";
        this.menu_button.className = "dropdown menu-button";
        this.icon.expandIcon();
    }
}
