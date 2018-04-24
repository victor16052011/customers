var ng = {
  core: require("@angular/core")
};
var NameCasePipe = ng.core.Pipe({
  name: "nameCase"
}).Class({
  constructor:function() {},

  transform: function(value) {
    if (!value) { return value; }
    if ((value.toLowerCase() === value) ||
      (value.toUpperCase() === value)) {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    else {
      return value;
    }
  }
});

module.exports = NameCasePipe;
