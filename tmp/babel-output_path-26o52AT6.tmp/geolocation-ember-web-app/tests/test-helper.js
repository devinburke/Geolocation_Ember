define('geolocation-ember-web-app/tests/test-helper', ['exports', 'geolocation-ember-web-app/tests/helpers/resolver', 'ember-qunit'], function (exports, _geolocationEmberWebAppTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_geolocationEmberWebAppTestsHelpersResolver['default']);
});