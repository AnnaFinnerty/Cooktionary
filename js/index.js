window.requestAnimationFrame(function () {
  console.log("Page loaded");
  new App(Actuator,Build,InputManager,SearchManager,StorageManager,AdManager); 
});