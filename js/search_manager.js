function SearchManager(updateAcuatorCallback){
    //console.log("Search Manager running!");
    this.updateActuatorCallback = updateAcuatorCallback;
    
    this.searchBy = "search_by_name";
    this.searchText = "";
    this.searchByOptions = [{display: "search by name",id:"search_by_name"}, 
                            {display: "search by cuisine",id:"search_by_cuisine"},
                            {display: "advanced search",id:"search_advanced",action:"change_page"},
                            {display: "random ingredient",id:"show_random",action:"show_random"}
                           ];
    this.browseCategories = ["name","language","cuisine","form"];
    this.collections = [{display:"Chinese",tag: "chinese","field":"cuisine"},
                        {display:"Spices",tag: "spice","field":"classification"},
                        {display:"Vegetables",tag: "vegetable","field":"classification"},
                       ];
    this.browsingBy = "name";
    this.browsePosition = 0;
    this.searchCriteria = {
        text: "",
        form: [],
        language: [],
        cuisine: [],
        mistaken: [],
        similiar: [],
    }
    this.data = fakeData;
    this.blog = fakeBlog;
    
    this.awake();
}

//can be deleted in it's entirety once db is working
SearchManager.prototype.awake = function(){
    //most of this can probably be done by the database
    var data = this.data;
    var searchData = {};
    for(var category in this.searchCriteria){
        if(category != "name"){
            if(!searchData[category]){
                searchData[category] = [];
            }
            for(var i in data){
                if(data[i][category]){
                    if(category == "cuisine"){
                        for(var c in data[i][category]){
                            var test = searchData[category].indexOf(c);
                            if(test == -1){
                                searchData[category].push(c);
                            }
                        }
                    } else {
                       for(var x = 0; x < data[i][category].length;x++){
                            var item = data[i][category][x];
                            var test = searchData[category].indexOf(item);
                            if(test == -1){
                                searchData[category].push(item);
                            }
                        } 
                    }
                }
            }
        }
    }
    //console.log(searchData);
    this.searchData = searchData;
}

SearchManager.prototype.showRandom = function(){
    var data = this.data;
    var keys = Object.keys(data);
    var r = Math.floor(Math.random()*keys.length);
    return this.data[keys[r]];
}

SearchManager.prototype.browse = function(){
    var results = this.fakeBrowse(this.browsingBy);
    return results;
}

SearchManager.prototype.fakeBrowse = function(category){
    var data = this.data;
    var results = [];
    var counter = 20 * this.browsePosition;
    if(category === "language"){
        var langs = {};
        for(var i in this.data){
            for(var l in this.data[i]['name']){
            if(l != "scientific"){
                if(!langs[l]){
                    langs[l] = [];
                }
                    langs[l].push(data[i]);
                }
            }
        }
        //console.log(langs);
        for(var r in langs){
            var obj = {};
            obj[r] = langs[r];
            results.push(obj);
        } 
    } else if (category === "cuisine"){
        var cuisines = {};
        for(var i in this.data){
            for(var c in this.data[i]['cuisine']){
                //console.log(c);
                if(!cuisines[c]){
                    cuisines[c] = [];
                }
                cuisines[c].push(data[i]);
            }
        }
        for(var r in cuisines){
            var obj = {};
            obj[r] = cuisines[r];
            results.push(obj);
        } 
    } else {
        for(var i in data){
            results.push(data[i]);
        } 
    }
    console.log(results);
    return results;
}

SearchManager.prototype.newFakeBrowse = function(category){
    var data = this.data;
    var results = [];
}

SearchManager.prototype.updateBrowseSettings = function(newCategory){
    this.browsingBy = newCategory;
}

SearchManager.prototype.search = function(type,data){
    console.log("Searching!");
    console.log(type);
    console.log(data);
    var results;
    if(type){
        if(type == "text"){
           results = this.fakeTextSearch(this.searchText); 
        } else {
            results = this.fakeQuickSearch(type,data);
        }        
    } else {
        result = this.fakeAdvancedSearch();
    } 
    return results;
}

SearchManager.prototype.fakeTextSearch = function(searchTerm){
    //console.log("FakeSearch!");
    //console.log(searchTerm);
    var data = this.data;
    var results = [];
    for(var ingredient in data){
        //console.log(this.test(searchTerm,ingredient))
        var test = this.test(searchTerm,ingredient);
        if(test){
            results.push(data[ingredient]);
            var mistakens = data[ingredient]['mistaken'];
            for(var i = 0; i< mistakens.length;i++){
                var mistake = mistakens[i];
                var test2 = this.test(searchTerm,mistake);
                if(test2){
                    results.push(data[mistake])
                }
            }
        }
    }
    //console.log(results);
    if(results.length){
        return results;
    } else {
        var failSafe = this.failSafeFakeSearch(searchTerm);
        return failSafe;
    }
    
}

SearchManager.prototype.fakeQuickSearch = function(field,request){
    //console.log("quick search!");
    var data = this.data;
    var results = [];
    for(var x in data){
        //console.log(x);
        //console.log(data[x][field]);
        var active_field = data[x][field];
        if(field == "cuisine"){
            for(var cuisine in active_field){
                console.log(cuisine);
                var test = cuisine.indexOf(request);
                if(test != -1){
                    results.push(data[x]);
                } 
            }
        } else {
            for(var y = 0; y < active_field.length;y++){
                var item = active_field[y];
                var test = item.indexOf(request);
                if(test != -1){
                    results.push(data[x]);
                }
            }   
        }  
    }
    return results
}

SearchManager.prototype.fakeAdvancedSearch = function(){
    
}

SearchManager.prototype.failSafeFakeSearch = function(searchTerm){
    var data = this.data;
    var results_initial = [];
    for(var ingredient in data){
        //console.log(this.test(searchTerm,ingredient))
        var test = this.test(searchTerm,ingredient);
        if(test){
            results_initial.push(data[ingredient]);
        }
    }
    //needs to sort array before returning it, so most char matchs are returned
    return results_initial;
}

SearchManager.prototype.sanitizeText = function(){
    var text = this.searchText;
    //STRIP TEXT + ADD SECURITY MEASURES HERE
    
    return text;
}

SearchManager.prototype.updateSearchText = function(searchText){
    this.searchText = searchText;
    this.searchCriteria.text = searchText;
    console.log(this.searchCriteria.text);
}

SearchManager.prototype.updateTextSearchCategory = function(category){
    console.log("Updating text search category!");
    this.searchBy = category;
}

SearchManager.prototype.updateSearchCriteria = function(critera,newData){
    console.log("Updating search criteria!");
    console.log(critera);
    console.log(newData);
    this.searchCriteria[critera].push(newData);
    console.log(this.searchCriteria);
    this.updateActuatorCallback();
}

SearchManager.prototype.test = function(word1,word2){
    //console.log(word1,word2);
    if(word2.indexOf(word1) != -1){
        return true;
    }
    var test = 0;
    for(var i = 0; i<word1.length;i++){
        if(word1[i] == word2[i]){
            //console.log(word1[i],word2[i]);
            test++;
        }
    }
    var test_floor = Math.floor(word1.length * .75);
    if(test > test_floor){
        return true;
    } else {
        return false;
    }
}

SearchManager.prototype.failSafeTest = function(word1,word2){
    //console.log(word1,word2);
    var test = 0;
    for(var i = 0; i<word1.length;i++){
        if(word1.indexOf(word2[i]) != -1){
            test++;
        }
    }
    return test;
}

SearchManager.prototype.findSingleRecord = function(id){
    return fakeData[id];
}
