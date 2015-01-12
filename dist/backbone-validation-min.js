// Backbone.Validation v0.9.1
//
// Copyright (c) 2011-2015 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
Backbone.Validation=function(a){"use strict";var b={forceUpdate:!1,selector:"name",labelFormatter:"sentenceCase",valid:Function.prototype,invalid:Function.prototype},c={formatLabel:function(a,c){return i[b.labelFormatter](a,c)},format:function(){var a=Array.prototype.slice.call(arguments),b=a.shift();return b.replace(/\{(\d+)\}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})}},d=function(b,c,e){return c=c||{},e=e||"",a.each(b,function(a,f){b.hasOwnProperty(f)&&(a&&"object"==typeof a&&a.constructor===Object?d(a,c,e+f+"."):c[e+f]=a)}),c},e=function(){var e=function(b){return a.reduce(a.keys(a.result(b,"validation")||{}),function(a,b){return a[b]=void 0,a},{})},g=function(b,c){var d=b.validation?a.result(b,"validation")[c]||{}:{};return(a.isFunction(d)||a.isString(d))&&(d={fn:d}),a.isArray(d)||(d=[d]),a.reduce(d,function(b,c){return a.each(a.without(a.keys(c),"msg","depends"),function(a){b.push({fn:j[a],val:c[a],msg:c.msg,depends:c.depends||[]})}),b},[])},h=function(b,d,e,f){return a.reduce(g(b,d),function(g,h){var i=a.extend({},c,j),k=h.fn.call(i,e,d,h.val,b,f,a.pick(f,h.depends));return k===!1||g===!1?!1:k&&!g?a.result(h,"msg")||k:g},"")},i=function(b,c){var e,f={},g=!0,i=a.clone(c),j=d(c);return a.each(j,function(a,c){e=h(b,c,a,i),e&&(f[c]=e,g=!1)}),{invalidAttrs:f,isValid:g}},k=function(b,c){return a.chain(g(b,c)).pluck("depends").flatten().uniq().value()},l=function(b,c){return{preValidate:function(b,c){var d,e=this,f={};return a.isObject(b)?(a.each(b,function(a,b){d=e.preValidate(b,a),d&&(f[b]=d)}),a.isEmpty(f)?void 0:f):h(this,b,c,a.extend({},this.attributes))},isValid:function(b,c){var f=d(this.attributes);return b===!1&&(b=a.keys(e(this))),a.isString(b)?!h(this,b,f[b],a.extend({},this.attributes)):a.isArray(b)?a.reduce(b,function(b,c){return b&&!h(this,c,f[c],a.extend({},this.attributes))},!0,this):(b===!0&&this.validate(null,c),this.validation?this._isValid:!0)},validate:function(f,g){var h=this,j=!f,l=a.extend({},c,g),m=e(h),n=a.extend({},m,h.attributes,f),o=d(f||n),p=i(h,n);if(h._isValid=p.isValid,!l.silent){var q=a.chain(m).map(function(b,c){return[c,a.any(k(h,c),function(a){return o.hasOwnProperty(a)})]}).object().value();a.each(m,function(a,c){var d=p.invalidAttrs.hasOwnProperty(c),e=o.hasOwnProperty(c),f=q[c];!d&&(e||f||j)&&l.valid(b,c,l.selector,e,f)}),a.each(m,function(a,c){var d=p.invalidAttrs.hasOwnProperty(c),e=o.hasOwnProperty(c),f=q[c];d&&(e||f||j)&&l.invalid(b,c,p.invalidAttrs[c],l.selector,e,f)}),a.defer(function(){h.trigger("validated",h._isValid,h,p.invalidAttrs,o),h.trigger("validated:"+(h._isValid?"valid":"invalid"),h,p.invalidAttrs,o)})}return!l.forceUpdate&&a.intersection(a.keys(p.invalidAttrs),a.keys(o)).length>0?p.invalidAttrs:void 0}}},m=function(b,c,d){a.extend(c,l(b,d))},n=function(a){delete a.validate,delete a.preValidate,delete a.isValid},o=function(a){m(this.view,a,this.options)},p=function(a){n(a)};return{version:"0.9.1",configure:function(c){a.extend(b,c)},bind:function(c,d){d=a.extend({},b,f,d);var e=d.model||c.model,g=d.collection||c.collection;if("undefined"==typeof e&&"undefined"==typeof g)throw"Before you execute the binding your view must have a model or a collection.\nSee http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.";e?m(c,e,d):g&&(g.each(function(a){m(c,a,d)}),g.bind("add",o,{view:c,options:d}),g.bind("remove",p))},unbind:function(b,c){c=a.extend({},c);var d=c.model||b.model,e=c.collection||b.collection;d?n(d):e&&(e.each(function(a){n(a)}),e.unbind("add",o),e.unbind("remove",p))},mixin:l(null,b)}}(),f=e.callbacks={valid:function(a,b,c){a.$("["+c+'~="'+b+'"]').removeClass("invalid").removeAttr("data-error")},invalid:function(a,b,c,d){a.$("["+d+'~="'+b+'"]').addClass("invalid").attr("data-error",c)}},g=e.patterns={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},h=e.messages={required:"{0} is required",acceptance:"{0} must be accepted",min:"{0} must be greater than or equal to {1}",max:"{0} must be less than or equal to {1}",range:"{0} must be between {1} and {2}",length:"{0} must be {1} characters",minLength:"{0} must be at least {1} characters",maxLength:"{0} must be at most {1} characters",rangeLength:"{0} must be between {1} and {2} characters",oneOf:"{0} must be one of: {1}",equalTo:"{0} must be the same as {1}",digits:"{0} must only contain digits",number:"{0} must be a number",email:"{0} must be a valid email",url:"{0} must be a valid url",inlinePattern:"{0} is invalid"},i=e.labelFormatters={none:function(a){return a},sentenceCase:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w)/g,function(a,b){return 0===b?a.toUpperCase():" "+a.toLowerCase()}).replace(/_/g," ")},label:function(a,b){return b.labels&&b.labels[a]||i.sentenceCase(a,b)}},j=e.validators=function(){var b=String.prototype.trim?function(a){return null===a?"":String.prototype.trim.call(a)}:function(a){var b=/^\s+/,c=/\s+$/;return null===a?"":a.toString().replace(b,"").replace(c,"")},c=function(b){return a.isNumber(b)||a.isString(b)&&b.match(g.number)},d=function(c){return!(a.isNull(c)||a.isUndefined(c)||a.isString(c)&&""===b(c)||a.isArray(c)&&a.isEmpty(c))};return{fn:function(b,c,d,e,f,g){return a.isString(d)&&(d=e[d]),d.call(e,b,c,f,g)},required:function(b,c,e,f,g){var i=a.isFunction(e)?e.call(f,b,c,g):e;return i||d(b)?i&&!d(b)?this.format(h.required,this.formatLabel(c,f)):void 0:!1},acceptance:function(b,c,d,e){return"true"===b||a.isBoolean(b)&&b!==!1?void 0:this.format(h.acceptance,this.formatLabel(c,e))},min:function(a,b,d,e){return!c(a)||d>a?this.format(h.min,this.formatLabel(b,e),d):void 0},max:function(a,b,d,e){return!c(a)||a>d?this.format(h.max,this.formatLabel(b,e),d):void 0},range:function(a,b,d,e){return!c(a)||a<d[0]||a>d[1]?this.format(h.range,this.formatLabel(b,e),d[0],d[1]):void 0},length:function(b,c,d,e){return a.isString(b)&&b.length===d?void 0:this.format(h.length,this.formatLabel(c,e),d)},minLength:function(b,c,d,e){return!a.isString(b)||b.length<d?this.format(h.minLength,this.formatLabel(c,e),d):void 0},maxLength:function(b,c,d,e){return!a.isString(b)||b.length>d?this.format(h.maxLength,this.formatLabel(c,e),d):void 0},rangeLength:function(b,c,d,e){return!a.isString(b)||b.length<d[0]||b.length>d[1]?this.format(h.rangeLength,this.formatLabel(c,e),d[0],d[1]):void 0},oneOf:function(b,c,d,e){return a.include(d,b)?void 0:this.format(h.oneOf,this.formatLabel(c,e),d.join(", "))},equalTo:function(a,b,c,d,e){return a!==e[c]?this.format(h.equalTo,this.formatLabel(b,d),this.formatLabel(c,d)):void 0},pattern:function(a,b,c,e){return d(a)&&a.toString().match(g[c]||c)?void 0:this.format(h[c]||h.inlinePattern,this.formatLabel(b,e),c)}}}();return a.each(j,function(b,d){j[d]=a.bind(j[d],a.extend({},c,j))}),e}(_);