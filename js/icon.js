function Icon(build){
    this.build = build;
    
    this.icon_container = document.querySelector(".icon-container");
    this.icons = [{id:"fennel_bulb",width:"5vw",height:"10vh"},
                  {id:"dragonfruit",width:"6vw",height:"10vh"},
                  {id:"megrim",width:"10vw",height:"10vh"},
                 ];
    this.active_icon = this.randomStartIcon();
    this.buildIcon(this.active_icon);
}

Icon.prototype.buildIcon = function(icon){
    
    var id = "icon-" + icon.id + "";
    var bwImg = this.build.makeImg(this.icon_container,"logos/"+icon.id+"-bw","","logo-item");
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
    
    this.build.bindEventListener(id,"show_full","click");
}

Icon.prototype.randomStartIcon = function(){
    var icon = this.icons[Math.floor(Math.random()*this.icons.length)];
    return icon;
}

Icon.prototype.expandIcon = function(){
    this.cImg.className = "logo-item fade-out";
    this.bwImg.className = "logo-item";
}

Icon.prototype.shrinkIcon = function(){
    this.cImg.className = "logo-item logo-item-side fade-out";
    this.bwImg.className = "logo-item logo-item-side";
}
