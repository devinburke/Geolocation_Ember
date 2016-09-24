define('geolocation-ember-web-app/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'geolocation-ember-web-app/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _geolocationEmberWebAppConfigEnvironment) {

  var name = _geolocationEmberWebAppConfigEnvironment['default'].APP.name;
  var version = _geolocationEmberWebAppConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});