const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

// Generate simple index.html files that redirect to the proper docs URLs.
gulp.task('build_redirects', function(done) {
  const tools = [
    'fastlane', 'fastlane_core', 'deliver', 'snapshot', 'frameit', 'pem', 'sigh', 'produce', 'cert', 'gym', 'pilot', 'credentials_manager', 'spaceship', 'scan', 'supply', 'match', 'screengrab', 'precheck'
  ];

  const manualMapping = {
    fastlane: 'https://docs.fastlane.tools',
    spaceship: 'https://github.com/fastlane/fastlane/blob/master/spaceship/README.md#readme',
    fastlane_core: 'https://github.com/fastlane/fastlane/tree/master/fastlane_core#readme',
    credentials_manager: 'https://github.com/fastlane/fastlane/tree/master/credentials_manager#readme'
  };

  const buildDir = path.resolve(__dirname, '../../build');

  // Ensure base build directory exists
  fs.mkdirSync(buildDir, { recursive: true });

  tools.forEach((tool) => {
    const url = manualMapping[tool] && manualMapping[tool].length > 0
      ? manualMapping[tool]
      : `https://docs.fastlane.tools/actions/${tool}`;

    const indexHtml = `<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <meta http-equiv="refresh" content="0; url=${url}">\n    <script type="text/javascript">\n      window.location.replace(${JSON.stringify(url)});\n    </script>\n    <title>Redirecting…</title>\n  </head>\n  <body>\n    <p>Redirecting to <a href="${url}">${url}</a></p>\n  </body>\n</html>\n`;

    const outDir = path.join(buildDir, tool);
    const outFile = path.join(outDir, 'index.html');

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, indexHtml, 'utf8');
  });

  done();
});
