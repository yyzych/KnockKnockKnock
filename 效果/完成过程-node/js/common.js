/**
 * common.js
 * ==================================================
 * Author: lute
 * Last modified: 2015-03-24 00:27
 * ==================================================
 * Common variables and functions for global use
 */

'use strict';

// Expand String methods
// ==================================================

// Tempalte using object and pattern
// Inspired by prototype.js Template
// https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/template.js#L106
String.prototype.format = function(object) {
  if(typeof object != 'object') return this
  return this.replace(/\{(.*?)\}/g, function(match, index) {
    return object[index]
  })
}

String.prototype.trimLeftZero = function() {
  var integer = this.split('.')[0]
  return integer.replace(/^(\+?)/g, '').replace(/^-?(0)+/g, '')
}

String.prototype.startsWith = function(prefix) {
  if (prefix == null || prefix.length == 0 || this.length < prefix.length)
    return false
  return this.substr(0, prefix.length) == prefix
}

// Expand Number methods
// ==================================================
Number.prototype.formatCurrency = function(fractionDigits, radix, separator){
  var self = this
  var fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits
  var radix = radix == undefined ? '.' : radix
  var separator = separator == undefined ? ',' : separator
  var minus = self < 0 ? '-' : '' 
  var i = parseInt(self = Math.abs(+self || 0).toFixed(fractionDigits)) + ''
  var j = (j = i.length) > 3 ? j % 3 : 0

  var currency = minus + (j ? i.substr(0, j) + separator : '') +
                 i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + separator) +
                 (fractionDigits ? radix + Math.abs(self - i).toFixed(fractionDigits).slice(2) : '')

  return currency
}


!function () {
  $(".back").on("click",function (e) {
    history.go(-1);
  })
}();