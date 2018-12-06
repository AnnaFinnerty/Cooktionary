function Menu(build,callback,container, options, style, action, name, display,selected){
    this.build = build;
    this.callback = callback;
    console.log(this.build);
    this.options = options;
    this.selected = selected;
    
    this.buildMenu(container,options,style,action,name,display);
}

Menu.prototype.buildMenu = function(container,option_array,style,action,name,display){
    console.log(display);
    var highlight = this.selected;
    var menu_container = this.build.makeElement(container,"Div","dropdown " + style);
    var menu_button = this.build.makeElement(menu_container,"Button",style + "-button","",display);
    var menu_content = this.build.makeElement(menu_container,"Div","dropdown-content");
    for(var i=0;i<option_array.length;i++){
        var menu_item = option_array[i];
        //console.log(menu_item.id);
        var addStyle = "";
        if(highlight){
            addStyle = highlight == menu_item ? "highlight" : "";
        }
        var menu_el = this.build.makeElement(menu_content,"Button",style + "-item", menu_item.id, menu_item.display);
        var action_el = menu_item.action ? menu_item.action : action;
        this.build.bindEventListener(menu_item.id,action_el,"click");
    }
    this.callback(name,this);
}

Menu.prototype.update = function(newSelected){
    this.selected = newSelected;
}

