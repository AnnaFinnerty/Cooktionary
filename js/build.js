function Build(callback, isMobile){
    console.log("Build helper running!");
    this.callback = callback;
    this.language = "english";
    this.mobile = isMobile;
    console.log("Building for mobile:  " + isMobile);
}


Build.prototype.buildResult = function(container, result, style){
    var name = result['names'][this.language][0];
        name = this.capitalize(name);
    console.log(style);
    switch(style){
        case "expanded":
            this.makeExpandedResult(container,result,style,name);
            break;
            
        case "full":
            this.makeFullResult(container,result,style,name);
            break;
            
        case "browse":
            this.makeBrowseResult(container,result,style,name);
            break;
            
        case "browse-expanded":
            this.expandBrowseResult(container,result,style,name);
            break;
            
        case "default":
            this.makeFullResult(container,result,style,name);
            break;
    }
}

Build.prototype.makeBrowseResult = function(container,result,style,name){
    var result_container = this.makeElement(container,"Div","result-item-"+ style,result.id,"");
    var result_image = this.makeImg(result_container,result.id,result.id,"result-image-"+ style);
    var result_label = this.makeElement(result_container,"h1","result-label-" + style,name + "-label",name);
    this.bindEventListener(result.id,"show-full","click");
    var row2 = this.makeElement(result_container,"Div","block");
        for(var names_subhead in result.names){
            if(names_subhead != "scientific"){
                var names = result['names'][names_subhead];
                for(var n = 0 ; n < names.length; n++){
                    var name = this.capitalize(names[n]);
                    var name_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",name);
                }
            } 
    }
    var see_more = this.makeElement(result_container,"Div","more"+style, result.id,"<span class='glyphicons glyphicons-more icon'></span>");
}

Build.prototype.expandBrowseResult = function(container,result,style,name){
    
}

Build.prototype.makeExpandedResult = function(container,result,style,name){
    var result_container = this.makeElement(container,"Div","result-item-"+ style,result.id,"");
    var result_image = this.makeImg(result_container,result.id,result.id,"result-image-"+ style);
    var result_label = this.makeElement(result_container,"h1","result-label-" + style,name + "-label",name);
    this.bindEventListener(result.id,"show-full","click");
    var row2 = this.makeElement(result_container,"Div","block");
    for(var names_subhead in result.names){
            if(names_subhead != "scientific"){
                var names = result['names'][names_subhead];
                for(var n = 0 ; n < names.length; n++){
                    var name = this.capitalize(names[n]);
                    var name_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",name);
                }
            } 
        }
    var row3 = this.makeElement(result_container,"Div","block");
    this.makeAd(row3,"ad-"+style,)
    var see_more = this.makeElement(row3,"Div","more"+style, result.id,"<span class='glyphicons glyphicons-more icon'></span>");
}

Build.prototype.makeFullResult = function(container,result,style,name){
    var header = this.makeElement(container,"Div","inline","");
    var result_label = this.makeElement(header,"h1","result-header-" + style,name + "-header",name);
    this.makeElement(header,"Button","back-button","back-button","<span class='glyphicons glyphicons-remove-circle icon'></span>")
    this.bindEventListener("back-button","go-back","click");
    
    var result_container = this.makeElement(container,"Div","result-item-"+ style + " inline",result.id,"");
    var row1 = this.makeElement(result_container,"Div","full-image-row inline-block");
    var result_image = this.makeImg(row1,result.id,result.id,"result-image-"+ style);
    //MTC make ads
    
    var row2 = this.makeElement(result_container,"Div","block");
    
        var names_head = this.makeElement(row2,"Div","result-header-"+ style,"","Names:");
        for(var names_subhead in result.names){
            if(names_subhead == "scientific"){
                var sub = this.makeElement(row2,"Div","result-label-" + style,"","Scientific Name:");
                this.makeElement(sub,"Span","result-sci-name-" + style,"",result.names.scientific);
            } else {
                var lang = this.capitalize(names_subhead);
                var lang_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",lang+":");
                this.appendList(lang_label,result['names'][names_subhead],"list-item-" + style);
            }
        }
        var result_form = this.makeElement(row2,"Div","result-label-" + style,"","Forms:");
        this.appendList(result_form,result['forms'],"list-item-" + style);
        var cuisines_head = this.makeElement(row2,"Div","result-header-"+ style,"","Cuisines:");
        for(var cuisine_subhead in result.cuisines){
            var cuisine = this.capitalize(cuisine_subhead);
            var cusine_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",cuisine+":");
            this.appendList(lang_label,result['cuisines'][cuisine_subhead],"list-item-" + style,"click","run-search");
        }
        var result_similar = this.makeElement(row2,"Div","result-label-" + style,"","Similar to:");
        this.appendList(result_similar,result['similiar'],"list-item-" + style,"click","show-full");
        var result_mistaken = this.makeElement(row2,"Div","result-label-" + style,"","Mistaken for:");
        this.appendList(result_similar,result['mistaken'],"list-item-" + style,"click","show-full");
}

Build.prototype.makeAd = function(container,style,targetProduct){
   var ad = this.makeElement(container,"Div","ad " + style,targetProduct);
   this.callback("register",ad);
}

Build.prototype.makeElement = function(container,type,style, id, text){
    var el = document.createElement(type);
        el.className = this.mobile ? style + " " + style+"-mobile": style;
        el.id = id ? id : "";
        el.innerHTML = text ? text : "";
    container.appendChild(el);
    return el;
}

