
define('index',function (require, exports, module) {
    console.log('page index');
});

define('header',function (require, exports, module) {
    console.log('module header');
});

define('buildSeajs',['header','index'],function (require, exports, module) {
    require('header');
    require('index');
})
