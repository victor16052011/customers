var reflectMetadata = require("reflect-metadata");
var ng = {
  core: require("@angular/core")
};

var AddressComponent = ng.core.Component({
  selector: "shine-address",
  template: require("./AddressComponent.html"),
  inputs: [
    "type",
    "address",
    "icon"
  ],
  outputs: [
    "addressChanged"
  ]
}).Class({
  constructor: [
    function() {
      this.type    = null;
      this.address = null;
      this.icon = "envelope";
      this.addressChanged = new ng.core.EventEmitter();
    }
  ],
  save: function(update) {
    this.addressChanged.emit(update);
  }
});

module.exports = AddressComponent;
