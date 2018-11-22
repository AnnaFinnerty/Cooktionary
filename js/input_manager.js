function InputManager(){
    this.events = {};
    
    if (window.navigator.msPointerEnabled) {
    //Internet Explorer 10 style
    this.eventTouchstart    = "MSPointerDown";
    this.eventTouchmove     = "MSPointerMove";
    this.eventTouchend      = "MSPointerUp";
  } else {
    this.eventTouchstart    = "touchstart";
    this.eventTouchmove     = "touchmove";
    this.eventTouchend      = "touchend";
  }
    
    this.listen();
}

InputManager.prototype.listen = function(){
    
    var self = this; 
    
    console.log("Listening");
    var map = {
    13: "enter",    
  };
    
    //respond to button presses
    
    
    // Respond to direction keys
    document.addEventListener("keydown", function (event) {
        var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                        event.shiftKey;
        var mapped    = map[event.which];

          if (mapped !== undefined) {
              event.preventDefault();
              switch(mapped){
                  case "enter":
                      self.emit("enter", mapped);
                  break;
                      
                      
                  default:
                      
                      break
              }
          }
        
    });
}

InputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

InputManager.prototype.emit = function (event, data) {
  console.log("action logged:  " + event + ", " + data);
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

InputManager.prototype.bindButtonPress = function(selector,fn){
    var button = document.querySelector(selector);
    button.addEventListener("click",fn.bind(this));
}