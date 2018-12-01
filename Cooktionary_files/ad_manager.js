function AdManager(){
    console.log("Ad Manager running!");
    this.active_ads = [];
}

AdManager.prototype.registerAd = function(newAd){
    //console.log("Ad registered");
    //console.log(newAd);
    //console.log(this);
    this.fillAd(newAd);
    this.active_ads.push(newAd);
    //console.log(this.active_ads);
}

AdManager.prototype.fillAd = function(newAd){
    //ad will be filled with content here
}

AdManager.prototype.clearAds = function(){
    this.active_ads = [];
}