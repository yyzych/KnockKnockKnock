var assert = require('assert');
var rewire = require('rewire');
var lib = rewire('../bin/mfgt');

describe('main', function () {
    it('#helloWorld 应该返回true', function () {
        assert.ok(lib.__get__('helloWorld')());
    });

    it('#sayName 应该返回ych', function () {
        assert.equal(lib.sayName(), 'ych');
    });
});

