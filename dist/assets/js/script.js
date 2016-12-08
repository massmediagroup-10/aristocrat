'use strict';

function initCarousel() {
    $('.product-list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('.detail-slider-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.detail-slider-nav'
    });
    $('.detail-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.detail-slider-main',
        focusOnSelect: true,
        arrows: false,
        vertical: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                vertical: false
            }
        }, {
            breakpoint: 780,
            settings: {
                slidesToShow: 4,
                vertical: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                vertical: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                vertical: false
            }
        }]
    });
}

function initSlider() {
    $('.preview-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        fade: true
    });
}

function scrollHandler(initHeaderHeight) {
    var contentPadding = $('.content').outerHeight() - $('.content').height();
    var ofcontent = $('.header-line').offset().top - initHeaderHeight + contentPadding;
    var srollTop = $(document).scrollTop();
    if ((srollTop) > ofcontent) {
        $('.header').addClass('fixed');
        setInterval(function() {
            fixedResponsive();
        }, 0);
    } else {
        $('.header').removeClass('fixed');
        setInterval(function() {
            fixedResponsive();
        }, 0);
    }

}

function fixedResponsive() {
    if ($('.innerpage').length > 0) {
        var previewHeight = ($('.preview').length > 0) ? $('.preview').outerHeight() : 0;
        var submenuHeight = ($('.submenu.active').length > 0) ? $('.submenu.active').outerHeight() : 0;
        var headerHeight = $('.header').outerHeight();
        $('.content').css({
            'margin-top': headerHeight + previewHeight + submenuHeight
        });
        $('.navigation ul.submenu').css({
            'top': headerHeight
        });
    }
}

function initSubmenu() {
    $('.navigation .menu li').each(function() {
        if ($(this).find('.submenu').length) {
            $(this).addClass('has-submenu');
        }
    });

    var previewTop = ($('.preview').length) ? $('.preview').offset().top : 0;
    var submenuHeight = $('.submenu').height();
    var contentTop = $('.content').offset().top;

    $('.navigation li.has-submenu .submenu').stop().slideUp();

    $('.navigation li.has-submenu>a').click(function() {
        if ($(this).find('.submenu').hasClass('active')) {
            var that = $(this);
            that.find('.submenu').stop().slideUp(function() {
                that.find('.submenu').stop().removeClass('active');
            });
            $('.content').stop().animate({
                'margin-top': contentTop + 0
            });
            $('.preview').stop().animate({
                'top': previewTop + 0
            });
        } else {
            $(this).find('.submenu').stop().addClass('active');
            $(this).find('.submenu').stop().slideDown();
            $('.preview').stop().animate({
                'top': previewTop + submenuHeight
            });
            $('.content').stop().animate({
                'margin-top': contentTop + submenuHeight
            });

        }
    });
}

function tabs(block) {
    if (typeof(block) === 'undefined') block = $('.tabs');
    block.each(function() {
        var $wrap = $(this);
        if (!$wrap.is('.tabs-done')) {
            $wrap.addClass('tabs-done');
            $('[data-tabId]', $wrap).click(function(event) {
                event.preventDefault();
                var tabid = $(this).data('tabid');
                console.log(tabid);
                $('[data-tabId]', $wrap).removeClass('active');
                $('[data-tabId="' + tabid + '"]', $wrap).addClass('active');
                $('[data-tab]', $wrap).removeClass('active').addClass('hidden');
                $('[data-tab="' + tabid + '"]', $wrap).addClass('active').removeClass('hidden');
            });
            if ($('.active[data-tabId]', $wrap).length > 0)
                $('.active[data-tabId]', $wrap).click();
            else
                $('[data-tabId]:eq(0)', $wrap).click();
        }
    })
}

function foundation() {
    $(document).foundation({
        tab: {
            callback: function(tab) {
                console.log(tab);
            }
        }
    });
}

function sideMenu() {
    $('.side-menu>li>a').siblings('ul').slideUp(0);
    $(document).on('click', '.side-menu>li>a', function() {
        if ($(this).siblings('ul').length) {
            $(this).stop().toggleClass('active');
            $(this).siblings('ul').stop().slideToggle();
        }
    });
}

function productRate() {
    $(document).on('click', '.product-rate', function() {
        $(this).stop().toggleClass('active');
    });
}

function checkoutItem() {
    $('.checkout-body').slideUp(0);
    $(document).on('click', '.checkout-title a', function() {
        var checkout = $(this).parent();
        $('.checkout-body').slideUp();
        $('.checkout-title').not(checkout).removeClass('active');
        if (checkout.hasClass('active')) {
            checkout.removeClass('active');
            $(this).parent().siblings('.checkout-body').slideUp();
        } else {
            checkout.addClass('active');
            $(this).parent().siblings('.checkout-body').slideDown();
        }
    });
}

$(document).ready(function() {
    initCarousel();
    initSubmenu();
    initSlider();
    tabs();
    sideMenu();
    productRate();
    fixedResponsive();
    checkoutItem();

    $('form').each(function() {
        $(this).validate();
    });

    var initHeaderHeight = $('.header').height();
    $(window).on('scroll', function() {
        scrollHandler(initHeaderHeight);
    });
    $(window).on('resize', function() {
        fixedResponsive()
    });
});

