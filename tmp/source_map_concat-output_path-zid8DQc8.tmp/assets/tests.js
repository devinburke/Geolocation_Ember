define('geolocation-ember-web-app/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('geolocation-ember-web-app/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('geolocation-ember-web-app/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('geolocation-ember-web-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'geolocation-ember-web-app/tests/helpers/start-app', 'geolocation-ember-web-app/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _geolocationEmberWebAppTestsHelpersStartApp, _geolocationEmberWebAppTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _geolocationEmberWebAppTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _geolocationEmberWebAppTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('geolocation-ember-web-app/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('geolocation-ember-web-app/tests/helpers/resolver', ['exports', 'geolocation-ember-web-app/resolver', 'geolocation-ember-web-app/config/environment'], function (exports, _geolocationEmberWebAppResolver, _geolocationEmberWebAppConfigEnvironment) {

  var resolver = _geolocationEmberWebAppResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _geolocationEmberWebAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _geolocationEmberWebAppConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('geolocation-ember-web-app/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
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
define('geolocation-ember-web-app/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('geolocation-ember-web-app/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('geolocation-ember-web-app/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('geolocation-ember-web-app/tests/test-helper', ['exports', 'geolocation-ember-web-app/tests/helpers/resolver', 'ember-qunit'], function (exports, _geolocationEmberWebAppTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_geolocationEmberWebAppTestsHelpersResolver['default']);
});
define('geolocation-ember-web-app/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('geolocation-ember-web-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map