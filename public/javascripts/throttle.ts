(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
})();

// var throttleWait;

// const throttle = (callback, time) => {
//   // if the variable is true, don't run the function
//   if (throttleWait) return;

//   // set the wait variable to true to pause the function
//   throttleWait = true;

//   // use setTimeout to run the function within the specified time
//   setTimeout(() => {
//     callback();

//     // set throttleWait to false once the timer is up to restart the throttle function
//     throttleWait = false;
//   }, time);
// }