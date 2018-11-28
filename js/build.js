function Build(callback, isMobile){
    console.log("Build helper running!");
    this.callback = callback;
    this.language = "english";
    this.mobile = isMobile;
    console.log("Building for mobile:  " + isMobile);
}

Build.prototype.buildResult = function(container, result, style){
    var name = result['name'][this.language][0];
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
    var result_container = this.makeElement(container,"Div","result-item-"+ style + " block",result.id,"");
    var row1 = this.makeElement(result_container,"Div","block");
    var result_label = this.makeElement(row1,"h1","result-label-" + style,name + "-label",name);
    var row2 = this.makeElement(result_container,"Div","inline");
    var result_image = this.makeImg(row2,result.id,result.id,"result-image-"+ style);
    this.bindEventListener(result.id,"show_full","click");
    var column2 = this.makeElement(row2,"Div","block");
    var counter = 0;
        for(var names_subhead in result.name){
            if(names_subhead != "scientific"){
                var names = result['name'][names_subhead];
                for(var n = 0 ; n < names.length; n++){
                    var alt_name = this.capitalize(names[n]);
                    if(counter<3 && alt_name != name){
                        var name_label = this.makeElement(column2,"Div","list-item-" + style + " inline-flex","",alt_name);
                        counter++;
                    }
                }
            } 
    }
    var see_more = this.makeElement(column2,"Div","more"+style, result.id,"<span class='glyphicons glyphicons-more icon'></span>");
}

Build.prototype.expandBrowseResult = function(container,result,style,name){
    
}

