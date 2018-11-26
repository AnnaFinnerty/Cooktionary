function SearchManager(){
    console.log("Search Manager running!");
    this.searchBy = "search_by_name";
    this.searchText = "";
    this.searchByOptions = [{display: "search by name",id:"search_by_name"}, 
                            {display: "search by cuisine",id:"search_by_cuisine"},
                            {display: "advanced search",id:"search_advanced"},
                            {display: "random ingredient",id:"show_random"}
                           ];
    this.browseCategories = ["name","language","cuisine","form"];
    this.collections = [{display:"Chinese dishes",tag: "chinese","field":"cuisine"},
                         {display:"Spices",tag: "spice","field":"form"},
                       ];
    this.browsingBy = "name";
    this.browsePosition = 0;
    this.searchCriteria = {
        form: [],
        language: [],
        cuisine: [],
        mistaken: [],
        similiar: [],
    }
    this.data = fakeData;
    this.blog = fakeBlog;
    console.log(fakeData);
    this.awake();
}

SearchManager.prototype.awake = function(){
    //most of this can probably be done by the database
    var data = this.data;
    var searchData = {};
    for(var category in this.searchCriteria){
        if(!searchData[category]){
            searchData[category] = [];
        }
        for(var i in this.data){
            
        }
    }
}

SearchManager.prototype.showRandom = function(){
    var data = this.data;
    var keys = Object.keys(data);
    console.log(keys);
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
        console.log(langs);
        for(var r in langs){
            var obj = {};
            obj[r] = langs[r];
            results.push(obj);
        } 
    } else if (category === "cuisine"){
        var cuisines = {};
        for(var i in this.data){
            for(var c in this.data[i]['cuisine']){
                console.log(c);
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

SearchManager.prototype.search = function(){
    //console.log("Searching!");
    var results = this.fakeSearch(this.searchText);
    return results;
}

SearchManager.prototype.fakeSearch = function(searchTerm){
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

SearchManager.prototype.updateSearchText = function(searchText){
    this.searchText = searchText;
    console.log(this.searchText);
}

SearchManager.prototype.updateSearchParameters = function(searchParameters){
    console.log(searchParameters);
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
