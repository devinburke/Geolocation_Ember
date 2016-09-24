define('geolocation-ember-web-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'geolocation-ember-web-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _geolocationEmberWebAppConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_geolocationEmberWebAppConfigEnvironment['default'].APP.name, _geolocationEmberWebAppConfigEnvironment['default'].APP.version)
  };
});