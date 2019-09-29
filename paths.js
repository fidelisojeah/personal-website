const fs = require('fs');
const path = require('path');
const url = require('url');

const envPublicUrl = process.env.PUBLIC_URL;
const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx'
];

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appDirectory = fs.realpathSync(process.cwd());

const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(ext =>
        fs.existsSync(resolveFn(`${filePath}.${ext}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    }
    if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    }
    return inputPath;
}

// eslint-disable-next-line import/no-dynamic-require
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),

    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json'))
}