!function($) {

"use strict";

var FOUNDATION_VERSION = '6.2.4';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Returns a boolean for RTL support
   */
  rtl: function(){
    return $('html').attr('dir') === 'rtl';
  },
  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function(plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = (name || functionName(plugin));
    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName  = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function(plugin, name){
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = this.GetYoDigits(6, pluginName);

    if(!plugin.$element.attr(`data-${pluginName}`)){ plugin.$element.attr(`data-${pluginName}`, plugin.uuid); }
    if(!plugin.$element.data('zfPlugin')){ plugin.$element.data('zfPlugin', plugin); }
          /**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */
    plugin.$element.trigger(`init.zf.${pluginName}`);

    this._uuids.push(plugin.uuid);

    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function(plugin){
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
          /**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */
          .trigger(`destroyed.zf.${pluginName}`);
    for(var prop in plugin){
      plugin[prop] = null;//clean up script to prep for garbage collection.
    }
    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
   reInit: function(plugins){
     var isJQ = plugins instanceof $;
     try{
       if(isJQ){
         plugins.each(function(){
           $(this).data('zfPlugin')._init();
         });
       }else{
         var type = typeof plugins,
         _this = this,
         fns = {
           'object': function(plgs){
             plgs.forEach(function(p){
               p = hyphenate(p);
               $('[data-'+ p +']').foundation('_init');
             });
           },
           'string': function(){
             plugins = hyphenate(plugins);
             $('[data-'+ plugins +']').foundation('_init');
           },
           'undefined': function(){
             this['object'](Object.keys(_this._plugins));
           }
         };
         fns[type](plugins);
       }
     }catch(err){
       console.error(err);
     }finally{
       return plugins;
     }
   },

  /**
   * returns a random base-36 uid with namespacing
   * @function
   * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
   * @param {String} namespace - name of plugin to be incorporated in uid, optional.
   * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
   * @returns {String} - unique id
   */
  GetYoDigits: function(length, namespace){
    length = length || 6;
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (namespace ? `-${namespace}` : '');
  },
  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function(elem, plugins) {

    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    var _this = this;

    // Iterate through each plugin
    $.each(plugins, function(i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = $(elem).find('[data-'+name+']').addBack('[data-'+name+']');

      // For each plugin found, initialize it
      $elem.each(function() {
        var $el = $(this),
            opts = {};
        // Don't double-dip on plugins
        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");
          return;
        }

        if($el.attr('data-options')){
          var thing = $el.attr('data-options').split(';').forEach(function(e, i){
            var opt = e.split(':').map(function(el){ return el.trim(); });
            if(opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }
        try{
          $el.data('zfPlugin', new plugin($(this), opts));
        }catch(er){
          console.error(er);
        }finally{
          return;
        }
      });
    });
  },
  getFnName: functionName,
  transitionend: function($elem){
    var transitions = {
      'transition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'otransitionend'
    };
    var elem = document.createElement('div'),
        end;

    for (var t in transitions){
      if (typeof elem.style[t] !== 'undefined'){
        end = transitions[t];
      }
    }
    if(end){
      return end;
    }else{
      end = setTimeout(function(){
        $elem.triggerHandler('transitionend', [$elem]);
      }, 1);
      return 'transitionend';
    }
  }
};

Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function (func, delay) {
    var timer = null;

    return function () {
      var context = this, args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};

// TODO: consider not making this a jQuery function
// TODO: need way to reflow vs. re-initialize
/**
 * The Foundation jQuery method.
 * @param {String|Array} method - An action to perform on the current jQuery object.
 */
var foundation = function(method) {
  var type = typeof method,
      $meta = $('meta.foundation-mq'),
      $noJS = $('.no-js');

  if(!$meta.length){
    $('<meta class="foundation-mq">').appendTo(document.head);
  }
  if($noJS.length){
    $noJS.removeClass('no-js');
  }

  if(type === 'undefined'){//needs to initialize the Foundation object, or an individual plugin.
    Foundation.MediaQuery._init();
    Foundation.reflow(this);
  }else if(type === 'string'){//an individual method to invoke on a plugin or group of plugins
    var args = Array.prototype.slice.call(arguments, 1);//collect all the arguments, if necessary
    var plugClass = this.data('zfPlugin');//determine the class of plugin

    if(plugClass !== undefined && plugClass[method] !== undefined){//make sure both the class and method exist
      if(this.length === 1){//if there's only one, call it directly.
          plugClass[method].apply(plugClass, args);
      }else{
        this.each(function(i, el){//otherwise loop through the jQuery collection and invoke the method on each
          plugClass[method].apply($(el).data('zfPlugin'), args);
        });
      }
    }else{//error for no class or no method
      throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
    }
  }else{//error for invalid argument type
    throw new TypeError(`We're sorry, ${type} is not a valid parameter. You must use a string representing the method you wish to invoke.`);
  }
  return this;
};

window.Foundation = Foundation;
$.fn.foundation = foundation;

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now || !window.Date.now)
    window.Date.now = Date.now = function() { return new Date().getTime(); };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */
  if(!window.performance || !window.performance.now){
    window.performance = {
      start: Date.now(),
      now: function(){ return Date.now() - this.start; }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = (funcNameRegex).exec((fn).toString());
    return (results && results.length > 1) ? results[1].trim() : "";
  }
  else if (fn.prototype === undefined) {
    return fn.constructor.name;
  }
  else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str){
  if(/true/.test(str)) return true;
  else if(/false/.test(str)) return false;
  else if(!isNaN(str * 1)) return parseFloat(str);
  return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

}(jQuery);

/*! jQuery Validation Plugin - v1.16.0 - 12/2/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return!c.settings.submitHandler||(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(null!=j&&null!=j.form){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr.pseudos||a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){!this.form&&this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]);var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiZm91bmRhdGlvbi5jb3JlLmpzIiwianF1ZXJ5LnZhbGlkYXRlLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxWEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gaW5pdENhcm91c2VsKCkge1xyXG4gICAgJCgnLnByb2R1Y3QtbGlzdCcpLnNsaWNrKHtcclxuICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBzd2lwZVRvU2xpZGU6IHRydWUsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5kZXRhaWwtc2xpZGVyLW1haW4nKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmRldGFpbC1zbGlkZXItbmF2J1xyXG4gICAgfSk7XHJcbiAgICAkKCcuZGV0YWlsLXNsaWRlci1uYXYnKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmRldGFpbC1zbGlkZXItbWFpbicsXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIHZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNzgwLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgICQoJy5wcmV2aWV3LXNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICBmYWRlOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsSGFuZGxlcihpbml0SGVhZGVySGVpZ2h0KSB7XHJcbiAgICB2YXIgY29udGVudFBhZGRpbmcgPSAkKCcuY29udGVudCcpLm91dGVySGVpZ2h0KCkgLSAkKCcuY29udGVudCcpLmhlaWdodCgpO1xyXG4gICAgdmFyIG9mY29udGVudCA9ICQoJy5oZWFkZXItbGluZScpLm9mZnNldCgpLnRvcCAtIGluaXRIZWFkZXJIZWlnaHQgKyBjb250ZW50UGFkZGluZztcclxuICAgIHZhciBzcm9sbFRvcCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgaWYgKChzcm9sbFRvcCkgPiBvZmNvbnRlbnQpIHtcclxuICAgICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZpeGVkUmVzcG9uc2l2ZSgpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZpeGVkUmVzcG9uc2l2ZSgpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZml4ZWRSZXNwb25zaXZlKCkge1xyXG4gICAgaWYgKCQoJy5pbm5lcnBhZ2UnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIHByZXZpZXdIZWlnaHQgPSAoJCgnLnByZXZpZXcnKS5sZW5ndGggPiAwKSA/ICQoJy5wcmV2aWV3Jykub3V0ZXJIZWlnaHQoKSA6IDA7XHJcbiAgICAgICAgdmFyIHN1Ym1lbnVIZWlnaHQgPSAoJCgnLnN1Ym1lbnUuYWN0aXZlJykubGVuZ3RoID4gMCkgPyAkKCcuc3VibWVudS5hY3RpdmUnKS5vdXRlckhlaWdodCgpIDogMDtcclxuICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQnKS5jc3Moe1xyXG4gICAgICAgICAgICAnbWFyZ2luLXRvcCc6IGhlYWRlckhlaWdodCArIHByZXZpZXdIZWlnaHQgKyBzdWJtZW51SGVpZ2h0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLm5hdmlnYXRpb24gdWwuc3VibWVudScpLmNzcyh7XHJcbiAgICAgICAgICAgICd0b3AnOiBoZWFkZXJIZWlnaHRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN1Ym1lbnUoKSB7XHJcbiAgICAkKCcubmF2aWdhdGlvbiAubWVudSBsaScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLnN1Ym1lbnUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaGFzLXN1Ym1lbnUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgcHJldmlld1RvcCA9ICgkKCcucHJldmlldycpLmxlbmd0aCkgPyAkKCcucHJldmlldycpLm9mZnNldCgpLnRvcCA6IDA7XHJcbiAgICB2YXIgc3VibWVudUhlaWdodCA9ICQoJy5zdWJtZW51JykuaGVpZ2h0KCk7XHJcbiAgICB2YXIgY29udGVudFRvcCA9ICQoJy5jb250ZW50Jykub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICQoJy5uYXZpZ2F0aW9uIGxpLmhhcy1zdWJtZW51IC5zdWJtZW51Jykuc3RvcCgpLnNsaWRlVXAoKTtcclxuXHJcbiAgICAkKCcubmF2aWdhdGlvbiBsaS5oYXMtc3VibWVudT5hJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLnN1Ym1lbnUnKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmQoJy5zdWJtZW51Jykuc3RvcCgpLnNsaWRlVXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmQoJy5zdWJtZW51Jykuc3RvcCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW50Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ21hcmdpbi10b3AnOiBjb250ZW50VG9wICsgMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCgnLnByZXZpZXcnKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogcHJldmlld1RvcCArIDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuc3VibWVudScpLnN0b3AoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLnN1Ym1lbnUnKS5zdG9wKCkuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICQoJy5wcmV2aWV3Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IHByZXZpZXdUb3AgKyBzdWJtZW51SGVpZ2h0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKCcuY29udGVudCcpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICdtYXJnaW4tdG9wJzogY29udGVudFRvcCArIHN1Ym1lbnVIZWlnaHRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YWJzKGJsb2NrKSB7XHJcbiAgICBpZiAodHlwZW9mKGJsb2NrKSA9PT0gJ3VuZGVmaW5lZCcpIGJsb2NrID0gJCgnLnRhYnMnKTtcclxuICAgIGJsb2NrLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyICR3cmFwID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoISR3cmFwLmlzKCcudGFicy1kb25lJykpIHtcclxuICAgICAgICAgICAgJHdyYXAuYWRkQ2xhc3MoJ3RhYnMtZG9uZScpO1xyXG4gICAgICAgICAgICAkKCdbZGF0YS10YWJJZF0nLCAkd3JhcCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFiaWQgPSAkKHRoaXMpLmRhdGEoJ3RhYmlkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YWJpZCk7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10YWJJZF0nLCAkd3JhcCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdGFiSWQ9XCInICsgdGFiaWQgKyAnXCJdJywgJHdyYXApLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRhYl0nLCAkd3JhcCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRhYj1cIicgKyB0YWJpZCArICdcIl0nLCAkd3JhcCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICgkKCcuYWN0aXZlW2RhdGEtdGFiSWRdJywgJHdyYXApLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAkKCcuYWN0aXZlW2RhdGEtdGFiSWRdJywgJHdyYXApLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRhYklkXTplcSgwKScsICR3cmFwKS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvdW5kYXRpb24oKSB7XHJcbiAgICAkKGRvY3VtZW50KS5mb3VuZGF0aW9uKHtcclxuICAgICAgICB0YWI6IHtcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKHRhYikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaWRlTWVudSgpIHtcclxuICAgICQoJy5zaWRlLW1lbnU+bGk+YScpLnNpYmxpbmdzKCd1bCcpLnNsaWRlVXAoMCk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnNpZGUtbWVudT5saT5hJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2libGluZ3MoJ3VsJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuc3RvcCgpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygndWwnKS5zdG9wKCkuc2xpZGVUb2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvZHVjdFJhdGUoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnByb2R1Y3QtcmF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuc3RvcCgpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja291dEl0ZW0oKSB7XHJcbiAgICAkKCcuY2hlY2tvdXQtYm9keScpLnNsaWRlVXAoMCk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNoZWNrb3V0LXRpdGxlIGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2hlY2tvdXQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgICAgICQoJy5jaGVja291dC1ib2R5Jykuc2xpZGVVcCgpO1xyXG4gICAgICAgICQoJy5jaGVja291dC10aXRsZScpLm5vdChjaGVja291dCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmIChjaGVja291dC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgY2hlY2tvdXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKCcuY2hlY2tvdXQtYm9keScpLnNsaWRlVXAoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja291dC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuc2libGluZ3MoJy5jaGVja291dC1ib2R5Jykuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaW5pdENhcm91c2VsKCk7XHJcbiAgICBpbml0U3VibWVudSgpO1xyXG4gICAgaW5pdFNsaWRlcigpO1xyXG4gICAgdGFicygpO1xyXG4gICAgc2lkZU1lbnUoKTtcclxuICAgIHByb2R1Y3RSYXRlKCk7XHJcbiAgICBmaXhlZFJlc3BvbnNpdmUoKTtcclxuICAgIGNoZWNrb3V0SXRlbSgpO1xyXG5cclxuICAgICQoJ2Zvcm0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudmFsaWRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBpbml0SGVhZGVySGVpZ2h0ID0gJCgnLmhlYWRlcicpLmhlaWdodCgpO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzY3JvbGxIYW5kbGVyKGluaXRIZWFkZXJIZWlnaHQpO1xyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZpeGVkUmVzcG9uc2l2ZSgpXHJcbiAgICB9KTtcclxufSk7XHJcbiIsIiFmdW5jdGlvbigkKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgRk9VTkRBVElPTl9WRVJTSU9OID0gJzYuMi40JztcblxuLy8gR2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4vLyBUaGlzIGlzIGF0dGFjaGVkIHRvIHRoZSB3aW5kb3csIG9yIHVzZWQgYXMgYSBtb2R1bGUgZm9yIEFNRC9Ccm93c2VyaWZ5XG52YXIgRm91bmRhdGlvbiA9IHtcbiAgdmVyc2lvbjogRk9VTkRBVElPTl9WRVJTSU9OLFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW5pdGlhbGl6ZWQgcGx1Z2lucy5cbiAgICovXG4gIF9wbHVnaW5zOiB7fSxcblxuICAvKipcbiAgICogU3RvcmVzIGdlbmVyYXRlZCB1bmlxdWUgaWRzIGZvciBwbHVnaW4gaW5zdGFuY2VzXG4gICAqL1xuICBfdXVpZHM6IFtdLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBmb3IgUlRMIHN1cHBvcnRcbiAgICovXG4gIHJ0bDogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gJCgnaHRtbCcpLmF0dHIoJ2RpcicpID09PSAncnRsJztcbiAgfSxcbiAgLyoqXG4gICAqIERlZmluZXMgYSBGb3VuZGF0aW9uIHBsdWdpbiwgYWRkaW5nIGl0IHRvIHRoZSBgRm91bmRhdGlvbmAgbmFtZXNwYWNlIGFuZCB0aGUgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUgd2hlbiByZWZsb3dpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHBsdWdpbi5cbiAgICovXG4gIHBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKSB7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBhZGRpbmcgdG8gZ2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4gICAgLy8gRXhhbXBsZXM6IEZvdW5kYXRpb24uUmV2ZWFsLCBGb3VuZGF0aW9uLk9mZkNhbnZhc1xuICAgIHZhciBjbGFzc05hbWUgPSAobmFtZSB8fCBmdW5jdGlvbk5hbWUocGx1Z2luKSk7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBzdG9yaW5nIHRoZSBwbHVnaW4sIGFsc28gdXNlZCB0byBjcmVhdGUgdGhlIGlkZW50aWZ5aW5nIGRhdGEgYXR0cmlidXRlIGZvciB0aGUgcGx1Z2luXG4gICAgLy8gRXhhbXBsZXM6IGRhdGEtcmV2ZWFsLCBkYXRhLW9mZi1jYW52YXNcbiAgICB2YXIgYXR0ck5hbWUgID0gaHlwaGVuYXRlKGNsYXNzTmFtZSk7XG5cbiAgICAvLyBBZGQgdG8gdGhlIEZvdW5kYXRpb24gb2JqZWN0IGFuZCB0aGUgcGx1Z2lucyBsaXN0IChmb3IgcmVmbG93aW5nKVxuICAgIHRoaXMuX3BsdWdpbnNbYXR0ck5hbWVdID0gdGhpc1tjbGFzc05hbWVdID0gcGx1Z2luO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFBvcHVsYXRlcyB0aGUgX3V1aWRzIGFycmF5IHdpdGggcG9pbnRlcnMgdG8gZWFjaCBpbmRpdmlkdWFsIHBsdWdpbiBpbnN0YW5jZS5cbiAgICogQWRkcyB0aGUgYHpmUGx1Z2luYCBkYXRhLWF0dHJpYnV0ZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWQgcGx1Z2lucyB0byBhbGxvdyB1c2Ugb2YgJChzZWxlY3RvcikuZm91bmRhdGlvbihtZXRob2QpIGNhbGxzLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBpbml0aWFsaXphdGlvbiBldmVudCBmb3IgZWFjaCBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHBsdWdpbiwgcGFzc2VkIGFzIGEgY2FtZWxDYXNlZCBzdHJpbmcuXG4gICAqIEBmaXJlcyBQbHVnaW4jaW5pdFxuICAgKi9cbiAgcmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSl7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBuYW1lID8gaHlwaGVuYXRlKG5hbWUpIDogZnVuY3Rpb25OYW1lKHBsdWdpbi5jb25zdHJ1Y3RvcikudG9Mb3dlckNhc2UoKTtcbiAgICBwbHVnaW4udXVpZCA9IHRoaXMuR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWApKXsgcGx1Z2luLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWAsIHBsdWdpbi51dWlkKTsgfVxuICAgIGlmKCFwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKSl7IHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicsIHBsdWdpbik7IH1cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAgICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAgICAgICAqL1xuICAgIHBsdWdpbi4kZWxlbWVudC50cmlnZ2VyKGBpbml0LnpmLiR7cGx1Z2luTmFtZX1gKTtcblxuICAgIHRoaXMuX3V1aWRzLnB1c2gocGx1Z2luLnV1aWQpO1xuXG4gICAgcmV0dXJuO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFJlbW92ZXMgdGhlIHBsdWdpbnMgdXVpZCBmcm9tIHRoZSBfdXVpZHMgYXJyYXkuXG4gICAqIFJlbW92ZXMgdGhlIHpmUGx1Z2luIGRhdGEgYXR0cmlidXRlLCBhcyB3ZWxsIGFzIHRoZSBkYXRhLXBsdWdpbi1uYW1lIGF0dHJpYnV0ZS5cbiAgICogQWxzbyBmaXJlcyB0aGUgZGVzdHJveWVkIGV2ZW50IGZvciB0aGUgcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAZmlyZXMgUGx1Z2luI2Rlc3Ryb3llZFxuICAgKi9cbiAgdW5yZWdpc3RlclBsdWdpbjogZnVuY3Rpb24ocGx1Z2luKXtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGh5cGhlbmF0ZShmdW5jdGlvbk5hbWUocGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykuY29uc3RydWN0b3IpKTtcblxuICAgIHRoaXMuX3V1aWRzLnNwbGljZSh0aGlzLl91dWlkcy5pbmRleE9mKHBsdWdpbi51dWlkKSwgMSk7XG4gICAgcGx1Z2luLiRlbGVtZW50LnJlbW92ZUF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWApLnJlbW92ZURhdGEoJ3pmUGx1Z2luJylcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgICAqIEBldmVudCBQbHVnaW4jZGVzdHJveWVkXG4gICAgICAgICAgICovXG4gICAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHBsdWdpbil7XG4gICAgICBwbHVnaW5bcHJvcF0gPSBudWxsOy8vY2xlYW4gdXAgc2NyaXB0IHRvIHByZXAgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQ2F1c2VzIG9uZSBvciBtb3JlIGFjdGl2ZSBwbHVnaW5zIHRvIHJlLWluaXRpYWxpemUsIHJlc2V0dGluZyBldmVudCBsaXN0ZW5lcnMsIHJlY2FsY3VsYXRpbmcgcG9zaXRpb25zLCBldGMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwbHVnaW5zIC0gb3B0aW9uYWwgc3RyaW5nIG9mIGFuIGluZGl2aWR1YWwgcGx1Z2luIGtleSwgYXR0YWluZWQgYnkgY2FsbGluZyBgJChlbGVtZW50KS5kYXRhKCdwbHVnaW5OYW1lJylgLCBvciBzdHJpbmcgb2YgYSBwbHVnaW4gY2xhc3MgaS5lLiBgJ2Ryb3Bkb3duJ2BcbiAgICogQGRlZmF1bHQgSWYgbm8gYXJndW1lbnQgaXMgcGFzc2VkLCByZWZsb3cgYWxsIGN1cnJlbnRseSBhY3RpdmUgcGx1Z2lucy5cbiAgICovXG4gICByZUluaXQ6IGZ1bmN0aW9uKHBsdWdpbnMpe1xuICAgICB2YXIgaXNKUSA9IHBsdWdpbnMgaW5zdGFuY2VvZiAkO1xuICAgICB0cnl7XG4gICAgICAgaWYoaXNKUSl7XG4gICAgICAgICBwbHVnaW5zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgJCh0aGlzKS5kYXRhKCd6ZlBsdWdpbicpLl9pbml0KCk7XG4gICAgICAgICB9KTtcbiAgICAgICB9ZWxzZXtcbiAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHBsdWdpbnMsXG4gICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICBmbnMgPSB7XG4gICAgICAgICAgICdvYmplY3QnOiBmdW5jdGlvbihwbGdzKXtcbiAgICAgICAgICAgICBwbGdzLmZvckVhY2goZnVuY3Rpb24ocCl7XG4gICAgICAgICAgICAgICBwID0gaHlwaGVuYXRlKHApO1xuICAgICAgICAgICAgICAgJCgnW2RhdGEtJysgcCArJ10nKS5mb3VuZGF0aW9uKCdfaW5pdCcpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAnc3RyaW5nJzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBwbHVnaW5zID0gaHlwaGVuYXRlKHBsdWdpbnMpO1xuICAgICAgICAgICAgICQoJ1tkYXRhLScrIHBsdWdpbnMgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3VuZGVmaW5lZCc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgdGhpc1snb2JqZWN0J10oT2JqZWN0LmtleXMoX3RoaXMuX3BsdWdpbnMpKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfTtcbiAgICAgICAgIGZuc1t0eXBlXShwbHVnaW5zKTtcbiAgICAgICB9XG4gICAgIH1jYXRjaChlcnIpe1xuICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgfWZpbmFsbHl7XG4gICAgICAgcmV0dXJuIHBsdWdpbnM7XG4gICAgIH1cbiAgIH0sXG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSByYW5kb20gYmFzZS0zNiB1aWQgd2l0aCBuYW1lc3BhY2luZ1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCAtIG51bWJlciBvZiByYW5kb20gYmFzZS0zNiBkaWdpdHMgZGVzaXJlZC4gSW5jcmVhc2UgZm9yIG1vcmUgcmFuZG9tIHN0cmluZ3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgLSBuYW1lIG9mIHBsdWdpbiB0byBiZSBpbmNvcnBvcmF0ZWQgaW4gdWlkLCBvcHRpb25hbC5cbiAgICogQGRlZmF1bHQge1N0cmluZ30gJycgLSBpZiBubyBwbHVnaW4gbmFtZSBpcyBwcm92aWRlZCwgbm90aGluZyBpcyBhcHBlbmRlZCB0byB0aGUgdWlkLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSAtIHVuaXF1ZSBpZFxuICAgKi9cbiAgR2V0WW9EaWdpdHM6IGZ1bmN0aW9uKGxlbmd0aCwgbmFtZXNwYWNlKXtcbiAgICBsZW5ndGggPSBsZW5ndGggfHwgNjtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5wb3coMzYsIGxlbmd0aCArIDEpIC0gTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDM2LCBsZW5ndGgpKSkudG9TdHJpbmcoMzYpLnNsaWNlKDEpICsgKG5hbWVzcGFjZSA/IGAtJHtuYW1lc3BhY2V9YCA6ICcnKTtcbiAgfSxcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgcGx1Z2lucyBvbiBhbnkgZWxlbWVudHMgd2l0aGluIGBlbGVtYCAoYW5kIGBlbGVtYCBpdHNlbGYpIHRoYXQgYXJlbid0IGFscmVhZHkgaW5pdGlhbGl6ZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIC0galF1ZXJ5IG9iamVjdCBjb250YWluaW5nIHRoZSBlbGVtZW50IHRvIGNoZWNrIGluc2lkZS4gQWxzbyBjaGVja3MgdGhlIGVsZW1lbnQgaXRzZWxmLCB1bmxlc3MgaXQncyB0aGUgYGRvY3VtZW50YCBvYmplY3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBwbHVnaW5zIC0gQSBsaXN0IG9mIHBsdWdpbnMgdG8gaW5pdGlhbGl6ZS4gTGVhdmUgdGhpcyBvdXQgdG8gaW5pdGlhbGl6ZSBldmVyeXRoaW5nLlxuICAgKi9cbiAgcmVmbG93OiBmdW5jdGlvbihlbGVtLCBwbHVnaW5zKSB7XG5cbiAgICAvLyBJZiBwbHVnaW5zIGlzIHVuZGVmaW5lZCwganVzdCBncmFiIGV2ZXJ5dGhpbmdcbiAgICBpZiAodHlwZW9mIHBsdWdpbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwbHVnaW5zID0gT2JqZWN0LmtleXModGhpcy5fcGx1Z2lucyk7XG4gICAgfVxuICAgIC8vIElmIHBsdWdpbnMgaXMgYSBzdHJpbmcsIGNvbnZlcnQgaXQgdG8gYW4gYXJyYXkgd2l0aCBvbmUgaXRlbVxuICAgIGVsc2UgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAnc3RyaW5nJykge1xuICAgICAgcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcGx1Z2luXG4gICAgJC5lYWNoKHBsdWdpbnMsIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBwbHVnaW5cbiAgICAgIHZhciBwbHVnaW4gPSBfdGhpcy5fcGx1Z2luc1tuYW1lXTtcblxuICAgICAgLy8gTG9jYWxpemUgdGhlIHNlYXJjaCB0byBhbGwgZWxlbWVudHMgaW5zaWRlIGVsZW0sIGFzIHdlbGwgYXMgZWxlbSBpdHNlbGYsIHVubGVzcyBlbGVtID09PSBkb2N1bWVudFxuICAgICAgdmFyICRlbGVtID0gJChlbGVtKS5maW5kKCdbZGF0YS0nK25hbWUrJ10nKS5hZGRCYWNrKCdbZGF0YS0nK25hbWUrJ10nKTtcblxuICAgICAgLy8gRm9yIGVhY2ggcGx1Z2luIGZvdW5kLCBpbml0aWFsaXplIGl0XG4gICAgICAkZWxlbS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgLy8gRG9uJ3QgZG91YmxlLWRpcCBvbiBwbHVnaW5zXG4gICAgICAgIGlmICgkZWwuZGF0YSgnemZQbHVnaW4nKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIlRyaWVkIHRvIGluaXRpYWxpemUgXCIrbmFtZStcIiBvbiBhbiBlbGVtZW50IHRoYXQgYWxyZWFkeSBoYXMgYSBGb3VuZGF0aW9uIHBsdWdpbi5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpKXtcbiAgICAgICAgICB2YXIgdGhpbmcgPSAkZWwuYXR0cignZGF0YS1vcHRpb25zJykuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpe1xuICAgICAgICAgICAgdmFyIG9wdCA9IGUuc3BsaXQoJzonKS5tYXAoZnVuY3Rpb24oZWwpeyByZXR1cm4gZWwudHJpbSgpOyB9KTtcbiAgICAgICAgICAgIGlmKG9wdFswXSkgb3B0c1tvcHRbMF1dID0gcGFyc2VWYWx1ZShvcHRbMV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAkZWwuZGF0YSgnemZQbHVnaW4nLCBuZXcgcGx1Z2luKCQodGhpcyksIG9wdHMpKTtcbiAgICAgICAgfWNhdGNoKGVyKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVyKTtcbiAgICAgICAgfWZpbmFsbHl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Rm5OYW1lOiBmdW5jdGlvbk5hbWUsXG4gIHRyYW5zaXRpb25lbmQ6IGZ1bmN0aW9uKCRlbGVtKXtcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSB7XG4gICAgICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICdXZWJraXRUcmFuc2l0aW9uJzogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgJ01velRyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAnT1RyYW5zaXRpb24nOiAnb3RyYW5zaXRpb25lbmQnXG4gICAgfTtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBlbmQ7XG5cbiAgICBmb3IgKHZhciB0IGluIHRyYW5zaXRpb25zKXtcbiAgICAgIGlmICh0eXBlb2YgZWxlbS5zdHlsZVt0XSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICBlbmQgPSB0cmFuc2l0aW9uc1t0XTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoZW5kKXtcbiAgICAgIHJldHVybiBlbmQ7XG4gICAgfWVsc2V7XG4gICAgICBlbmQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICRlbGVtLnRyaWdnZXJIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgWyRlbGVtXSk7XG4gICAgICB9LCAxKTtcbiAgICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG4gICAgfVxuICB9XG59O1xuXG5Gb3VuZGF0aW9uLnV0aWwgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiBmb3IgYXBwbHlpbmcgYSBkZWJvdW5jZSBlZmZlY3QgdG8gYSBmdW5jdGlvbiBjYWxsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhdCBlbmQgb2YgdGltZW91dC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IC0gVGltZSBpbiBtcyB0byBkZWxheSB0aGUgY2FsbCBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIGZ1bmN0aW9uXG4gICAqL1xuICB0aHJvdHRsZTogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5KSB7XG4gICAgdmFyIHRpbWVyID0gbnVsbDtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIGlmICh0aW1lciA9PT0gbnVsbCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxuLy8gVE9ETzogY29uc2lkZXIgbm90IG1ha2luZyB0aGlzIGEgalF1ZXJ5IGZ1bmN0aW9uXG4vLyBUT0RPOiBuZWVkIHdheSB0byByZWZsb3cgdnMuIHJlLWluaXRpYWxpemVcbi8qKlxuICogVGhlIEZvdW5kYXRpb24galF1ZXJ5IG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXRob2QgLSBBbiBhY3Rpb24gdG8gcGVyZm9ybSBvbiB0aGUgY3VycmVudCBqUXVlcnkgb2JqZWN0LlxuICovXG52YXIgZm91bmRhdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBtZXRob2QsXG4gICAgICAkbWV0YSA9ICQoJ21ldGEuZm91bmRhdGlvbi1tcScpLFxuICAgICAgJG5vSlMgPSAkKCcubm8tanMnKTtcblxuICBpZighJG1ldGEubGVuZ3RoKXtcbiAgICAkKCc8bWV0YSBjbGFzcz1cImZvdW5kYXRpb24tbXFcIj4nKS5hcHBlbmRUbyhkb2N1bWVudC5oZWFkKTtcbiAgfVxuICBpZigkbm9KUy5sZW5ndGgpe1xuICAgICRub0pTLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICB9XG5cbiAgaWYodHlwZSA9PT0gJ3VuZGVmaW5lZCcpey8vbmVlZHMgdG8gaW5pdGlhbGl6ZSB0aGUgRm91bmRhdGlvbiBvYmplY3QsIG9yIGFuIGluZGl2aWR1YWwgcGx1Z2luLlxuICAgIEZvdW5kYXRpb24uTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgIEZvdW5kYXRpb24ucmVmbG93KHRoaXMpO1xuICB9ZWxzZSBpZih0eXBlID09PSAnc3RyaW5nJyl7Ly9hbiBpbmRpdmlkdWFsIG1ldGhvZCB0byBpbnZva2Ugb24gYSBwbHVnaW4gb3IgZ3JvdXAgb2YgcGx1Z2luc1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTsvL2NvbGxlY3QgYWxsIHRoZSBhcmd1bWVudHMsIGlmIG5lY2Vzc2FyeVxuICAgIHZhciBwbHVnQ2xhc3MgPSB0aGlzLmRhdGEoJ3pmUGx1Z2luJyk7Ly9kZXRlcm1pbmUgdGhlIGNsYXNzIG9mIHBsdWdpblxuXG4gICAgaWYocGx1Z0NsYXNzICE9PSB1bmRlZmluZWQgJiYgcGx1Z0NsYXNzW21ldGhvZF0gIT09IHVuZGVmaW5lZCl7Ly9tYWtlIHN1cmUgYm90aCB0aGUgY2xhc3MgYW5kIG1ldGhvZCBleGlzdFxuICAgICAgaWYodGhpcy5sZW5ndGggPT09IDEpey8vaWYgdGhlcmUncyBvbmx5IG9uZSwgY2FsbCBpdCBkaXJlY3RseS5cbiAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseShwbHVnQ2xhc3MsIGFyZ3MpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBlbCl7Ly9vdGhlcndpc2UgbG9vcCB0aHJvdWdoIHRoZSBqUXVlcnkgY29sbGVjdGlvbiBhbmQgaW52b2tlIHRoZSBtZXRob2Qgb24gZWFjaFxuICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KCQoZWwpLmRhdGEoJ3pmUGx1Z2luJyksIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9ZWxzZXsvL2Vycm9yIGZvciBubyBjbGFzcyBvciBubyBtZXRob2RcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlJ3JlIHNvcnJ5LCAnXCIgKyBtZXRob2QgKyBcIicgaXMgbm90IGFuIGF2YWlsYWJsZSBtZXRob2QgZm9yIFwiICsgKHBsdWdDbGFzcyA/IGZ1bmN0aW9uTmFtZShwbHVnQ2xhc3MpIDogJ3RoaXMgZWxlbWVudCcpICsgJy4nKTtcbiAgICB9XG4gIH1lbHNley8vZXJyb3IgZm9yIGludmFsaWQgYXJndW1lbnQgdHlwZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdlJ3JlIHNvcnJ5LCAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlci4gWW91IG11c3QgdXNlIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWV0aG9kIHlvdSB3aXNoIHRvIGludm9rZS5gKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbndpbmRvdy5Gb3VuZGF0aW9uID0gRm91bmRhdGlvbjtcbiQuZm4uZm91bmRhdGlvbiA9IGZvdW5kYXRpb247XG5cbi8vIFBvbHlmaWxsIGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbihmdW5jdGlvbigpIHtcbiAgaWYgKCFEYXRlLm5vdyB8fCAhd2luZG93LkRhdGUubm93KVxuICAgIHdpbmRvdy5EYXRlLm5vdyA9IERhdGUubm93ID0gZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfTtcblxuICB2YXIgdmVuZG9ycyA9IFsnd2Via2l0JywgJ21veiddO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK2kpIHtcbiAgICAgIHZhciB2cCA9IHZlbmRvcnNbaV07XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZwKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9ICh3aW5kb3dbdnArJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2cCsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ10pO1xuICB9XG4gIGlmICgvaVAoYWR8aG9uZXxvZCkuKk9TIDYvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgfHwgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgbmV4dFRpbWUgPSBNYXRoLm1heChsYXN0VGltZSArIDE2LCBub3cpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2sobGFzdFRpbWUgPSBuZXh0VGltZSk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRUaW1lIC0gbm93KTtcbiAgICB9O1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNsZWFyVGltZW91dDtcbiAgfVxuICAvKipcbiAgICogUG9seWZpbGwgZm9yIHBlcmZvcm1hbmNlLm5vdywgcmVxdWlyZWQgYnkgckFGXG4gICAqL1xuICBpZighd2luZG93LnBlcmZvcm1hbmNlIHx8ICF3aW5kb3cucGVyZm9ybWFuY2Uubm93KXtcbiAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7XG4gICAgICBzdGFydDogRGF0ZS5ub3coKSxcbiAgICAgIG5vdzogZnVuY3Rpb24oKXsgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLnN0YXJ0OyB9XG4gICAgfTtcbiAgfVxufSkoKTtcbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvVGhpcykge1xuICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1XG4gICAgICAvLyBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgIH1cblxuICAgIHZhciBhQXJncyAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgICAgPSBmdW5jdGlvbigpIHt9LFxuICAgICAgICBmQm91bmQgID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1BcbiAgICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICBpZiAodGhpcy5wcm90b3R5cGUpIHtcbiAgICAgIC8vIG5hdGl2ZSBmdW5jdGlvbnMgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZVxuICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xufVxuLy8gUG9seWZpbGwgdG8gZ2V0IHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24gaW4gSUU5XG5mdW5jdGlvbiBmdW5jdGlvbk5hbWUoZm4pIHtcbiAgaWYgKEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvblxccyhbXihdezEsfSlcXCgvO1xuICAgIHZhciByZXN1bHRzID0gKGZ1bmNOYW1lUmVnZXgpLmV4ZWMoKGZuKS50b1N0cmluZygpKTtcbiAgICByZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0udHJpbSgpIDogXCJcIjtcbiAgfVxuICBlbHNlIGlmIChmbi5wcm90b3R5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmbi5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmbi5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZShzdHIpe1xuICBpZigvdHJ1ZS8udGVzdChzdHIpKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZigvZmFsc2UvLnRlc3Qoc3RyKSkgcmV0dXJuIGZhbHNlO1xuICBlbHNlIGlmKCFpc05hTihzdHIgKiAxKSkgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cbi8vIENvbnZlcnQgUGFzY2FsQ2FzZSB0byBrZWJhYi1jYXNlXG4vLyBUaGFuayB5b3U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg5NTU1ODBcbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG59KGpRdWVyeSk7XG4iLCIvKiEgalF1ZXJ5IFZhbGlkYXRpb24gUGx1Z2luIC0gdjEuMTYuMCAtIDEyLzIvMjAxNlxuICogaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL1xuICogQ29weXJpZ2h0IChjKSAyMDE2IErDtnJuIFphZWZmZXJlcjsgTGljZW5zZWQgTUlUICovXG4hZnVuY3Rpb24oYSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJqcXVlcnlcIl0sYSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YShyZXF1aXJlKFwianF1ZXJ5XCIpKTphKGpRdWVyeSl9KGZ1bmN0aW9uKGEpe2EuZXh0ZW5kKGEuZm4se3ZhbGlkYXRlOmZ1bmN0aW9uKGIpe2lmKCF0aGlzLmxlbmd0aClyZXR1cm4gdm9pZChiJiZiLmRlYnVnJiZ3aW5kb3cuY29uc29sZSYmY29uc29sZS53YXJuKFwiTm90aGluZyBzZWxlY3RlZCwgY2FuJ3QgdmFsaWRhdGUsIHJldHVybmluZyBub3RoaW5nLlwiKSk7dmFyIGM9YS5kYXRhKHRoaXNbMF0sXCJ2YWxpZGF0b3JcIik7cmV0dXJuIGM/YzoodGhpcy5hdHRyKFwibm92YWxpZGF0ZVwiLFwibm92YWxpZGF0ZVwiKSxjPW5ldyBhLnZhbGlkYXRvcihiLHRoaXNbMF0pLGEuZGF0YSh0aGlzWzBdLFwidmFsaWRhdG9yXCIsYyksYy5zZXR0aW5ncy5vbnN1Ym1pdCYmKHRoaXMub24oXCJjbGljay52YWxpZGF0ZVwiLFwiOnN1Ym1pdFwiLGZ1bmN0aW9uKGIpe2Muc2V0dGluZ3Muc3VibWl0SGFuZGxlciYmKGMuc3VibWl0QnV0dG9uPWIudGFyZ2V0KSxhKHRoaXMpLmhhc0NsYXNzKFwiY2FuY2VsXCIpJiYoYy5jYW5jZWxTdWJtaXQ9ITApLHZvaWQgMCE9PWEodGhpcykuYXR0cihcImZvcm1ub3ZhbGlkYXRlXCIpJiYoYy5jYW5jZWxTdWJtaXQ9ITApfSksdGhpcy5vbihcInN1Ym1pdC52YWxpZGF0ZVwiLGZ1bmN0aW9uKGIpe2Z1bmN0aW9uIGQoKXt2YXIgZCxlO3JldHVybiFjLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXJ8fChjLnN1Ym1pdEJ1dHRvbiYmKGQ9YShcIjxpbnB1dCB0eXBlPSdoaWRkZW4nLz5cIikuYXR0cihcIm5hbWVcIixjLnN1Ym1pdEJ1dHRvbi5uYW1lKS52YWwoYShjLnN1Ym1pdEJ1dHRvbikudmFsKCkpLmFwcGVuZFRvKGMuY3VycmVudEZvcm0pKSxlPWMuc2V0dGluZ3Muc3VibWl0SGFuZGxlci5jYWxsKGMsYy5jdXJyZW50Rm9ybSxiKSxjLnN1Ym1pdEJ1dHRvbiYmZC5yZW1vdmUoKSx2b2lkIDAhPT1lJiZlKX1yZXR1cm4gYy5zZXR0aW5ncy5kZWJ1ZyYmYi5wcmV2ZW50RGVmYXVsdCgpLGMuY2FuY2VsU3VibWl0PyhjLmNhbmNlbFN1Ym1pdD0hMSxkKCkpOmMuZm9ybSgpP2MucGVuZGluZ1JlcXVlc3Q/KGMuZm9ybVN1Ym1pdHRlZD0hMCwhMSk6ZCgpOihjLmZvY3VzSW52YWxpZCgpLCExKX0pKSxjKX0sdmFsaWQ6ZnVuY3Rpb24oKXt2YXIgYixjLGQ7cmV0dXJuIGEodGhpc1swXSkuaXMoXCJmb3JtXCIpP2I9dGhpcy52YWxpZGF0ZSgpLmZvcm0oKTooZD1bXSxiPSEwLGM9YSh0aGlzWzBdLmZvcm0pLnZhbGlkYXRlKCksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7Yj1jLmVsZW1lbnQodGhpcykmJmIsYnx8KGQ9ZC5jb25jYXQoYy5lcnJvckxpc3QpKX0pLGMuZXJyb3JMaXN0PWQpLGJ9LHJ1bGVzOmZ1bmN0aW9uKGIsYyl7dmFyIGQsZSxmLGcsaCxpLGo9dGhpc1swXTtpZihudWxsIT1qJiZudWxsIT1qLmZvcm0pe2lmKGIpc3dpdGNoKGQ9YS5kYXRhKGouZm9ybSxcInZhbGlkYXRvclwiKS5zZXR0aW5ncyxlPWQucnVsZXMsZj1hLnZhbGlkYXRvci5zdGF0aWNSdWxlcyhqKSxiKXtjYXNlXCJhZGRcIjphLmV4dGVuZChmLGEudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoYykpLGRlbGV0ZSBmLm1lc3NhZ2VzLGVbai5uYW1lXT1mLGMubWVzc2FnZXMmJihkLm1lc3NhZ2VzW2oubmFtZV09YS5leHRlbmQoZC5tZXNzYWdlc1tqLm5hbWVdLGMubWVzc2FnZXMpKTticmVhaztjYXNlXCJyZW1vdmVcIjpyZXR1cm4gYz8oaT17fSxhLmVhY2goYy5zcGxpdCgvXFxzLyksZnVuY3Rpb24oYixjKXtpW2NdPWZbY10sZGVsZXRlIGZbY10sXCJyZXF1aXJlZFwiPT09YyYmYShqKS5yZW1vdmVBdHRyKFwiYXJpYS1yZXF1aXJlZFwiKX0pLGkpOihkZWxldGUgZVtqLm5hbWVdLGYpfXJldHVybiBnPWEudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGVzKGEuZXh0ZW5kKHt9LGEudmFsaWRhdG9yLmNsYXNzUnVsZXMoaiksYS52YWxpZGF0b3IuYXR0cmlidXRlUnVsZXMoaiksYS52YWxpZGF0b3IuZGF0YVJ1bGVzKGopLGEudmFsaWRhdG9yLnN0YXRpY1J1bGVzKGopKSxqKSxnLnJlcXVpcmVkJiYoaD1nLnJlcXVpcmVkLGRlbGV0ZSBnLnJlcXVpcmVkLGc9YS5leHRlbmQoe3JlcXVpcmVkOmh9LGcpLGEoaikuYXR0cihcImFyaWEtcmVxdWlyZWRcIixcInRydWVcIikpLGcucmVtb3RlJiYoaD1nLnJlbW90ZSxkZWxldGUgZy5yZW1vdGUsZz1hLmV4dGVuZChnLHtyZW1vdGU6aH0pKSxnfX19KSxhLmV4dGVuZChhLmV4cHIucHNldWRvc3x8YS5leHByW1wiOlwiXSx7Ymxhbms6ZnVuY3Rpb24oYil7cmV0dXJuIWEudHJpbShcIlwiK2EoYikudmFsKCkpfSxmaWxsZWQ6ZnVuY3Rpb24oYil7dmFyIGM9YShiKS52YWwoKTtyZXR1cm4gbnVsbCE9PWMmJiEhYS50cmltKFwiXCIrYyl9LHVuY2hlY2tlZDpmdW5jdGlvbihiKXtyZXR1cm4hYShiKS5wcm9wKFwiY2hlY2tlZFwiKX19KSxhLnZhbGlkYXRvcj1mdW5jdGlvbihiLGMpe3RoaXMuc2V0dGluZ3M9YS5leHRlbmQoITAse30sYS52YWxpZGF0b3IuZGVmYXVsdHMsYiksdGhpcy5jdXJyZW50Rm9ybT1jLHRoaXMuaW5pdCgpfSxhLnZhbGlkYXRvci5mb3JtYXQ9ZnVuY3Rpb24oYixjKXtyZXR1cm4gMT09PWFyZ3VtZW50cy5sZW5ndGg/ZnVuY3Rpb24oKXt2YXIgYz1hLm1ha2VBcnJheShhcmd1bWVudHMpO3JldHVybiBjLnVuc2hpZnQoYiksYS52YWxpZGF0b3IuZm9ybWF0LmFwcGx5KHRoaXMsYyl9OnZvaWQgMD09PWM/YjooYXJndW1lbnRzLmxlbmd0aD4yJiZjLmNvbnN0cnVjdG9yIT09QXJyYXkmJihjPWEubWFrZUFycmF5KGFyZ3VtZW50cykuc2xpY2UoMSkpLGMuY29uc3RydWN0b3IhPT1BcnJheSYmKGM9W2NdKSxhLmVhY2goYyxmdW5jdGlvbihhLGMpe2I9Yi5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxce1wiK2ErXCJcXFxcfVwiLFwiZ1wiKSxmdW5jdGlvbigpe3JldHVybiBjfSl9KSxiKX0sYS5leHRlbmQoYS52YWxpZGF0b3Ise2RlZmF1bHRzOnttZXNzYWdlczp7fSxncm91cHM6e30scnVsZXM6e30sZXJyb3JDbGFzczpcImVycm9yXCIscGVuZGluZ0NsYXNzOlwicGVuZGluZ1wiLHZhbGlkQ2xhc3M6XCJ2YWxpZFwiLGVycm9yRWxlbWVudDpcImxhYmVsXCIsZm9jdXNDbGVhbnVwOiExLGZvY3VzSW52YWxpZDohMCxlcnJvckNvbnRhaW5lcjphKFtdKSxlcnJvckxhYmVsQ29udGFpbmVyOmEoW10pLG9uc3VibWl0OiEwLGlnbm9yZTpcIjpoaWRkZW5cIixpZ25vcmVUaXRsZTohMSxvbmZvY3VzaW46ZnVuY3Rpb24oYSl7dGhpcy5sYXN0QWN0aXZlPWEsdGhpcy5zZXR0aW5ncy5mb2N1c0NsZWFudXAmJih0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0JiZ0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwodGhpcyxhLHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyx0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MpLHRoaXMuaGlkZVRoZXNlKHRoaXMuZXJyb3JzRm9yKGEpKSl9LG9uZm9jdXNvdXQ6ZnVuY3Rpb24oYSl7dGhpcy5jaGVja2FibGUoYSl8fCEoYS5uYW1lIGluIHRoaXMuc3VibWl0dGVkKSYmdGhpcy5vcHRpb25hbChhKXx8dGhpcy5lbGVtZW50KGEpfSxvbmtleXVwOmZ1bmN0aW9uKGIsYyl7dmFyIGQ9WzE2LDE3LDE4LDIwLDM1LDM2LDM3LDM4LDM5LDQwLDQ1LDE0NCwyMjVdOzk9PT1jLndoaWNoJiZcIlwiPT09dGhpcy5lbGVtZW50VmFsdWUoYil8fGEuaW5BcnJheShjLmtleUNvZGUsZCkhPT0tMXx8KGIubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZHx8Yi5uYW1lIGluIHRoaXMuaW52YWxpZCkmJnRoaXMuZWxlbWVudChiKX0sb25jbGljazpmdW5jdGlvbihhKXthLm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQ/dGhpcy5lbGVtZW50KGEpOmEucGFyZW50Tm9kZS5uYW1lIGluIHRoaXMuc3VibWl0dGVkJiZ0aGlzLmVsZW1lbnQoYS5wYXJlbnROb2RlKX0saGlnaGxpZ2h0OmZ1bmN0aW9uKGIsYyxkKXtcInJhZGlvXCI9PT1iLnR5cGU/dGhpcy5maW5kQnlOYW1lKGIubmFtZSkuYWRkQ2xhc3MoYykucmVtb3ZlQ2xhc3MoZCk6YShiKS5hZGRDbGFzcyhjKS5yZW1vdmVDbGFzcyhkKX0sdW5oaWdobGlnaHQ6ZnVuY3Rpb24oYixjLGQpe1wicmFkaW9cIj09PWIudHlwZT90aGlzLmZpbmRCeU5hbWUoYi5uYW1lKS5yZW1vdmVDbGFzcyhjKS5hZGRDbGFzcyhkKTphKGIpLnJlbW92ZUNsYXNzKGMpLmFkZENsYXNzKGQpfX0sc2V0RGVmYXVsdHM6ZnVuY3Rpb24oYil7YS5leHRlbmQoYS52YWxpZGF0b3IuZGVmYXVsdHMsYil9LG1lc3NhZ2VzOntyZXF1aXJlZDpcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCIscmVtb3RlOlwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiLGVtYWlsOlwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIix1cmw6XCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwuXCIsZGF0ZTpcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIsZGF0ZUlTTzpcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUgKElTTykuXCIsbnVtYmVyOlwiUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyLlwiLGRpZ2l0czpcIlBsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy5cIixlcXVhbFRvOlwiUGxlYXNlIGVudGVyIHRoZSBzYW1lIHZhbHVlIGFnYWluLlwiLG1heGxlbmd0aDphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgbm8gbW9yZSB0aGFuIHswfSBjaGFyYWN0ZXJzLlwiKSxtaW5sZW5ndGg6YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiKSxyYW5nZWxlbmd0aDphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9IGNoYXJhY3RlcnMgbG9uZy5cIikscmFuZ2U6YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfS5cIiksbWF4OmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIpLG1pbjphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiKSxzdGVwOmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIG11bHRpcGxlIG9mIHswfS5cIil9LGF1dG9DcmVhdGVSYW5nZXM6ITEscHJvdG90eXBlOntpbml0OmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihiKXshdGhpcy5mb3JtJiZ0aGlzLmhhc0F0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiKSYmKHRoaXMuZm9ybT1hKHRoaXMpLmNsb3Nlc3QoXCJmb3JtXCIpWzBdKTt2YXIgYz1hLmRhdGEodGhpcy5mb3JtLFwidmFsaWRhdG9yXCIpLGQ9XCJvblwiK2IudHlwZS5yZXBsYWNlKC9edmFsaWRhdGUvLFwiXCIpLGU9Yy5zZXR0aW5ncztlW2RdJiYhYSh0aGlzKS5pcyhlLmlnbm9yZSkmJmVbZF0uY2FsbChjLHRoaXMsYil9dGhpcy5sYWJlbENvbnRhaW5lcj1hKHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciksdGhpcy5lcnJvckNvbnRleHQ9dGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGgmJnRoaXMubGFiZWxDb250YWluZXJ8fGEodGhpcy5jdXJyZW50Rm9ybSksdGhpcy5jb250YWluZXJzPWEodGhpcy5zZXR0aW5ncy5lcnJvckNvbnRhaW5lcikuYWRkKHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciksdGhpcy5zdWJtaXR0ZWQ9e30sdGhpcy52YWx1ZUNhY2hlPXt9LHRoaXMucGVuZGluZ1JlcXVlc3Q9MCx0aGlzLnBlbmRpbmc9e30sdGhpcy5pbnZhbGlkPXt9LHRoaXMucmVzZXQoKTt2YXIgYyxkPXRoaXMuZ3JvdXBzPXt9O2EuZWFjaCh0aGlzLnNldHRpbmdzLmdyb3VwcyxmdW5jdGlvbihiLGMpe1wic3RyaW5nXCI9PXR5cGVvZiBjJiYoYz1jLnNwbGl0KC9cXHMvKSksYS5lYWNoKGMsZnVuY3Rpb24oYSxjKXtkW2NdPWJ9KX0pLGM9dGhpcy5zZXR0aW5ncy5ydWxlcyxhLmVhY2goYyxmdW5jdGlvbihiLGQpe2NbYl09YS52YWxpZGF0b3Iubm9ybWFsaXplUnVsZShkKX0pLGEodGhpcy5jdXJyZW50Rm9ybSkub24oXCJmb2N1c2luLnZhbGlkYXRlIGZvY3Vzb3V0LnZhbGlkYXRlIGtleXVwLnZhbGlkYXRlXCIsXCI6dGV4dCwgW3R5cGU9J3Bhc3N3b3JkJ10sIFt0eXBlPSdmaWxlJ10sIHNlbGVjdCwgdGV4dGFyZWEsIFt0eXBlPSdudW1iZXInXSwgW3R5cGU9J3NlYXJjaCddLCBbdHlwZT0ndGVsJ10sIFt0eXBlPSd1cmwnXSwgW3R5cGU9J2VtYWlsJ10sIFt0eXBlPSdkYXRldGltZSddLCBbdHlwZT0nZGF0ZSddLCBbdHlwZT0nbW9udGgnXSwgW3R5cGU9J3dlZWsnXSwgW3R5cGU9J3RpbWUnXSwgW3R5cGU9J2RhdGV0aW1lLWxvY2FsJ10sIFt0eXBlPSdyYW5nZSddLCBbdHlwZT0nY29sb3InXSwgW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddLCBbY29udGVudGVkaXRhYmxlXSwgW3R5cGU9J2J1dHRvbiddXCIsYikub24oXCJjbGljay52YWxpZGF0ZVwiLFwic2VsZWN0LCBvcHRpb24sIFt0eXBlPSdyYWRpbyddLCBbdHlwZT0nY2hlY2tib3gnXVwiLGIpLHRoaXMuc2V0dGluZ3MuaW52YWxpZEhhbmRsZXImJmEodGhpcy5jdXJyZW50Rm9ybSkub24oXCJpbnZhbGlkLWZvcm0udmFsaWRhdGVcIix0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyKSxhKHRoaXMuY3VycmVudEZvcm0pLmZpbmQoXCJbcmVxdWlyZWRdLCBbZGF0YS1ydWxlLXJlcXVpcmVkXSwgLnJlcXVpcmVkXCIpLmF0dHIoXCJhcmlhLXJlcXVpcmVkXCIsXCJ0cnVlXCIpfSxmb3JtOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hlY2tGb3JtKCksYS5leHRlbmQodGhpcy5zdWJtaXR0ZWQsdGhpcy5lcnJvck1hcCksdGhpcy5pbnZhbGlkPWEuZXh0ZW5kKHt9LHRoaXMuZXJyb3JNYXApLHRoaXMudmFsaWQoKXx8YSh0aGlzLmN1cnJlbnRGb3JtKS50cmlnZ2VySGFuZGxlcihcImludmFsaWQtZm9ybVwiLFt0aGlzXSksdGhpcy5zaG93RXJyb3JzKCksdGhpcy52YWxpZCgpfSxjaGVja0Zvcm06ZnVuY3Rpb24oKXt0aGlzLnByZXBhcmVGb3JtKCk7Zm9yKHZhciBhPTAsYj10aGlzLmN1cnJlbnRFbGVtZW50cz10aGlzLmVsZW1lbnRzKCk7YlthXTthKyspdGhpcy5jaGVjayhiW2FdKTtyZXR1cm4gdGhpcy52YWxpZCgpfSxlbGVtZW50OmZ1bmN0aW9uKGIpe3ZhciBjLGQsZT10aGlzLmNsZWFuKGIpLGY9dGhpcy52YWxpZGF0aW9uVGFyZ2V0Rm9yKGUpLGc9dGhpcyxoPSEwO3JldHVybiB2b2lkIDA9PT1mP2RlbGV0ZSB0aGlzLmludmFsaWRbZS5uYW1lXToodGhpcy5wcmVwYXJlRWxlbWVudChmKSx0aGlzLmN1cnJlbnRFbGVtZW50cz1hKGYpLGQ9dGhpcy5ncm91cHNbZi5uYW1lXSxkJiZhLmVhY2godGhpcy5ncm91cHMsZnVuY3Rpb24oYSxiKXtiPT09ZCYmYSE9PWYubmFtZSYmKGU9Zy52YWxpZGF0aW9uVGFyZ2V0Rm9yKGcuY2xlYW4oZy5maW5kQnlOYW1lKGEpKSksZSYmZS5uYW1lIGluIGcuaW52YWxpZCYmKGcuY3VycmVudEVsZW1lbnRzLnB1c2goZSksaD1nLmNoZWNrKGUpJiZoKSl9KSxjPXRoaXMuY2hlY2soZikhPT0hMSxoPWgmJmMsYz90aGlzLmludmFsaWRbZi5uYW1lXT0hMTp0aGlzLmludmFsaWRbZi5uYW1lXT0hMCx0aGlzLm51bWJlck9mSW52YWxpZHMoKXx8KHRoaXMudG9IaWRlPXRoaXMudG9IaWRlLmFkZCh0aGlzLmNvbnRhaW5lcnMpKSx0aGlzLnNob3dFcnJvcnMoKSxhKGIpLmF0dHIoXCJhcmlhLWludmFsaWRcIiwhYykpLGh9LHNob3dFcnJvcnM6ZnVuY3Rpb24oYil7aWYoYil7dmFyIGM9dGhpczthLmV4dGVuZCh0aGlzLmVycm9yTWFwLGIpLHRoaXMuZXJyb3JMaXN0PWEubWFwKHRoaXMuZXJyb3JNYXAsZnVuY3Rpb24oYSxiKXtyZXR1cm57bWVzc2FnZTphLGVsZW1lbnQ6Yy5maW5kQnlOYW1lKGIpWzBdfX0pLHRoaXMuc3VjY2Vzc0xpc3Q9YS5ncmVwKHRoaXMuc3VjY2Vzc0xpc3QsZnVuY3Rpb24oYSl7cmV0dXJuIShhLm5hbWUgaW4gYil9KX10aGlzLnNldHRpbmdzLnNob3dFcnJvcnM/dGhpcy5zZXR0aW5ncy5zaG93RXJyb3JzLmNhbGwodGhpcyx0aGlzLmVycm9yTWFwLHRoaXMuZXJyb3JMaXN0KTp0aGlzLmRlZmF1bHRTaG93RXJyb3JzKCl9LHJlc2V0Rm9ybTpmdW5jdGlvbigpe2EuZm4ucmVzZXRGb3JtJiZhKHRoaXMuY3VycmVudEZvcm0pLnJlc2V0Rm9ybSgpLHRoaXMuaW52YWxpZD17fSx0aGlzLnN1Ym1pdHRlZD17fSx0aGlzLnByZXBhcmVGb3JtKCksdGhpcy5oaWRlRXJyb3JzKCk7dmFyIGI9dGhpcy5lbGVtZW50cygpLnJlbW92ZURhdGEoXCJwcmV2aW91c1ZhbHVlXCIpLnJlbW92ZUF0dHIoXCJhcmlhLWludmFsaWRcIik7dGhpcy5yZXNldEVsZW1lbnRzKGIpfSxyZXNldEVsZW1lbnRzOmZ1bmN0aW9uKGEpe3ZhciBiO2lmKHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQpZm9yKGI9MDthW2JdO2IrKyl0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwodGhpcyxhW2JdLHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyxcIlwiKSx0aGlzLmZpbmRCeU5hbWUoYVtiXS5uYW1lKS5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MpO2Vsc2UgYS5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyl9LG51bWJlck9mSW52YWxpZHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vYmplY3RMZW5ndGgodGhpcy5pbnZhbGlkKX0sb2JqZWN0TGVuZ3RoOmZ1bmN0aW9uKGEpe3ZhciBiLGM9MDtmb3IoYiBpbiBhKWFbYl0mJmMrKztyZXR1cm4gY30saGlkZUVycm9yczpmdW5jdGlvbigpe3RoaXMuaGlkZVRoZXNlKHRoaXMudG9IaWRlKX0saGlkZVRoZXNlOmZ1bmN0aW9uKGEpe2Eubm90KHRoaXMuY29udGFpbmVycykudGV4dChcIlwiKSx0aGlzLmFkZFdyYXBwZXIoYSkuaGlkZSgpfSx2YWxpZDpmdW5jdGlvbigpe3JldHVybiAwPT09dGhpcy5zaXplKCl9LHNpemU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lcnJvckxpc3QubGVuZ3RofSxmb2N1c0ludmFsaWQ6ZnVuY3Rpb24oKXtpZih0aGlzLnNldHRpbmdzLmZvY3VzSW52YWxpZCl0cnl7YSh0aGlzLmZpbmRMYXN0QWN0aXZlKCl8fHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCYmdGhpcy5lcnJvckxpc3RbMF0uZWxlbWVudHx8W10pLmZpbHRlcihcIjp2aXNpYmxlXCIpLmZvY3VzKCkudHJpZ2dlcihcImZvY3VzaW5cIil9Y2F0Y2goYil7fX0sZmluZExhc3RBY3RpdmU6ZnVuY3Rpb24oKXt2YXIgYj10aGlzLmxhc3RBY3RpdmU7cmV0dXJuIGImJjE9PT1hLmdyZXAodGhpcy5lcnJvckxpc3QsZnVuY3Rpb24oYSl7cmV0dXJuIGEuZWxlbWVudC5uYW1lPT09Yi5uYW1lfSkubGVuZ3RoJiZifSxlbGVtZW50czpmdW5jdGlvbigpe3ZhciBiPXRoaXMsYz17fTtyZXR1cm4gYSh0aGlzLmN1cnJlbnRGb3JtKS5maW5kKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFtjb250ZW50ZWRpdGFibGVdXCIpLm5vdChcIjpzdWJtaXQsIDpyZXNldCwgOmltYWdlLCA6ZGlzYWJsZWRcIikubm90KHRoaXMuc2V0dGluZ3MuaWdub3JlKS5maWx0ZXIoZnVuY3Rpb24oKXt2YXIgZD10aGlzLm5hbWV8fGEodGhpcykuYXR0cihcIm5hbWVcIik7cmV0dXJuIWQmJmIuc2V0dGluZ3MuZGVidWcmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLmVycm9yKFwiJW8gaGFzIG5vIG5hbWUgYXNzaWduZWRcIix0aGlzKSx0aGlzLmhhc0F0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiKSYmKHRoaXMuZm9ybT1hKHRoaXMpLmNsb3Nlc3QoXCJmb3JtXCIpWzBdKSwhKGQgaW4gY3x8IWIub2JqZWN0TGVuZ3RoKGEodGhpcykucnVsZXMoKSkpJiYoY1tkXT0hMCwhMCl9KX0sY2xlYW46ZnVuY3Rpb24oYil7cmV0dXJuIGEoYilbMF19LGVycm9yczpmdW5jdGlvbigpe3ZhciBiPXRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcy5zcGxpdChcIiBcIikuam9pbihcIi5cIik7cmV0dXJuIGEodGhpcy5zZXR0aW5ncy5lcnJvckVsZW1lbnQrXCIuXCIrYix0aGlzLmVycm9yQ29udGV4dCl9LHJlc2V0SW50ZXJuYWxzOmZ1bmN0aW9uKCl7dGhpcy5zdWNjZXNzTGlzdD1bXSx0aGlzLmVycm9yTGlzdD1bXSx0aGlzLmVycm9yTWFwPXt9LHRoaXMudG9TaG93PWEoW10pLHRoaXMudG9IaWRlPWEoW10pfSxyZXNldDpmdW5jdGlvbigpe3RoaXMucmVzZXRJbnRlcm5hbHMoKSx0aGlzLmN1cnJlbnRFbGVtZW50cz1hKFtdKX0scHJlcGFyZUZvcm06ZnVuY3Rpb24oKXt0aGlzLnJlc2V0KCksdGhpcy50b0hpZGU9dGhpcy5lcnJvcnMoKS5hZGQodGhpcy5jb250YWluZXJzKX0scHJlcGFyZUVsZW1lbnQ6ZnVuY3Rpb24oYSl7dGhpcy5yZXNldCgpLHRoaXMudG9IaWRlPXRoaXMuZXJyb3JzRm9yKGEpfSxlbGVtZW50VmFsdWU6ZnVuY3Rpb24oYil7dmFyIGMsZCxlPWEoYiksZj1iLnR5cGU7cmV0dXJuXCJyYWRpb1wiPT09Znx8XCJjaGVja2JveFwiPT09Zj90aGlzLmZpbmRCeU5hbWUoYi5uYW1lKS5maWx0ZXIoXCI6Y2hlY2tlZFwiKS52YWwoKTpcIm51bWJlclwiPT09ZiYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGIudmFsaWRpdHk/Yi52YWxpZGl0eS5iYWRJbnB1dD9cIk5hTlwiOmUudmFsKCk6KGM9Yi5oYXNBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIik/ZS50ZXh0KCk6ZS52YWwoKSxcImZpbGVcIj09PWY/XCJDOlxcXFxmYWtlcGF0aFxcXFxcIj09PWMuc3Vic3RyKDAsMTIpP2Muc3Vic3RyKDEyKTooZD1jLmxhc3RJbmRleE9mKFwiL1wiKSxkPj0wP2Muc3Vic3RyKGQrMSk6KGQ9Yy5sYXN0SW5kZXhPZihcIlxcXFxcIiksZD49MD9jLnN1YnN0cihkKzEpOmMpKTpcInN0cmluZ1wiPT10eXBlb2YgYz9jLnJlcGxhY2UoL1xcci9nLFwiXCIpOmMpfSxjaGVjazpmdW5jdGlvbihiKXtiPXRoaXMudmFsaWRhdGlvblRhcmdldEZvcih0aGlzLmNsZWFuKGIpKTt2YXIgYyxkLGUsZj1hKGIpLnJ1bGVzKCksZz1hLm1hcChmLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGJ9KS5sZW5ndGgsaD0hMSxpPXRoaXMuZWxlbWVudFZhbHVlKGIpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGYubm9ybWFsaXplcil7aWYoaT1mLm5vcm1hbGl6ZXIuY2FsbChiLGkpLFwic3RyaW5nXCIhPXR5cGVvZiBpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbm9ybWFsaXplciBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIHZhbHVlLlwiKTtkZWxldGUgZi5ub3JtYWxpemVyfWZvcihkIGluIGYpe2U9e21ldGhvZDpkLHBhcmFtZXRlcnM6ZltkXX07dHJ5e2lmKGM9YS52YWxpZGF0b3IubWV0aG9kc1tkXS5jYWxsKHRoaXMsaSxiLGUucGFyYW1ldGVycyksXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI9PT1jJiYxPT09Zyl7aD0hMDtjb250aW51ZX1pZihoPSExLFwicGVuZGluZ1wiPT09YylyZXR1cm4gdm9pZCh0aGlzLnRvSGlkZT10aGlzLnRvSGlkZS5ub3QodGhpcy5lcnJvcnNGb3IoYikpKTtpZighYylyZXR1cm4gdGhpcy5mb3JtYXRBbmRBZGQoYixlKSwhMX1jYXRjaChqKXt0aHJvdyB0aGlzLnNldHRpbmdzLmRlYnVnJiZ3aW5kb3cuY29uc29sZSYmY29uc29sZS5sb2coXCJFeGNlcHRpb24gb2NjdXJyZWQgd2hlbiBjaGVja2luZyBlbGVtZW50IFwiK2IuaWQrXCIsIGNoZWNrIHRoZSAnXCIrZS5tZXRob2QrXCInIG1ldGhvZC5cIixqKSxqIGluc3RhbmNlb2YgVHlwZUVycm9yJiYoai5tZXNzYWdlKz1cIi4gIEV4Y2VwdGlvbiBvY2N1cnJlZCB3aGVuIGNoZWNraW5nIGVsZW1lbnQgXCIrYi5pZCtcIiwgY2hlY2sgdGhlICdcIitlLm1ldGhvZCtcIicgbWV0aG9kLlwiKSxqfX1pZighaClyZXR1cm4gdGhpcy5vYmplY3RMZW5ndGgoZikmJnRoaXMuc3VjY2Vzc0xpc3QucHVzaChiKSwhMH0sY3VzdG9tRGF0YU1lc3NhZ2U6ZnVuY3Rpb24oYixjKXtyZXR1cm4gYShiKS5kYXRhKFwibXNnXCIrYy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStjLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKXx8YShiKS5kYXRhKFwibXNnXCIpfSxjdXN0b21NZXNzYWdlOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1thXTtyZXR1cm4gYyYmKGMuY29uc3RydWN0b3I9PT1TdHJpbmc/YzpjW2JdKX0sZmluZERlZmluZWQ6ZnVuY3Rpb24oKXtmb3IodmFyIGE9MDthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKWlmKHZvaWQgMCE9PWFyZ3VtZW50c1thXSlyZXR1cm4gYXJndW1lbnRzW2FdfSxkZWZhdWx0TWVzc2FnZTpmdW5jdGlvbihiLGMpe1wic3RyaW5nXCI9PXR5cGVvZiBjJiYoYz17bWV0aG9kOmN9KTt2YXIgZD10aGlzLmZpbmREZWZpbmVkKHRoaXMuY3VzdG9tTWVzc2FnZShiLm5hbWUsYy5tZXRob2QpLHRoaXMuY3VzdG9tRGF0YU1lc3NhZ2UoYixjLm1ldGhvZCksIXRoaXMuc2V0dGluZ3MuaWdub3JlVGl0bGUmJmIudGl0bGV8fHZvaWQgMCxhLnZhbGlkYXRvci5tZXNzYWdlc1tjLm1ldGhvZF0sXCI8c3Ryb25nPldhcm5pbmc6IE5vIG1lc3NhZ2UgZGVmaW5lZCBmb3IgXCIrYi5uYW1lK1wiPC9zdHJvbmc+XCIpLGU9L1xcJD9cXHsoXFxkKylcXH0vZztyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBkP2Q9ZC5jYWxsKHRoaXMsYy5wYXJhbWV0ZXJzLGIpOmUudGVzdChkKSYmKGQ9YS52YWxpZGF0b3IuZm9ybWF0KGQucmVwbGFjZShlLFwieyQxfVwiKSxjLnBhcmFtZXRlcnMpKSxkfSxmb3JtYXRBbmRBZGQ6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmRlZmF1bHRNZXNzYWdlKGEsYik7dGhpcy5lcnJvckxpc3QucHVzaCh7bWVzc2FnZTpjLGVsZW1lbnQ6YSxtZXRob2Q6Yi5tZXRob2R9KSx0aGlzLmVycm9yTWFwW2EubmFtZV09Yyx0aGlzLnN1Ym1pdHRlZFthLm5hbWVdPWN9LGFkZFdyYXBwZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuc2V0dGluZ3Mud3JhcHBlciYmKGE9YS5hZGQoYS5wYXJlbnQodGhpcy5zZXR0aW5ncy53cmFwcGVyKSkpLGF9LGRlZmF1bHRTaG93RXJyb3JzOmZ1bmN0aW9uKCl7dmFyIGEsYixjO2ZvcihhPTA7dGhpcy5lcnJvckxpc3RbYV07YSsrKWM9dGhpcy5lcnJvckxpc3RbYV0sdGhpcy5zZXR0aW5ncy5oaWdobGlnaHQmJnRoaXMuc2V0dGluZ3MuaGlnaGxpZ2h0LmNhbGwodGhpcyxjLmVsZW1lbnQsdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyksdGhpcy5zaG93TGFiZWwoYy5lbGVtZW50LGMubWVzc2FnZSk7aWYodGhpcy5lcnJvckxpc3QubGVuZ3RoJiYodGhpcy50b1Nob3c9dGhpcy50b1Nob3cuYWRkKHRoaXMuY29udGFpbmVycykpLHRoaXMuc2V0dGluZ3Muc3VjY2Vzcylmb3IoYT0wO3RoaXMuc3VjY2Vzc0xpc3RbYV07YSsrKXRoaXMuc2hvd0xhYmVsKHRoaXMuc3VjY2Vzc0xpc3RbYV0pO2lmKHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQpZm9yKGE9MCxiPXRoaXMudmFsaWRFbGVtZW50cygpO2JbYV07YSsrKXRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCh0aGlzLGJbYV0sdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyk7dGhpcy50b0hpZGU9dGhpcy50b0hpZGUubm90KHRoaXMudG9TaG93KSx0aGlzLmhpZGVFcnJvcnMoKSx0aGlzLmFkZFdyYXBwZXIodGhpcy50b1Nob3cpLnNob3coKX0sdmFsaWRFbGVtZW50czpmdW5jdGlvbigpe3JldHVybiB0aGlzLmN1cnJlbnRFbGVtZW50cy5ub3QodGhpcy5pbnZhbGlkRWxlbWVudHMoKSl9LGludmFsaWRFbGVtZW50czpmdW5jdGlvbigpe3JldHVybiBhKHRoaXMuZXJyb3JMaXN0KS5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50fSl9LHNob3dMYWJlbDpmdW5jdGlvbihiLGMpe3ZhciBkLGUsZixnLGg9dGhpcy5lcnJvcnNGb3IoYiksaT10aGlzLmlkT3JOYW1lKGIpLGo9YShiKS5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiKTtoLmxlbmd0aD8oaC5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyksaC5odG1sKGMpKTooaD1hKFwiPFwiK3RoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50K1wiPlwiKS5hdHRyKFwiaWRcIixpK1wiLWVycm9yXCIpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcykuaHRtbChjfHxcIlwiKSxkPWgsdGhpcy5zZXR0aW5ncy53cmFwcGVyJiYoZD1oLmhpZGUoKS5zaG93KCkud3JhcChcIjxcIit0aGlzLnNldHRpbmdzLndyYXBwZXIrXCIvPlwiKS5wYXJlbnQoKSksdGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGg/dGhpcy5sYWJlbENvbnRhaW5lci5hcHBlbmQoZCk6dGhpcy5zZXR0aW5ncy5lcnJvclBsYWNlbWVudD90aGlzLnNldHRpbmdzLmVycm9yUGxhY2VtZW50LmNhbGwodGhpcyxkLGEoYikpOmQuaW5zZXJ0QWZ0ZXIoYiksaC5pcyhcImxhYmVsXCIpP2guYXR0cihcImZvclwiLGkpOjA9PT1oLnBhcmVudHMoXCJsYWJlbFtmb3I9J1wiK3RoaXMuZXNjYXBlQ3NzTWV0YShpKStcIiddXCIpLmxlbmd0aCYmKGY9aC5hdHRyKFwiaWRcIiksaj9qLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcYlwiK3RoaXMuZXNjYXBlQ3NzTWV0YShmKStcIlxcXFxiXCIpKXx8KGorPVwiIFwiK2YpOmo9ZixhKGIpLmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsaiksZT10aGlzLmdyb3Vwc1tiLm5hbWVdLGUmJihnPXRoaXMsYS5lYWNoKGcuZ3JvdXBzLGZ1bmN0aW9uKGIsYyl7Yz09PWUmJmEoXCJbbmFtZT0nXCIrZy5lc2NhcGVDc3NNZXRhKGIpK1wiJ11cIixnLmN1cnJlbnRGb3JtKS5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLGguYXR0cihcImlkXCIpKX0pKSkpLCFjJiZ0aGlzLnNldHRpbmdzLnN1Y2Nlc3MmJihoLnRleHQoXCJcIiksXCJzdHJpbmdcIj09dHlwZW9mIHRoaXMuc2V0dGluZ3Muc3VjY2Vzcz9oLmFkZENsYXNzKHRoaXMuc2V0dGluZ3Muc3VjY2Vzcyk6dGhpcy5zZXR0aW5ncy5zdWNjZXNzKGgsYikpLHRoaXMudG9TaG93PXRoaXMudG9TaG93LmFkZChoKX0sZXJyb3JzRm9yOmZ1bmN0aW9uKGIpe3ZhciBjPXRoaXMuZXNjYXBlQ3NzTWV0YSh0aGlzLmlkT3JOYW1lKGIpKSxkPWEoYikuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiksZT1cImxhYmVsW2Zvcj0nXCIrYytcIiddLCBsYWJlbFtmb3I9J1wiK2MrXCInXSAqXCI7cmV0dXJuIGQmJihlPWUrXCIsICNcIit0aGlzLmVzY2FwZUNzc01ldGEoZCkucmVwbGFjZSgvXFxzKy9nLFwiLCAjXCIpKSx0aGlzLmVycm9ycygpLmZpbHRlcihlKX0sZXNjYXBlQ3NzTWV0YTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC8oW1xcXFwhXCIjJCUmJygpKissLi86Ozw9Pj9AXFxbXFxdXmB7fH1+XSkvZyxcIlxcXFwkMVwiKX0saWRPck5hbWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZ3JvdXBzW2EubmFtZV18fCh0aGlzLmNoZWNrYWJsZShhKT9hLm5hbWU6YS5pZHx8YS5uYW1lKX0sdmFsaWRhdGlvblRhcmdldEZvcjpmdW5jdGlvbihiKXtyZXR1cm4gdGhpcy5jaGVja2FibGUoYikmJihiPXRoaXMuZmluZEJ5TmFtZShiLm5hbWUpKSxhKGIpLm5vdCh0aGlzLnNldHRpbmdzLmlnbm9yZSlbMF19LGNoZWNrYWJsZTpmdW5jdGlvbihhKXtyZXR1cm4vcmFkaW98Y2hlY2tib3gvaS50ZXN0KGEudHlwZSl9LGZpbmRCeU5hbWU6ZnVuY3Rpb24oYil7cmV0dXJuIGEodGhpcy5jdXJyZW50Rm9ybSkuZmluZChcIltuYW1lPSdcIit0aGlzLmVzY2FwZUNzc01ldGEoYikrXCInXVwiKX0sZ2V0TGVuZ3RoOmZ1bmN0aW9uKGIsYyl7c3dpdGNoKGMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl7Y2FzZVwic2VsZWN0XCI6cmV0dXJuIGEoXCJvcHRpb246c2VsZWN0ZWRcIixjKS5sZW5ndGg7Y2FzZVwiaW5wdXRcIjppZih0aGlzLmNoZWNrYWJsZShjKSlyZXR1cm4gdGhpcy5maW5kQnlOYW1lKGMubmFtZSkuZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RofXJldHVybiBiLmxlbmd0aH0sZGVwZW5kOmZ1bmN0aW9uKGEsYil7cmV0dXJuIXRoaXMuZGVwZW5kVHlwZXNbdHlwZW9mIGFdfHx0aGlzLmRlcGVuZFR5cGVzW3R5cGVvZiBhXShhLGIpfSxkZXBlbmRUeXBlczp7XCJib29sZWFuXCI6ZnVuY3Rpb24oYSl7cmV0dXJuIGF9LHN0cmluZzpmdW5jdGlvbihiLGMpe3JldHVybiEhYShiLGMuZm9ybSkubGVuZ3RofSxcImZ1bmN0aW9uXCI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYShiKX19LG9wdGlvbmFsOmZ1bmN0aW9uKGIpe3ZhciBjPXRoaXMuZWxlbWVudFZhbHVlKGIpO3JldHVybiFhLnZhbGlkYXRvci5tZXRob2RzLnJlcXVpcmVkLmNhbGwodGhpcyxjLGIpJiZcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIn0sc3RhcnRSZXF1ZXN0OmZ1bmN0aW9uKGIpe3RoaXMucGVuZGluZ1tiLm5hbWVdfHwodGhpcy5wZW5kaW5nUmVxdWVzdCsrLGEoYikuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MpLHRoaXMucGVuZGluZ1tiLm5hbWVdPSEwKX0sc3RvcFJlcXVlc3Q6ZnVuY3Rpb24oYixjKXt0aGlzLnBlbmRpbmdSZXF1ZXN0LS0sdGhpcy5wZW5kaW5nUmVxdWVzdDwwJiYodGhpcy5wZW5kaW5nUmVxdWVzdD0wKSxkZWxldGUgdGhpcy5wZW5kaW5nW2IubmFtZV0sYShiKS5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLnBlbmRpbmdDbGFzcyksYyYmMD09PXRoaXMucGVuZGluZ1JlcXVlc3QmJnRoaXMuZm9ybVN1Ym1pdHRlZCYmdGhpcy5mb3JtKCk/KGEodGhpcy5jdXJyZW50Rm9ybSkuc3VibWl0KCksdGhpcy5mb3JtU3VibWl0dGVkPSExKTohYyYmMD09PXRoaXMucGVuZGluZ1JlcXVlc3QmJnRoaXMuZm9ybVN1Ym1pdHRlZCYmKGEodGhpcy5jdXJyZW50Rm9ybSkudHJpZ2dlckhhbmRsZXIoXCJpbnZhbGlkLWZvcm1cIixbdGhpc10pLHRoaXMuZm9ybVN1Ym1pdHRlZD0hMSl9LHByZXZpb3VzVmFsdWU6ZnVuY3Rpb24oYixjKXtyZXR1cm4gYz1cInN0cmluZ1wiPT10eXBlb2YgYyYmY3x8XCJyZW1vdGVcIixhLmRhdGEoYixcInByZXZpb3VzVmFsdWVcIil8fGEuZGF0YShiLFwicHJldmlvdXNWYWx1ZVwiLHtvbGQ6bnVsbCx2YWxpZDohMCxtZXNzYWdlOnRoaXMuZGVmYXVsdE1lc3NhZ2UoYix7bWV0aG9kOmN9KX0pfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5yZXNldEZvcm0oKSxhKHRoaXMuY3VycmVudEZvcm0pLm9mZihcIi52YWxpZGF0ZVwiKS5yZW1vdmVEYXRhKFwidmFsaWRhdG9yXCIpLmZpbmQoXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIpLm9mZihcIi52YWxpZGF0ZS1lcXVhbFRvXCIpLnJlbW92ZUNsYXNzKFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIpfX0sY2xhc3NSdWxlU2V0dGluZ3M6e3JlcXVpcmVkOntyZXF1aXJlZDohMH0sZW1haWw6e2VtYWlsOiEwfSx1cmw6e3VybDohMH0sZGF0ZTp7ZGF0ZTohMH0sZGF0ZUlTTzp7ZGF0ZUlTTzohMH0sbnVtYmVyOntudW1iZXI6ITB9LGRpZ2l0czp7ZGlnaXRzOiEwfSxjcmVkaXRjYXJkOntjcmVkaXRjYXJkOiEwfX0sYWRkQ2xhc3NSdWxlczpmdW5jdGlvbihiLGMpe2IuY29uc3RydWN0b3I9PT1TdHJpbmc/dGhpcy5jbGFzc1J1bGVTZXR0aW5nc1tiXT1jOmEuZXh0ZW5kKHRoaXMuY2xhc3NSdWxlU2V0dGluZ3MsYil9LGNsYXNzUnVsZXM6ZnVuY3Rpb24oYil7dmFyIGM9e30sZD1hKGIpLmF0dHIoXCJjbGFzc1wiKTtyZXR1cm4gZCYmYS5lYWNoKGQuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKCl7dGhpcyBpbiBhLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5ncyYmYS5leHRlbmQoYyxhLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5nc1t0aGlzXSl9KSxjfSxub3JtYWxpemVBdHRyaWJ1dGVSdWxlOmZ1bmN0aW9uKGEsYixjLGQpey9taW58bWF4fHN0ZXAvLnRlc3QoYykmJihudWxsPT09Ynx8L251bWJlcnxyYW5nZXx0ZXh0Ly50ZXN0KGIpKSYmKGQ9TnVtYmVyKGQpLGlzTmFOKGQpJiYoZD12b2lkIDApKSxkfHwwPT09ZD9hW2NdPWQ6Yj09PWMmJlwicmFuZ2VcIiE9PWImJihhW2NdPSEwKX0sYXR0cmlidXRlUnVsZXM6ZnVuY3Rpb24oYil7dmFyIGMsZCxlPXt9LGY9YShiKSxnPWIuZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtmb3IoYyBpbiBhLnZhbGlkYXRvci5tZXRob2RzKVwicmVxdWlyZWRcIj09PWM/KGQ9Yi5nZXRBdHRyaWJ1dGUoYyksXCJcIj09PWQmJihkPSEwKSxkPSEhZCk6ZD1mLmF0dHIoYyksdGhpcy5ub3JtYWxpemVBdHRyaWJ1dGVSdWxlKGUsZyxjLGQpO3JldHVybiBlLm1heGxlbmd0aCYmLy0xfDIxNDc0ODM2NDd8NTI0Mjg4Ly50ZXN0KGUubWF4bGVuZ3RoKSYmZGVsZXRlIGUubWF4bGVuZ3RoLGV9LGRhdGFSdWxlczpmdW5jdGlvbihiKXt2YXIgYyxkLGU9e30sZj1hKGIpLGc9Yi5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpO2ZvcihjIGluIGEudmFsaWRhdG9yLm1ldGhvZHMpZD1mLmRhdGEoXCJydWxlXCIrYy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStjLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKSx0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoZSxnLGMsZCk7cmV0dXJuIGV9LHN0YXRpY1J1bGVzOmZ1bmN0aW9uKGIpe3ZhciBjPXt9LGQ9YS5kYXRhKGIuZm9ybSxcInZhbGlkYXRvclwiKTtyZXR1cm4gZC5zZXR0aW5ncy5ydWxlcyYmKGM9YS52YWxpZGF0b3Iubm9ybWFsaXplUnVsZShkLnNldHRpbmdzLnJ1bGVzW2IubmFtZV0pfHx7fSksY30sbm9ybWFsaXplUnVsZXM6ZnVuY3Rpb24oYixjKXtyZXR1cm4gYS5lYWNoKGIsZnVuY3Rpb24oZCxlKXtpZihlPT09ITEpcmV0dXJuIHZvaWQgZGVsZXRlIGJbZF07aWYoZS5wYXJhbXx8ZS5kZXBlbmRzKXt2YXIgZj0hMDtzd2l0Y2godHlwZW9mIGUuZGVwZW5kcyl7Y2FzZVwic3RyaW5nXCI6Zj0hIWEoZS5kZXBlbmRzLGMuZm9ybSkubGVuZ3RoO2JyZWFrO2Nhc2VcImZ1bmN0aW9uXCI6Zj1lLmRlcGVuZHMuY2FsbChjLGMpfWY/YltkXT12b2lkIDA9PT1lLnBhcmFtfHxlLnBhcmFtOihhLmRhdGEoYy5mb3JtLFwidmFsaWRhdG9yXCIpLnJlc2V0RWxlbWVudHMoYShjKSksZGVsZXRlIGJbZF0pfX0pLGEuZWFjaChiLGZ1bmN0aW9uKGQsZSl7YltkXT1hLmlzRnVuY3Rpb24oZSkmJlwibm9ybWFsaXplclwiIT09ZD9lKGMpOmV9KSxhLmVhY2goW1wibWlubGVuZ3RoXCIsXCJtYXhsZW5ndGhcIl0sZnVuY3Rpb24oKXtiW3RoaXNdJiYoYlt0aGlzXT1OdW1iZXIoYlt0aGlzXSkpfSksYS5lYWNoKFtcInJhbmdlbGVuZ3RoXCIsXCJyYW5nZVwiXSxmdW5jdGlvbigpe3ZhciBjO2JbdGhpc10mJihhLmlzQXJyYXkoYlt0aGlzXSk/Ylt0aGlzXT1bTnVtYmVyKGJbdGhpc11bMF0pLE51bWJlcihiW3RoaXNdWzFdKV06XCJzdHJpbmdcIj09dHlwZW9mIGJbdGhpc10mJihjPWJbdGhpc10ucmVwbGFjZSgvW1xcW1xcXV0vZyxcIlwiKS5zcGxpdCgvW1xccyxdKy8pLGJbdGhpc109W051bWJlcihjWzBdKSxOdW1iZXIoY1sxXSldKSl9KSxhLnZhbGlkYXRvci5hdXRvQ3JlYXRlUmFuZ2VzJiYobnVsbCE9Yi5taW4mJm51bGwhPWIubWF4JiYoYi5yYW5nZT1bYi5taW4sYi5tYXhdLGRlbGV0ZSBiLm1pbixkZWxldGUgYi5tYXgpLG51bGwhPWIubWlubGVuZ3RoJiZudWxsIT1iLm1heGxlbmd0aCYmKGIucmFuZ2VsZW5ndGg9W2IubWlubGVuZ3RoLGIubWF4bGVuZ3RoXSxkZWxldGUgYi5taW5sZW5ndGgsZGVsZXRlIGIubWF4bGVuZ3RoKSksYn0sbm9ybWFsaXplUnVsZTpmdW5jdGlvbihiKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYil7dmFyIGM9e307YS5lYWNoKGIuc3BsaXQoL1xccy8pLGZ1bmN0aW9uKCl7Y1t0aGlzXT0hMH0pLGI9Y31yZXR1cm4gYn0sYWRkTWV0aG9kOmZ1bmN0aW9uKGIsYyxkKXthLnZhbGlkYXRvci5tZXRob2RzW2JdPWMsYS52YWxpZGF0b3IubWVzc2FnZXNbYl09dm9pZCAwIT09ZD9kOmEudmFsaWRhdG9yLm1lc3NhZ2VzW2JdLGMubGVuZ3RoPDMmJmEudmFsaWRhdG9yLmFkZENsYXNzUnVsZXMoYixhLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKGIpKX0sbWV0aG9kczp7cmVxdWlyZWQ6ZnVuY3Rpb24oYixjLGQpe2lmKCF0aGlzLmRlcGVuZChkLGMpKXJldHVyblwiZGVwZW5kZW5jeS1taXNtYXRjaFwiO2lmKFwic2VsZWN0XCI9PT1jLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpe3ZhciBlPWEoYykudmFsKCk7cmV0dXJuIGUmJmUubGVuZ3RoPjB9cmV0dXJuIHRoaXMuY2hlY2thYmxlKGMpP3RoaXMuZ2V0TGVuZ3RoKGIsYyk+MDpiLmxlbmd0aD4wfSxlbWFpbDpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHwvXlthLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSokLy50ZXN0KGEpfSx1cmw6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8L14oPzooPzooPzpodHRwcz98ZnRwKTopP1xcL1xcLykoPzpcXFMrKD86OlxcUyopP0ApPyg/Oig/ISg/OjEwfDEyNykoPzpcXC5cXGR7MSwzfSl7M30pKD8hKD86MTY5XFwuMjU0fDE5MlxcLjE2OCkoPzpcXC5cXGR7MSwzfSl7Mn0pKD8hMTcyXFwuKD86MVs2LTldfDJcXGR8M1swLTFdKSg/OlxcLlxcZHsxLDN9KXsyfSkoPzpbMS05XVxcZD98MVxcZFxcZHwyWzAxXVxcZHwyMlswLTNdKSg/OlxcLig/OjE/XFxkezEsMn18MlswLTRdXFxkfDI1WzAtNV0pKXsyfSg/OlxcLig/OlsxLTldXFxkP3wxXFxkXFxkfDJbMC00XVxcZHwyNVswLTRdKSl8KD86KD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSg/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykqKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZl17Mix9KSkuPykoPzo6XFxkezIsNX0pPyg/OlsvPyNdXFxTKik/JC9pLnRlc3QoYSl9LGRhdGU6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8IS9JbnZhbGlkfE5hTi8udGVzdChuZXcgRGF0ZShhKS50b1N0cmluZygpKX0sZGF0ZUlTTzpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHwvXlxcZHs0fVtcXC9cXC1dKDA/WzEtOV18MVswMTJdKVtcXC9cXC1dKDA/WzEtOV18WzEyXVswLTldfDNbMDFdKSQvLnRlc3QoYSl9LG51bWJlcjpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHwvXig/Oi0/XFxkK3wtP1xcZHsxLDN9KD86LFxcZHszfSkrKT8oPzpcXC5cXGQrKT8kLy50ZXN0KGEpfSxkaWdpdHM6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8L15cXGQrJC8udGVzdChhKX0sbWlubGVuZ3RoOmZ1bmN0aW9uKGIsYyxkKXt2YXIgZT1hLmlzQXJyYXkoYik/Yi5sZW5ndGg6dGhpcy5nZXRMZW5ndGgoYixjKTtyZXR1cm4gdGhpcy5vcHRpb25hbChjKXx8ZT49ZH0sbWF4bGVuZ3RoOmZ1bmN0aW9uKGIsYyxkKXt2YXIgZT1hLmlzQXJyYXkoYik/Yi5sZW5ndGg6dGhpcy5nZXRMZW5ndGgoYixjKTtyZXR1cm4gdGhpcy5vcHRpb25hbChjKXx8ZTw9ZH0scmFuZ2VsZW5ndGg6ZnVuY3Rpb24oYixjLGQpe3ZhciBlPWEuaXNBcnJheShiKT9iLmxlbmd0aDp0aGlzLmdldExlbmd0aChiLGMpO3JldHVybiB0aGlzLm9wdGlvbmFsKGMpfHxlPj1kWzBdJiZlPD1kWzFdfSxtaW46ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHxhPj1jfSxtYXg6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHxhPD1jfSxyYW5nZTpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fGE+PWNbMF0mJmE8PWNbMV19LHN0ZXA6ZnVuY3Rpb24oYixjLGQpe3ZhciBlLGY9YShjKS5hdHRyKFwidHlwZVwiKSxnPVwiU3RlcCBhdHRyaWJ1dGUgb24gaW5wdXQgdHlwZSBcIitmK1wiIGlzIG5vdCBzdXBwb3J0ZWQuXCIsaD1bXCJ0ZXh0XCIsXCJudW1iZXJcIixcInJhbmdlXCJdLGk9bmV3IFJlZ0V4cChcIlxcXFxiXCIrZitcIlxcXFxiXCIpLGo9ZiYmIWkudGVzdChoLmpvaW4oKSksaz1mdW5jdGlvbihhKXt2YXIgYj0oXCJcIithKS5tYXRjaCgvKD86XFwuKFxcZCspKT8kLyk7cmV0dXJuIGImJmJbMV0/YlsxXS5sZW5ndGg6MH0sbD1mdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5yb3VuZChhKk1hdGgucG93KDEwLGUpKX0sbT0hMDtpZihqKXRocm93IG5ldyBFcnJvcihnKTtyZXR1cm4gZT1rKGQpLChrKGIpPmV8fGwoYiklbChkKSE9PTApJiYobT0hMSksdGhpcy5vcHRpb25hbChjKXx8bX0sZXF1YWxUbzpmdW5jdGlvbihiLGMsZCl7dmFyIGU9YShkKTtyZXR1cm4gdGhpcy5zZXR0aW5ncy5vbmZvY3Vzb3V0JiZlLm5vdChcIi52YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIikubGVuZ3RoJiZlLmFkZENsYXNzKFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIpLm9uKFwiYmx1ci52YWxpZGF0ZS1lcXVhbFRvXCIsZnVuY3Rpb24oKXthKGMpLnZhbGlkKCl9KSxiPT09ZS52YWwoKX0scmVtb3RlOmZ1bmN0aW9uKGIsYyxkLGUpe2lmKHRoaXMub3B0aW9uYWwoYykpcmV0dXJuXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7ZT1cInN0cmluZ1wiPT10eXBlb2YgZSYmZXx8XCJyZW1vdGVcIjt2YXIgZixnLGgsaT10aGlzLnByZXZpb3VzVmFsdWUoYyxlKTtyZXR1cm4gdGhpcy5zZXR0aW5ncy5tZXNzYWdlc1tjLm5hbWVdfHwodGhpcy5zZXR0aW5ncy5tZXNzYWdlc1tjLm5hbWVdPXt9KSxpLm9yaWdpbmFsTWVzc2FnZT1pLm9yaWdpbmFsTWVzc2FnZXx8dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1tjLm5hbWVdW2VdLHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbYy5uYW1lXVtlXT1pLm1lc3NhZ2UsZD1cInN0cmluZ1wiPT10eXBlb2YgZCYme3VybDpkfXx8ZCxoPWEucGFyYW0oYS5leHRlbmQoe2RhdGE6Yn0sZC5kYXRhKSksaS5vbGQ9PT1oP2kudmFsaWQ6KGkub2xkPWgsZj10aGlzLHRoaXMuc3RhcnRSZXF1ZXN0KGMpLGc9e30sZ1tjLm5hbWVdPWIsYS5hamF4KGEuZXh0ZW5kKCEwLHttb2RlOlwiYWJvcnRcIixwb3J0OlwidmFsaWRhdGVcIitjLm5hbWUsZGF0YVR5cGU6XCJqc29uXCIsZGF0YTpnLGNvbnRleHQ6Zi5jdXJyZW50Rm9ybSxzdWNjZXNzOmZ1bmN0aW9uKGEpe3ZhciBkLGcsaCxqPWE9PT0hMHx8XCJ0cnVlXCI9PT1hO2Yuc2V0dGluZ3MubWVzc2FnZXNbYy5uYW1lXVtlXT1pLm9yaWdpbmFsTWVzc2FnZSxqPyhoPWYuZm9ybVN1Ym1pdHRlZCxmLnJlc2V0SW50ZXJuYWxzKCksZi50b0hpZGU9Zi5lcnJvcnNGb3IoYyksZi5mb3JtU3VibWl0dGVkPWgsZi5zdWNjZXNzTGlzdC5wdXNoKGMpLGYuaW52YWxpZFtjLm5hbWVdPSExLGYuc2hvd0Vycm9ycygpKTooZD17fSxnPWF8fGYuZGVmYXVsdE1lc3NhZ2UoYyx7bWV0aG9kOmUscGFyYW1ldGVyczpifSksZFtjLm5hbWVdPWkubWVzc2FnZT1nLGYuaW52YWxpZFtjLm5hbWVdPSEwLGYuc2hvd0Vycm9ycyhkKSksaS52YWxpZD1qLGYuc3RvcFJlcXVlc3QoYyxqKX19LGQpKSxcInBlbmRpbmdcIil9fX0pO3ZhciBiLGM9e307cmV0dXJuIGEuYWpheFByZWZpbHRlcj9hLmFqYXhQcmVmaWx0ZXIoZnVuY3Rpb24oYSxiLGQpe3ZhciBlPWEucG9ydDtcImFib3J0XCI9PT1hLm1vZGUmJihjW2VdJiZjW2VdLmFib3J0KCksY1tlXT1kKX0pOihiPWEuYWpheCxhLmFqYXg9ZnVuY3Rpb24oZCl7dmFyIGU9KFwibW9kZVwiaW4gZD9kOmEuYWpheFNldHRpbmdzKS5tb2RlLGY9KFwicG9ydFwiaW4gZD9kOmEuYWpheFNldHRpbmdzKS5wb3J0O3JldHVyblwiYWJvcnRcIj09PWU/KGNbZl0mJmNbZl0uYWJvcnQoKSxjW2ZdPWIuYXBwbHkodGhpcyxhcmd1bWVudHMpLGNbZl0pOmIuYXBwbHkodGhpcyxhcmd1bWVudHMpfSksYX0pOyJdfQ==
