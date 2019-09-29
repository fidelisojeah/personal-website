const fs = require('fs');

const paths = require('./paths');

// fs.copySync(paths.appPublic, paths.appBuild, {
//     dereference: true,
//     filter: file => file !== paths.appHtml,
// });

// fs.copyFileSync(paths.appPublic, paths.appBuild, {
//     dereference: true,
//     filter: file => file !== paths.appHtml
// })

fs.readdirSync(paths.appPublic)
    .filter(file => `${paths.appPublic}/${file}` !== paths.appHtml)
    // .forEach((file) => console.log(file, 'FILE'))
    .forEach((file) => fs.copyFileSync(`${paths.appPublic}/${file}`, `${paths.appBuild}/${file}`))
