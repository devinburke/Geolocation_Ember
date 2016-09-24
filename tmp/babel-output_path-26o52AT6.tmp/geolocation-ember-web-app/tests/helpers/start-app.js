define('geolocation-ember-web-app/tests/helpers/start-app', ['exports', 'ember', 'geolocation-ember-web-app/app', 'geolocation-ember-web-app/config/environment'], function (exports, _ember, _geolocationEmberWebAppApp, _geolocationEmberWebAppConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _geolocationEmberWebAppConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _geolocationEmberWebAppApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});