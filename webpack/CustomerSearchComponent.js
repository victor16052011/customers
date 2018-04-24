/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
var reflectMetadata = require("reflect-metadata");
var ng = {
  core:   require("@angular/core"),
  http:   require("@angular/http"),
  router: require("@angular/router")
};
var AjaxFailureHandler = require("./AjaxFailureHandler");

var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  template: require("./CustomerSearchComponent.html"),
  providers: [
    AjaxFailureHandler
  ]
}).Class({

  // rest of class as previously defined...

  constructor: [
    ng.http.Http,
    ng.router.Router,
    AjaxFailureHandler,
    function(http,router,ajaxFailureHandler) {
      this.customers = null;
      this.http      = http;
      this.router    = router;
      this.keywords  = "";
      this.ajaxFailureHandler = ajaxFailureHandler;
    }
  ],

  // rest of the component...

  viewDetails: function(customer) {
    this.router.navigate(["/", customer.id]);
  },
  search: function($event) {
    var self = this;
    self.keywords = $event;
    if (self.keywords.length < 3) {
      return;
    }
    self.http.get(
      "/customers.json?keywords=" + self.keywords
    ).subscribe(
      function(response) {
        self.customers = response.json().customers;
      },
      self.ajaxFailureHandler.handler()
    );
  }
});

module.exports = CustomerSearchComponent;
