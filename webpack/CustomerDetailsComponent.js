/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
var reflectMetadata = require("reflect-metadata");
var rxjsMap = require("rxjs/add/operator/map");
var ng = {
  core:   require("@angular/core"),
  http:   require("@angular/http"),
  router: require("@angular/router")
};
var AjaxFailureHandler = require("./AjaxFailureHandler");

var CustomerDetailsComponent = ng.core.Component({
  selector: "shine-customer-details",
  template: require("./CustomerDetailsComponent.html"),
  providers: [
    AjaxFailureHandler
  ]
}).Class({
  constructor: [
    ng.router.ActivatedRoute,
    ng.http.Http,
    AjaxFailureHandler,
    function(activatedRoute,http,ajaxFailureHandler) {
      this.activatedRoute = activatedRoute;
      this.http = http;
      this.customer = null;
      this.ajaxFailureHandler = ajaxFailureHandler;
    }
  ],
  ngOnInit: function() {
    var self = this;

    // more to come...

    var parseCustomer = function(response) {
      var customer = response.json().customer;
      customer.billing_address = {
        street: customer.billing_street,
        city: customer.billing_city,
        state: customer.billing_state,
        zipcode: customer.billing_zipcode,
      };
      customer.shipping_address = {
        street: customer.shipping_street,
        city: customer.shipping_city,
        state: customer.shipping_state,
        zipcode: customer.shipping_zipcode
      };
      return customer;
    }

    var routeSuccess = function(params) {
      var observable = self.http.get(
        "/customers/" + params['id'] + ".json"
      );

      var mappedObservable = observable.map(parseCustomer);

      mappedObservable.subscribe(
        function(customer) { self.customer = customer; },
        self.ajaxFailureHandler.handler()
      );
    }

    self.activatedRoute.params.subscribe(
      routeSuccess,
      self.ajaxFailureHandler.handler());
  },
  saveCustomer: function(update) {
    this.saveCustomerField(update.field_name, update.value);
  },
  saveShippingAddress: function(update) {
    this.saveCustomerField("shipping_" + update.field_name,
                           update.value);
  },
  saveBillingAddress: function(update) {
    this.saveCustomerField("billing_" + update.field_name,
                           update.value);
  },
  saveCustomerField: function(field_name, value) {
    var update = {};

    update[field_name] = value;

    this.http.patch(
      "/customers/" + this.customer.customer_id + ".json",
      update
    ).subscribe(
      function() {},
      this.ajaxFailureHandler.handler()
    );
  }
});

module.exports = CustomerDetailsComponent;
