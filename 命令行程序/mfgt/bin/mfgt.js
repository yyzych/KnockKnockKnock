#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var sortedObject = require('sorted-object');

var pkg = require('../package.json');
var version = pkg.version;

program
    .version(version)
    .usage('[options] [dir]')
    .option('-c, --css [engine]', '使用css预编译')
    .option('    --git', '添加.gitignore')
    .option('-m, --module [engine]', '使用模块化方案')
    .option('-s, --single [framework]', '使用单页应用开发模式')
    .option('-f, --force', '强制覆盖')
    .option('    --phone', '移动网站')
    .parse(process.argv);

main();

function main() {
    var dest = program.args.shift() || '.';
    var appName = path.basename(path.resolve(dest));
    isEmptyDirectory(dest, function(isEmpty) {
        if (isEmpty || program.force) {
            createApp(appName, dest);
        } else {
            confirm('目标路径有文件，是否覆盖？', function(ok) {
                if (ok) {
                    // process.stdin.destory();
                    createApp(appName, dest);
                } else {
                    // console.log('停止');
                    process.exit(1);
                }
            });
        }
    });
}

function createApp(appName, dest) {
    mkdir(dest, function() {
        // img
        mkdir(path.join(dest, 'img'));

        // gitignore
        if(program.git) {
            writeFile(dest + '/.gitignore', loadFile('other/.gitignore'));
        }
        
        // css
        createCss(path.join(dest, 'css'));

        // js
        createJs(path.join(dest, 'js'));

        // package.json
        createPackage(dest);

        // gulpfile.js
        createGulpFile(dest);
    });
}

function loadFile(name) {
    return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

function createGulpFile (root) {
    var gulpfile=loadFile('other/gulpfile.js');
    program.css === true && (program.css = 'less');
    switch (program.css) {
        case 'less':
            gulpfile=gulpfile.replace(/\{\*CssEngine\*\}/, 'var less = require(\'gulp-less\');')
                             .replace(/\{\*CssDependence\*\}/, '\'buildCSS\'');
            break;
        case 'sass':
            break;
        default:
            gulpfile=gulpfile.replace(/\{\*CssEngine\*\}/, '')
                             .replace(/\{\*CssDependence\*\}/, '');
            break;
    }
    program.module === true && (program.module='seajs');
    switch(program.module) {
        case 'seajs':
            gulpfile=gulpfile.replace(/\{\*JsModuleEngine\*\}/, 'var seajsCombo = require(\'gulp-seajs-combo\')')
                             .replace(/\{\*JsDependence\*\}/, '\'js-module\'');
            break;
        case 'requirejs':
            break;
        default:
            gulpfile=gulpfile.replace(/\{\*JsModuleEngine\*\}/, '')
                             .replace(/\{\*JsDependence\*\}/, '\'js-simple\'');
            break;
    };
    writeFile(root+'/gulpfile.js', gulpfile);
}

function createPackage (root) {
    var pkg = {
        "name": "build",
        "version": '0.0.1',
        "description": "build my program",
        "dependencies": {
            "gulp-minify-css": "*",
            "gulp-uglify": "*",
            "gulp-concat": "*",
            "gulp-rename": "*",
            "gulp-clean": "*",
            "gulp": "^3.9.0"
        }
    };
    program.css === true && (program.css = 'less');
    switch (program.css) {
        case 'less':
            pkg.dependencies['gulp-less'] = '*';
            break;
        case 'sass':
            break;
    }
    program.module === true && (program.module='seajs');
    switch(program.module) {
        case 'seajs':
            pkg.dependencies['gulp-seajs-combo'] = '*';
            break;
        case 'requirejs':
            break;
    };
    writeFile(root+'/package.json', JSON.stringify(pkg, null, 4));
}

function createCss(root) {
    mkdir(root, function() {
        mkdir(root + '/vendor');
        writeFile(root + '/app.css', loadFile('css/app.css'));
        program.css === true && (program.css = 'less');
        switch (program.css) {
            case 'less':
                mkdir(root + '/less', function() {
                    copyDirectory(path.join(__dirname, '..', 'templates', 'less'), root + '/less', true);
                });
                break;
            case 'sass':
                break;
        }
    });
}

function createJs(root) {
    mkdir(root, function() {
        mkdir(root + '/component');
        mkdir(root + '/vendor');
        mkdir(root + '/lib', function() {
            if(program.phone) {
                writeFile(root+'/lib/zepto.js', loadFile('js/framework/zepto/zepto.js'));
            }else {
                writeFile(root+'/lib/jquery.js', loadFile('js/framework/jquery/jquery.js'));
            }
        });

        program.module === true && (program.module='seajs');
        switch(program.module) {
            case 'seajs':
                mkdir(root+'/view')
                writeFile(root+'/init.js', loadFile('js/framework/seajs/sea.js'));
                writeFile(root+'/buildSeajs.js', '// buildSeajs.js \n\ndefine(function(require, exports, module){\n\n});');
                break;
            case 'requirejs':
                mkdir(root+'/view')
                writeFile(root+'/init.js', loadFile('js/framework/requirejs/require.js'));
                break;
            default:
                writeFile(root+'/init.js', '// init.js');
                break;
        }

        program.single === true && (program.single='backbone');
        switch(program.single) {
            case 'backbone':
                mkdir(root+'/entity');
                mkdir(root+'/view');
                writeFile(root+'/lib/underscore.js', loadFile('js/framework/underscore/underscore.js'));
                writeFile(root+'/lib/backbone.js', loadFile('js/framework/backbone/backbone.js'));
                break;
            case 'angular':
                break;
        }

    });
}

function copyDirectory(source, dest, deep, cb) {
    fs.readdir(source, function(err, files) {
        files.forEach(function(item) {
            var itemSource = source + '/' + item,
                itemDest = dest + '/' + item;
            if (fs.statSync(itemSource).isDirectory()) {
                if (deep) {
                    mkdir(itemDest, function() {
                        copyDirectory(itemSource, itemDest, deep, cb);
                    });
                } else mkdir(itemDest);
            } else {
                copyFile(itemSource, itemDest);
            }
        });
    });
}

function copyFile(source, dest) {
    writeFile(dest, fs.readFileSync(source, 'utf-8'));
}

function writeFile(path, str, mode, cb) {
    if (typeof mode === 'function') {
        mode = null;
        cb = mode;
    }
    fs.writeFile(path, str, {
        mode: mode || 0666
    }, function(err) {
        if (err) throw err;
        cb && cb();
        console.log('    \x1b[36m创建文件\x1b[0m: '+path);
    });
}

function mkdir(path, cb) {
    mkdirp(path, 0755, function(err) {
        if (err) throw err; // 直接抛出异常
        console.log('    \x1b[36m创建目录\x1b[0m: '+path);
        cb && cb();
    });
}

function confirm(msg, cb) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(msg, function(input) {
        rl.close();
        cb(/^y|yes|ok|true$/.test(input));
    });
}

function isEmptyDirectory(path, cb) {
    fs.readdir(path, function(err, files) {
        if (err && 'ENOENT' != err.code) throw err;
        cb(!files || !files.length);
    });
}


// for test;
exports.sayName=function () {
    return 'ych';
};

exports.sayAge=function (person) {
    var persons={
        ych: 19,
        lihua: 20
    };
    var temp=Math.random();
    return persons[person];
};

function helloWorld () {
    return 'hello world';
}


