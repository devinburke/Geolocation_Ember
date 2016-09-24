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