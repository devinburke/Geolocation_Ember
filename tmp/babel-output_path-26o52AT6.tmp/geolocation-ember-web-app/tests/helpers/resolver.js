define('geolocation-ember-web-app/tests/helpers/resolver', ['exports', 'geolocation-ember-web-app/resolver', 'geolocation-ember-web-app/config/environment'], function (exports, _geolocationEmberWebAppResolver, _geolocationEmberWebAppConfigEnvironment) {

  var resolver = _geolocationEmberWebAppResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _geolocationEmberWebAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _geolocationEmberWebAppConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});