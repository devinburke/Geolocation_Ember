"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('geolocation-ember-web-app/app', ['exports', 'ember', 'geolocation-ember-web-app/resolver', 'ember-load-initializers', 'geolocation-ember-web-app/config/environment'], function (exports, _ember, _geolocationEmberWebAppResolver, _emberLoadInitializers, _geolocationEmberWebAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _geolocationEmberWebAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _geolocationEmberWebAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _geolocationEmberWebAppResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _geolocationEmberWebAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('geolocation-ember-web-app/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'geolocation-ember-web-app/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _geolocationEmberWebAppConfigEnvironment) {

  var name = _geolocationEmberWebAppConfigEnvironment['default'].APP.name;
  var version = _geolocationEmberWebAppConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('geolocation-ember-web-app/components/current-location', ['exports', 'ember', 'geolocation-ember-web-app/utils/ajaxHelper'], function (exports, _ember, _geolocationEmberWebAppUtilsAjaxHelper) {
    exports['default'] = _ember['default'].Component.extend({
        locationObject: null,
        locationFound: false,
        showErrorMessage: false,
        wrongFormat: false,
        distanceObjects: [],
        errorMessage: "There was an error finding your location, please try again later",

        init: function init() {
            this._super.apply(this, arguments);
            var self = this;
            if (localStorage.getItem("currentLocation")) {
                this.set("locationFound", true);
                this.set("locationObject", JSON.parse(localStorage.currentLocation));
            } else {
                _geolocationEmberWebAppUtilsAjaxHelper['default'].getCurrentLocation(function (response) {
                    "statusText" in response ? self.set("locationFound", false) : self.set("locationFound", true);
                    self.get("locationFound") ? null : self.set("showErrorMessage", true);
                    self.get("locationFound") ? self.set("locationObject", response) : false;
                    if (self.get("locationFound")) {
                        localStorage.currentLocation = JSON.stringify(self.get("locationObject"));
                        console.log(localStorage.currentLocation);
                    }
                });
            }
            if (localStorage.getItem("distanceObjects")) {
                this.set("distanceObjects", JSON.parse(localStorage.distanceObjects));
            }
        },

        actions: {
            findNewDistance: function findNewDistance() {
                if (this.get("longLat")) {
                    var longLatPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
                    if (longLatPattern.test(this.get('longLat'))) {
                        this.set("wrongFormat", false);
                        this.getNewDistance();
                    } else {
                        this.set("wrongFormat", true);
                        this.set("inputError", "Invalid Longitude/Latitude");
                    }
                } else {
                    this.set("wrongFormat", true);
                    this.set("inputError", "Please fill in a Longitude and Latitude");
                }
            },

            removeDistance: function removeDistance(id) {
                var arrayId = $("#list-" + id).index();
                this.get("distanceObjects").removeAt(arrayId);
            }
        },

        latLongChanged: _ember['default'].observer('longLat', function () {
            this.set('longLat', this.get('longLat').replace(/[^0-9,+-\s.]/g, ""));
        }),

        toRadians: function toRadians(x) {
            //Decided not to extend Number prototype i.e Number.prototype.toRadians
            return x * Math.PI / 180;
        },

        getNewDistance: function getNewDistance() {
            //Formula Derived from http://www.movable-type.co.uk/scripts/latlong.html
            var splitLongLat = this.get('longLat').split(",");
            var latitudeCurrent = this.get('locationObject').lat;
            var longitudeCurrent = this.get('locationObject').lon;
            var latitudeProjected = splitLongLat[0].trim();
            var longitudeProjected = splitLongLat[1].trim();

            var earthRadius = 6371; // km
            var latitudeDifference = latitudeProjected - latitudeCurrent;
            var latitudeDistance = this.toRadians(latitudeDifference);
            var longitudeDifference = longitudeProjected - longitudeCurrent;
            var longitudeDistance = this.toRadians(longitudeDifference);
            var a = Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) + Math.cos(this.toRadians(latitudeCurrent)) * Math.cos(this.toRadians(latitudeProjected)) * Math.sin(longitudeDistance / 2) * Math.sin(longitudeDistance / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = parseInt(earthRadius * c);

            var distanceObject = {
                lat: latitudeProjected,
                lon: longitudeProjected,
                distance: distance,
                id: this.get("distanceObjects").length
            };
            this.get("distanceObjects").pushObject(distanceObject);
            localStorage.distanceObjects = JSON.stringify(this.get("distanceObjects"));
        }
    });
});
define('geolocation-ember-web-app/components/zf-accordion-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion-menu'], function (exports, _emberCliFoundation6SassComponentsZfAccordionMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfAccordionMenu['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-accordion', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion'], function (exports, _emberCliFoundation6SassComponentsZfAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfAccordion['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-drilldown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-drilldown-menu'], function (exports, _emberCliFoundation6SassComponentsZfDrilldownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDrilldownMenu['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-dropdown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown-menu'], function (exports, _emberCliFoundation6SassComponentsZfDropdownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDropdownMenu['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-dropdown', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown'], function (exports, _emberCliFoundation6SassComponentsZfDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDropdown['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-magellan', ['exports', 'ember-cli-foundation-6-sass/components/zf-magellan'], function (exports, _emberCliFoundation6SassComponentsZfMagellan) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfMagellan['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-off-canvas', ['exports', 'ember-cli-foundation-6-sass/components/zf-off-canvas'], function (exports, _emberCliFoundation6SassComponentsZfOffCanvas) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfOffCanvas['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-orbit', ['exports', 'ember-cli-foundation-6-sass/components/zf-orbit'], function (exports, _emberCliFoundation6SassComponentsZfOrbit) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfOrbit['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-reveal', ['exports', 'ember-cli-foundation-6-sass/components/zf-reveal'], function (exports, _emberCliFoundation6SassComponentsZfReveal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfReveal['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-slider', ['exports', 'ember-cli-foundation-6-sass/components/zf-slider'], function (exports, _emberCliFoundation6SassComponentsZfSlider) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfSlider['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-tabs', ['exports', 'ember-cli-foundation-6-sass/components/zf-tabs'], function (exports, _emberCliFoundation6SassComponentsZfTabs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfTabs['default'];
    }
  });
});
define('geolocation-ember-web-app/components/zf-tooltip', ['exports', 'ember-cli-foundation-6-sass/components/zf-tooltip'], function (exports, _emberCliFoundation6SassComponentsZfTooltip) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfTooltip['default'];
    }
  });
});
define('geolocation-ember-web-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('geolocation-ember-web-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('geolocation-ember-web-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'geolocation-ember-web-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _geolocationEmberWebAppConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_geolocationEmberWebAppConfigEnvironment['default'].APP.name, _geolocationEmberWebAppConfigEnvironment['default'].APP.version)
  };
});
define('geolocation-ember-web-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('geolocation-ember-web-app/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('geolocation-ember-web-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('geolocation-ember-web-app/initializers/export-application-global', ['exports', 'ember', 'geolocation-ember-web-app/config/environment'], function (exports, _ember, _geolocationEmberWebAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_geolocationEmberWebAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _geolocationEmberWebAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_geolocationEmberWebAppConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('geolocation-ember-web-app/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('geolocation-ember-web-app/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('geolocation-ember-web-app/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('geolocation-ember-web-app/initializers/zf-widget', ['exports', 'ember-cli-foundation-6-sass/initializers/zf-widget'], function (exports, _emberCliFoundation6SassInitializersZfWidget) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassInitializersZfWidget['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassInitializersZfWidget.initialize;
    }
  });
});
define("geolocation-ember-web-app/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('geolocation-ember-web-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('geolocation-ember-web-app/router', ['exports', 'ember', 'geolocation-ember-web-app/config/environment'], function (exports, _ember, _geolocationEmberWebAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _geolocationEmberWebAppConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('geolocator');
  });

  exports['default'] = Router;
});
define('geolocation-ember-web-app/routes/geolocator', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('geolocation-ember-web-app/routes/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({

        beforeModel: function beforeModel() {
            this.transitionTo('geolocator');
        }

    });
});
define('geolocation-ember-web-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("geolocation-ember-web-app/templates/components/current-location", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 24
              },
              "end": {
                "line": 25,
                "column": 24
              }
            },
            "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("label");
            dom.setAttribute(el1, "class", "form-description");
            dom.setAttribute(el1, "for", "longLatInput");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "inputError", ["loc", [null, [24, 77], [24, 91]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 36,
                "column": 24
              },
              "end": {
                "line": 42,
                "column": 24
              }
            },
            "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("Longitude: ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" \n                                Latitude: ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                                Distance: ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("km\n                                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("button");
            dom.setAttribute(el2, "class", "clear-button");
            var el3 = dom.createTextNode("CLEAR");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                            ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [7]);
            var morphs = new Array(5);
            morphs[0] = dom.createAttrMorph(element0, 'id');
            morphs[1] = dom.createMorphAt(element0, 1, 1);
            morphs[2] = dom.createMorphAt(element0, 3, 3);
            morphs[3] = dom.createMorphAt(element0, 5, 5);
            morphs[4] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [["attribute", "id", ["concat", ["list-", ["get", "distanceObject.id", ["loc", [null, [37, 43], [37, 60]]]]]]], ["content", "distanceObject.lon", ["loc", [null, [37, 75], [37, 97]]]], ["content", "distanceObject.lat", ["loc", [null, [38, 42], [38, 64]]]], ["content", "distanceObject.distance", ["loc", [null, [39, 42], [39, 69]]]], ["element", "action", ["removeDistance", ["get", "distanceObject.id", ["loc", [null, [40, 87], [40, 104]]]]], [], ["loc", [null, [40, 61], [40, 107]]]]],
          locals: ["distanceObject"],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 42,
                "column": 24
              },
              "end": {
                "line": 44,
                "column": 24
              }
            },
            "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                            No Saved Distances\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 50,
              "column": 4
            }
          },
          "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "row");
          var el2 = dom.createTextNode("   \n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-12 medium-8 large-6 small-centered columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "location-main");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "location-description");
          var el5 = dom.createTextNode("\n                        Country: ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("br");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        City: ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("br");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ZipCode: ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("br");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        Lat: ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("br");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        Lon: ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "new-location-form");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("form");
          var el6 = dom.createTextNode("\n                        ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("label");
          dom.setAttribute(el6, "class", "form-labels");
          dom.setAttribute(el6, "for", "longLatInput");
          var el7 = dom.createTextNode("Find Distance To New Location:");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                        ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("label");
          dom.setAttribute(el6, "class", "form-description");
          dom.setAttribute(el6, "for", "longLatInput");
          var el7 = dom.createTextNode("* Use format Lon, Lat (example: \"42.232, -83.324\")");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("                        ");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                        ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("button");
          dom.setAttribute(el6, "class", "form-button");
          var el7 = dom.createTextNode("\n                            Get Distance\n                        ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                    ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "distance-list");
          var el5 = dom.createTextNode("\n                    ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("h2");
          var el6 = dom.createTextNode("Location Distances");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                    ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("ol");
          var el6 = dom.createTextNode("\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("                    ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n       ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1, 1, 1]);
          var element3 = dom.childAt(element2, [1]);
          var element4 = dom.childAt(element2, [3, 1]);
          var element5 = dom.childAt(element4, [9]);
          var morphs = new Array(9);
          morphs[0] = dom.createMorphAt(element3, 1, 1);
          morphs[1] = dom.createMorphAt(element3, 5, 5);
          morphs[2] = dom.createMorphAt(element3, 9, 9);
          morphs[3] = dom.createMorphAt(element3, 13, 13);
          morphs[4] = dom.createMorphAt(element3, 17, 17);
          morphs[5] = dom.createMorphAt(element4, 5, 5);
          morphs[6] = dom.createMorphAt(element4, 7, 7);
          morphs[7] = dom.createElementMorph(element5);
          morphs[8] = dom.createMorphAt(dom.childAt(element2, [5, 3]), 1, 1);
          return morphs;
        },
        statements: [["content", "locationObject.country", ["loc", [null, [9, 33], [9, 59]]]], ["content", "locationObject.city", ["loc", [null, [11, 30], [11, 53]]]], ["content", "locationObject.zip", ["loc", [null, [13, 33], [13, 55]]]], ["content", "locationObject.lat", ["loc", [null, [15, 29], [15, 51]]]], ["content", "locationObject.lon", ["loc", [null, [17, 29], [17, 51]]]], ["block", "if", [["get", "wrongFormat", ["loc", [null, [23, 30], [23, 41]]]]], [], 0, null, ["loc", [null, [23, 24], [25, 31]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "longLat", ["loc", [null, [26, 38], [26, 45]]]]], [], []], "id", "longLatInput", "placeholder", "Enter Lat , Lon", "tabindex", "1", "type", "text"], ["loc", [null, [26, 24], [26, 121]]]], ["element", "action", ["findNewDistance"], [], ["loc", [null, [27, 52], [27, 80]]]], ["block", "each", [["get", "distanceObjects", ["loc", [null, [36, 32], [36, 47]]]]], [], 1, 2, ["loc", [null, [36, 24], [44, 33]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 50,
                "column": 4
              },
              "end": {
                "line": 54,
                "column": 4
              }
            },
            "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error-message");
            var el2 = dom.createTextNode("\n               ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "errorMessage", ["loc", [null, [52, 15], [52, 31]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 50,
              "column": 4
            },
            "end": {
              "line": 54,
              "column": 4
            }
          },
          "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "showErrorMessage", ["loc", [null, [50, 14], [50, 30]]]]], [], 0, null, ["loc", [null, [50, 4], [54, 4]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 54,
            "column": 11
          }
        },
        "moduleName": "geolocation-ember-web-app/templates/components/current-location.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "header");
        var el2 = dom.createTextNode("\n        Your Current Location:\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "locationFound", ["loc", [null, [4, 10], [4, 23]]]]], [], 0, 1, ["loc", [null, [4, 4], [54, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("geolocation-ember-web-app/templates/geolocator", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "geolocation-ember-web-app/templates/geolocator.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "background");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "current-location", ["loc", [null, [3, 4], [3, 24]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("geolocation-ember-web-app/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["empty-body"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "geolocation-ember-web-app/templates/index.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define('geolocation-ember-web-app/utils/ajaxHelper', ['exports', 'geolocation-ember-web-app/config/environment', 'ember'], function (exports, _geolocationEmberWebAppConfigEnvironment, _ember) {

    var ajaxHelper = {
        makeRequest: function makeRequest(url, data, type) {
            var header = arguments.length <= 3 || arguments[3] === undefined ? { 'Accept': 'application/json' } : arguments[3];

            var options = {
                url: url,
                data: data,
                type: type,
                dataType: 'json',
                headers: header
            };
            return _ember['default'].$.ajax(options);
        },

        getCurrentLocation: function getCurrentLocation(callbackFunction) {
            var _this = this;

            var endpoint = "http://ip-api.com/json";
            var type = "GET";
            this.makeRequest(endpoint, null, type).then(function (response) {
                callbackFunction.call(_this, response);
            }, function (error) {
                callbackFunction.call(_this, error);
            });
        }

    };

    exports['default'] = ajaxHelper;
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('geolocation-ember-web-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'geolocation-ember-web-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("geolocation-ember-web-app/app")["default"].create({"name":"geolocation-ember-web-app","version":"0.0.0+ef0a8555"});
}

/* jshint ignore:end */
//# sourceMappingURL=geolocation-ember-web-app.map