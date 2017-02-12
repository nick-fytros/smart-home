'use strict';

var _app = require('./app');

_app.app.set('port', process.env.PORT || 3000);

var server = _app.app.listen(_app.app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});