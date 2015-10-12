/**
 * fileupload.js
 * ==================================================
 * Author: lute
 * Last modified: 2015-03-25 21:25
 * ==================================================
 * temporary solution for file upload plugin on mobile
 */

+function($) {
  'use strict'
  
  var Fileupload = function(element, options) {
    this.$element = $(element)
    this.options = options
    this.reader = new FileReader()
    this.$preview = null

    this.init()
  }
  
  Fileupload.DEFAULTS = {
    preview: false,
    iconName: 'clip',
    placeholder: '',
    maximumSize: 3145728, // 3M
    allowedTypes: ['jpg', 'png', 'gif', 'bmp', 'jpeg']
  }
  
  Fileupload.prototype.init = function() {
    var that = this
    
    var textInput = '<input type="text" class="form-control has-suffix" placeholder="' + this.options.placeholder + '" readonly style="cursor: no-drop;" >'
    var icon = '<i class="suffix icon icon-' + this.options.iconName + '">'
    
    this.$textInput = $(textInput)
    this.$icon = $(icon)
    this.$element.css({
      'position': 'absolute',
      'clip': 'rect(0px 0px 0px 0px)'
    }).addClass('hide').before(this.$textInput).before(this.$icon)

    // tirigger file input click
    this.$icon.tap(function() {
      that.$element.trigger('click')
    })
    
    if(this.options.preview) {
      this.previewUpload()
    } else {
      this.$element.change(function() {
        var filepath = that.$element.val()
        that.$fileInput.find('input').val(filepath.substring(filepath.lastIndexOf('\\') + 1))
      })
    }
  }
  
  Fileupload.prototype.readFile = function(file) {
    this.reader.readAsDataURL(file.files[0])
  }
  
  Fileupload.prototype.previewUpload = function() {
    var that = this
    this.$element.on('change', function(e) {
      e.stopImmediatePropagation()
      
      if(!that.checkType($(this).val())) {
        var wrongTypeEvent = $.Event('typeError:fancy:fileupload')
        that.$element.trigger(wrongTypeEvent)
        return
      }
      
      if(!that.isSizeAllowed(this.files[0].size)) {
        var sizeBeyondEvent = $.Event('sizeError:fancy:fileupload')
        that.$element.trigger(sizeBeyondEvent)
        return
      }

      var preview = function(callback) {
        if(that.$preview == null) {
          that.$preview = $('<div class="form-control has-suffix"></div>')
          that.$textInput.after(that.$preview).remove()
          var width = that.$preview.width()
          var leftPadding = parseInt(that.$preview.css('padding-left').match(/\d+/g)[0])
          var rightPadding = parseInt(that.$preview.css('padding-right').match(/\d+/g)[0])
          that.$preview.css({
            'height': (width - leftPadding - rightPadding) / 4 * 3 + 'px',
            'overflow': 'hidden',
            'text-align': 'center',
            'position': 'relative'
          })
        } else {
          that.$preview.empty()
        }
        callback && callback()
      }
      
      that.reader.onload = function(e) {
        var $image = $('<img src="">')
        $image.attr('src', this.result)

        preview(function() {
          $image.appendTo(that.$preview)
                .css({
                  // 'width': '100%',
                  // 'vertical-align': 'middle',
                  // 'margin': '-50% -100%'
                  'height': '100%'
                })
        })
        
        e.stopPropagation()
      }
      
      that.readFile(this)
    })
  }
  
  Fileupload.prototype.checkType = function(filename) {
    if($.inArray(filename.split('.').pop().toLowerCase(), this.options.allowedTypes) == -1) return false
    return true
  }
  
  Fileupload.prototype.isSizeAllowed = function(size) {
    return size <= this.options.maximumSize
  }
  
  var old = $.fn.fileupload
  
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this)
      var data = $this.data('fancy:fileupload')
      var options = $.extend({}, Fileupload.DEFAULTS, typeof option == 'object' && option)
      
      if(!data) $this.data('fancy:fileupload', (data = new Fileupload(this, options)))
    })
  }
  
  $.fn.fileupload = Plugin
  $.fn.fileupload.constructor = Fileupload
  
  $.fn.fileupload.noConflict = function() {
    $.fn.fileupload = old
    return this
  }

  $(document).ready(function() {
    $('[data-toggle="fileupload"]').each(function() {
      var $this = $(this)
      var option = $this.data()
      Plugin.call($this, option)
    })
  })
  
}(window.Zepto);
