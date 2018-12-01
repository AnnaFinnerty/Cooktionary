function Header(build){
    this.build = build;
    this.awake();
}

Header.prototype.awake = function(){
    // Build the header
    var header = document.querySelector(".header");
    this.logo = document.querySelector("#logo-clean_search");
    this.build.bindEventListener("logo-clean_search","change_page","click");
    
    this.toggleButtons = document.querySelector(".toggle-buttons");
    
    this.build.makeSearchBar(this.toggleButtons,"sidebar-search");
    var random_button = this.build.makeElement(this.toggleButtons,"Button","sidebar-random-button","sidebar-show_random","<span class='glyphicons glyphicons-rabbit icon random-icon'></span>");
    this.build.bindEventListener("sidebar-show_random","update_search","click");
    
    this.icon = new Icon(this.build);
    
    //this.build.makeElement(this.toggleButtons,"Button","sidebar-button","sidebar-search_advanced","ADVANCED");
    //this.build.bindEventListener("sidebar-search_advanced","update_search","click");
    
    
    /*
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

    this.bwImg = bwImg;
    this.cImg = cImg;
    */
        
    
    
    var header_dropdown_options = [{display: "search",id:"clean_search"}, 
                                   {display: "browse",id:"browse",action:"update_browse"},
                                   {display: "blog",id:"blog"}
                                  ];
    var container = document.querySelector(".header");
    this.build.buildMenu(container,"menu-button",header_dropdown_options,"menu-button","change_page","<span class='glyphicons glyphicons-menu-hamburger icon'></span>");

}

Header.prototype.toggleHeader = function(page){
    //console.log("toggling header!");
    var logo_style = this.logo.className;
    if(page != "clean_search"){
        this.logo.className = "logo-side";
        this.toggleButtons.className = "toggle-buttons-side inline";
        this.icon.shrinkIcon();
    } else {
        this.logo.className = "logo-center";
        this.toggleButtons.className = "toggle-buttons-full invisible";
        this.icon.expandIcon();
    }
}
