function repeat(operation, num) {
      // Modify this so it doesn't cause a stack overflow!
      if (num <= 0) return;
      operation();
      return () => repeat(operation, --num);
    }
    
    function trampoline(fn) {
        while(fn){
            fn = fn();
        }
    }
    
    module.exports = function(operation, num) {
      trampoline(() => repeat(operation,num));
    }
