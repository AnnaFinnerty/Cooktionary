function Header(build,isMobile){
    this.build = build;
    this.isMobile = isMobile;
    
    this.header_dropdown_options = [{display: "search",id:"clean_search"}, 
                                       {display: "browse",id:"browse",action:"update_browse"},
                                       {display: "blog",id:"blog"}
                                      ];
    
    this.buildHeader();
}

Header.prototype.buildHeader = function(){
    
    this.header = document.querySelector(".header");
    //this.menu_button = document.querySelector(".menu-button");
    //this.logo = document.querySelector("#logo-clean_search");
    
    if(this.isMobile){
        this.buildForMobile();
    } else {
        
        var logo = this.build.makeElement(this.header,"Div","logo-center inline","logo-clean_search","Cooktionary");
        this.logo = logo;
        this.build.bindEventListener("logo-clean_search","change_page","click");
        
        var icon_container = this.build.makeElement(this.header,"Div","icon-container");
        this.icon_container = icon_container;
        this.icon = new Icon(this.build);


        //build toggle buttons
        var toggle_buttons = this.build.makeElement(this.header,"Div","toggle-buttons");
        this.toggleButtons = toggle_buttons;

            var blog_button = this.build.makeElement(this.toggleButtons,"Button","header-button","header-blog","blog");
            this.build.bindEventListener("header-blog","change_page","click");

            var advanced_button = this.build.makeElement(this.toggleButtons,"Button","header-button","header-advanced","search");
            this.build.bindEventListener("header-advanced","change_page","click");

            var random_button = this.build.makeElement(this.toggleButtons,"Button","header-button","header-show_random","<span class='glyphicons glyphicons-rabbit icon random-icon'></span>");
            this.build.bindEventListener("header-show_random","update_search","click");

            var menu_button = this.build.buildMenu(this.header,"menu-button",this.header_dropdown_options,"menu-button","change_page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");
            this.menu_button = document.querySelector(".menu-button");

            this.build.makeSearchBar(this.toggleButtons,"sidebar-search");

    }
    
}

Header.prototype.buildForMobile = function(){
        this.header.className = "header-mobile block";
    
        var row1 = this.build.makeElement(this.header,"Div","inline-flex");
    
        var logo = this.build.makeElement(row1,"Div","logo-mobile","logo-clean_search","Cooktionary");
        this.logo = logo;
        this.build.bindEventListener("logo-clean_search","change_page","click");
    
        var icon_container = this.build.makeElement(row1,"Div","icon-container");
        this.icon_container = icon_container;
        this.icon = new Icon(this.build);
        
        var row2 = this.build.makeElement(this.header,"Div","inline-flex");
    
        var blog_button = this.build.makeElement(row2,"Button","header-button","header-blog","blog");
        this.build.bindEventListener("header-blog","change_page","click");
    
        var browse_button = this.build.makeElement(row2,"Button","header-button","header-name","browse");
        this.build.bindEventListener("header-name","update_browse","click");
        
        var random_button = this.build.makeElement(row2,"Button","header-button","header-show_random","<span class='glyphicons glyphicons-rabbit icon random-icon'></span>");
        this.build.bindEventListener("header-show_random","update_search","click");
        
        this.build.makeSearchBar(row2,"sidebar-search");
    
        var menu_button = this.build.buildMenu(row2,"menu-button",this.header_dropdown_options,"menu-button","change_page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");
    
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