Build.prototype.makeImg = function(container,img_src,id,style,text){
    var img = document.createElement("Div");
        img.style.backgroundImage = "url('img/"+img_src+".jpeg')"
        img.className = style;
        img.id = id ? id : "";
        img.innerHTML = text ? text : "";
    container.appendChild(img);
    return img;
}

Build.prototype.makeSearchBar = function(container,style){
    var content = this.makeElement(container,"Div","inline");
    
    var searchBar = this.makeElement(content,"Input","search-bar " + style,"search-input");
    this.bindEventListener("search-input","update-text","input");
    
    var searchButton = this.makeElement(content,"Button","search-button","search","<span class='glyphicons glyphicons-question-sign seach-button icon'></span>");
    this.bindEventListener("search","run-search","click");
    
    return searchBar;
}

Build.prototype.buildMenu = function(container,name,option_array,style,action,display){
    var menu_container = this.makeElement(container,"Div","dropdown " + style);
    var menu_button = this.makeElement(menu_container,"Button",style + "-button",name,display);
    var menu_content = this.makeElement(menu_container,"Div","dropdown-content");
    for(var i=0;i<option_array.length;i++){
        var menu_item = option_array[i];
        var menu_el = this.makeElement(menu_content,"Button",style + "-item", menu_item.id, menu_item.display);
        this.bindEventListener(menu_item.id,action,"click");
    }
}

Build.prototype.appendList = function(container,array,style,event,action){
    for(var i=0;i<array.length;i++){
        var item = array[i];
        var id = this.returnID(item);
        //console.log(id);
        this.makeElement(container,"Span",style,id,item);
        if(event){
            this.bindEventListener(id,action,event);
        }
    }
}

Build.prototype.getID = function(raw_id){
    var split = raw_id.split(":");
    if(split.length > 1){
        return split[1];
    } else {
        return split[0];
    }
}

Build.prototype.bindEventListener = function(el_id,action,event){
    //console.log(el_id);
    var id = this.getID(el_id);
    var el = document.querySelector("#"+el_id);
    var self = this;
    el.addEventListener(event,function(e){
        //console.log("click!");
        if(el_id === "search-input"){
            self.callback(action,el.value);
        } else {
            self.callback(action,id);
        }
    })
}

Build.prototype.clearContainer = function(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

Build.prototype.capitalize = function(string){
   return string.charAt(0).toUpperCase() + string.slice(1);
}

Build.prototype.returnName = function(id){
    var name = id.replace("_", " ");
    return name;
}

Build.prototype.returnID = function(name){
    var id = name.replace(" ", "_");
    return id;
}

Build.prototype.setMobile = function(isMobile){
    this.mobile = isMobile;
}

/*
Build.prototype.buildResultOld = function(container,result,style){
    console.log(result);
    var name = result['names'][this.language][0];
        name = this.capitalize(name);
    var result_container;
    if(this.style != "browse-expanded"){
        result_container = this.makeElement(container,"Div","result-item-"+ style,result.id,"");
    } else {
        result_container = container;
    }
    
    //this should be adjust by type -- click should not occur in full.
    
    if(style === "browse" || style == "expanded"){
        var result_image = this.makeImg(result_container,result.id,result.id,"result-image-"+ style);
        var result_label = this.makeElement(result_container,"h1","result-label-" + style,name + "-label",name);
        this.bindEventListener(result.id,"show-full","click");
    } else {
        var result_label = this.makeElement(result_container,"h1","result-label-" + style,name + "-label",name);
        var result_image = this.makeImg(result_container,result.id,result.id,"result-image-"+ style);
    }
    if(style == "expanded"){
        var row2 = this.makeElement(result_container,"Div","block");
        for(var names_subhead in result.names){
            if(names_subhead != "scientific"){
                var names = result['names'][names_subhead];
                for(var n = 0 ; n < names.length; n++){
                    var name = this.capitalize(names[n]);
                    var name_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",name);
                }
            } 
        }
    }
    
    //probably shortend by negatating
    if(style === "full"|| style == "browse-expanded"){
        var row2 = this.makeElement(result_container,"Div","block");
        var names_head = this.makeElement(row2,"Div","result-header-"+ style,"","Names:");
        for(var names_subhead in result.names){
            if(names_subhead == "scientific"){
                var sub = this.makeElement(row2,"Div","result-label-" + style,"","Scientific Name:");
                this.makeElement(sub,"Span","result-sci-name-" + style,"",result.names.scientific);
            } else {
                var lang = this.capitalize(names_subhead);
                var lang_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",lang+":");
                this.appendList(lang_label,result['names'][names_subhead],"list-item-" + style);
            }
        }
        var result_form = this.makeElement(row2,"Div","result-label-" + style,"","Forms:");
        this.appendList(result_form,result['forms'],"list-item-" + style);
        var cuisines_head = this.makeElement(row2,"Div","result-header-"+ style,"","Cuisines:");
        for(var cuisine_subhead in result.cuisines){
            var cuisine = this.capitalize(cuisine_subhead);
            var cusine_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",cuisine+":");
            this.appendList(lang_label,result['cuisines'][cuisine_subhead],"list-item-" + style);
        }
        var result_similar = this.makeElement(row2,"Div","result-label-" + style,"","Similar to:");
        this.appendList(result_similar,result['similiar'],"list-item-" + style);
        var result_mistaken = this.makeElement(row2,"Div","result-label-" + style,"","Mistaken for:");
        this.appendList(result_similar,result['mistaken'],"list-item-" + style);
    }
    if(style != "full"){
        var see_more = this.makeElement(result_container,"Div","more"+style, result.id,"<span class='glyphicons glyphicons-more'></span>");
    }
    
}
*/