Build.prototype.makeExpandedResult = function(container,result,style,name){
    var result_container = this.makeElement(container,"Div","result-item-"+ style,result.id,"");
    var result_image = this.makeImg(result_container,result.id,result.id,"result-image-"+ style);
    var result_label = this.makeElement(result_container,"h1","result-label-" + style,name + "-label",name);
    this.bindEventListener(result.id,"show_full","click");
    var row2 = this.makeElement(result_container,"Div","block");
    for(var names_subhead in result.name){
            if(names_subhead != "scientific"){
                var names = result['name'][names_subhead];
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
    this.bindEventListener("back-button","go_back","click");
    
    var result_container = this.makeElement(container,"Div","result-item-"+ style + " inline",result.id,"");
    var row1 = this.makeElement(result_container,"Div","full-image-row inline-block");
    var result_image = this.makeImg(row1,result.id,result.id,"result-image-"+ style);
    for(var i=0 ; i<4; i++){
        this.makeAd(row1,"ad-full",result.id);
    }
    
    var row2 = this.makeElement(result_container,"Div","block");
        var result_description_label = this.makeElement(row2,"Div","result-header-"+style + " inline-wrap","","Description:");
        this.makeMistakeReporter(result_description_label,"full",result.id);
        var result_description = this.makeElement(row2,"Div","result-description-text-"+style,"",result.description);    
    
        var result_class = this.makeElement(row2,"Div","result-header-" + style + " inline-wrap","","Class:");
        this.makeMistakeReporter(result_class,"full",result.id);
        this.appendList(row2,result['classification'],"list-item-" + style,"click","run_search");
    
        var names_head = this.makeElement(row2,"Div","result-header-"+ style,"","Names:");
        this.makeMistakeReporter(names_head,"full",result.id);
        for(var names_subhead in result.name){
            if(names_subhead == "scientific"){
                var sub = this.makeElement(row2,"Div","result-label-" + style,"","Scientific Name:");
                this.makeElement(sub,"Span","underline","",result.name.scientific);
            } else {
                var lang = this.capitalize(names_subhead);
                var lang_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",lang+":");
                this.appendList(lang_label,result['name'][names_subhead],"underline");
            }
        }
    
        var result_form = this.makeElement(row2,"Div","result-header-" + style,"","Forms:");
        this.makeMistakeReporter(result_form,"full",result.id);
        this.appendList(row2,result['form'],"list-item-" + style);
        
        var cuisines_head = this.makeElement(row2,"Div","result-header-"+ style,"","Cuisines:");
        for(var cuisine_subhead in result.cuisine){
            var cuisine = this.capitalize(cuisine_subhead);
            var cusine_label = this.makeElement(row2,"Div","result-label-" + style + " inline-flex","",cuisine+":");
            this.appendList(lang_label,result['cuisine'][cuisine_subhead],"list-item-" + style,"click","run_search");
        }
    
        if(result['similiar'].length){
            var result_similar = this.makeElement(row2,"Div","result-label-" + style + " inline-wrap","","Similar to:");
            this.appendList(result_similar,result['similiar'],"list-item-" + style,"click","show_full");
        }
        
        if(result['mistaken'].length){
            var result_mistaken = this.makeElement(row2,"Div","result-label-" + style,"","Mistaken for:");
            this.appendList(result_mistaken,result['mistaken'],"list-item-" + style,"click","show_full");
        }
        
    
    var ad_row = this.makeElement(row2,"Div","inline inline-ads");
    
    for(var i=0 ; i<4; i++){
        this.makeAd(ad_row,"ad-small",result.id);
    }
}

Build.prototype.makeMistakeReporter = function(container,style,target_item,target_data){
    var id = "mistake-"+target_item+"_"+target_data;
    var mistake_container = this.makeElement(container,"Div","dropdown mistake-container");
    var button = this.makeElement(mistake_container,"Div","mistake-reporter-"+style,id,"<span class='glyphicons glyphicons-question-sign mistake-reporter mistake-reporter-full'></span>");
    var content = this.makeElement(mistake_container,"Div","dropdown-content mistake-reporter-content",id,"See a mistake?");
    var report_button = this.makeElement(content,"Button","mistake-reporter-submit",id,"<span class='glyphicons glyphicons-circle-arrow-right mistake-reporter-submit'>");
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
    this.bindEventListener("search-input","update_text","input");
    
    var searchButton = this.makeElement(content,"Button","search-button","search","<span class='glyphicons glyphicons-question-sign seach-button icon'></span>");
    this.bindEventListener("search","run_search","click");
    
    return searchBar;
}

Build.prototype.buildMenu = function(container,name,option_array,style,action,display){
    var menu_container = this.makeElement(container,"Div","dropdown " + style);
    var menu_button = this.makeElement(menu_container,"Button",style + "-button",name,display);
    var menu_content = this.makeElement(menu_container,"Div","dropdown-content");
    for(var i=0;i<option_array.length;i++){
        var menu_item = option_array[i];
        //console.log(menu_item.id);
        var menu_el = this.makeElement(menu_content,"Button",style + "-item", menu_item.id, menu_item.display);
        var action_el = menu_item.action ? menu_item.action : action;
        this.bindEventListener(menu_item.id,action_el,"click");
    }
}

Build.prototype.appendList = function(container,array,style,event,action){
    //console.log(array);
    for(var i=0;i<array.length;i++){
        var item = array[i];
        var id = this.returnID(item);
        var name = this.returnName(item);
        //console.log(id);
        this.makeElement(container,"Span",style,id,name);
        if(event){
            this.bindEventListener(id,action,event);
        }
    }
}

Build.prototype.bindEventListener = function(el_id,action,event){
    //console.log(el_id);
    var el = document.querySelector("#"+el_id);
    //console.log(el);
    var id = this.getID(el_id); 
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
    name = this.capitalize(name);
    return name;
}

Build.prototype.getID = function(raw_id){
    var split = raw_id.split("-");
    if(split.length > 1){
        return split[1];
    } else {
        return split[0];
    }
}

Build.prototype.returnID = function(name){
    var id = name.replace(" ", "_");
    return id;
}

Build.prototype.setMobile = function(isMobile){
    this.mobile = isMobile;
}
