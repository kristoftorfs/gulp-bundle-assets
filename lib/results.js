var through = require('through2'),
  gutil = require('gulp-util'),
  path = require('path'),
  fs = require('fs'),
  addBundleResults = require('./add-bundle-results');

module.exports = function (dest) {

  var resultJson = {};

  return gutil.noop()
    .on('data', function (file) {
      addBundleResults(resultJson, file);
    })
    .on('error', function (err) {
      self.emit('error', new gutil.PluginError('gulp-bundle-assets', err));
    })
    .on('end', function () {
      // todo hook into main stream
      var resultJsonPath = path.join(dest, 'bundle.result.json');
      fs.writeFile(resultJsonPath,
        JSON.stringify(resultJson, null, 2),
        function (err) {
          if (err) throw err;
          gutil.log('Created file', gutil.colors.magenta(resultJsonPath))
        });
    });
};