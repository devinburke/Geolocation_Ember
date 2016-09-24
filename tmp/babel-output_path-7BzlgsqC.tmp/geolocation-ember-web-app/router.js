define('geolocation-ember-web-app/router', ['exports', 'ember', 'geolocation-ember-web-app/config/environment'], function (exports, _ember, _geolocationEmberWebAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _geolocationEmberWebAppConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});