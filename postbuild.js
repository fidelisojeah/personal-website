const fs = require('fs');

const paths = require('./paths');

fs.readdirSync(paths.appPublic)
    .filter((file) => `${paths.appPublic}/${file}` !== paths.appHtml)
    .forEach((file) => fs.copyFileSync(`${paths.appPublic}/${file}`, `${paths.appBuild}/${file}`));
