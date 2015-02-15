buster.testCase('Label formatters', {
  "Attribute names on the model can be formatted in error messages using": {
    setUp: function() {
      var Model = Backbone.Model.extend({
        validation: {
          someAttribute: {
            required: true
          },
          some_attribute: {
            required: true
          },
          some_other_attribute: {
            required: true
          }
        },

        labels: {
          someAttribute: 'Custom label'
        }
      });

      this.model = new Model();
      _.extend(this.model, Backbone.Validation.mixin);
    },

    tearDown: function() {
      // Reset to default formatter
      Backbone.Validation.configure({
        labelFormatter: 'sentenceCase'
      });
    },

    "no formatting": {
      setUp: function() {
        Backbone.Validation.configure({
          labelFormatter: 'none'
        });
      },

      "returns the attribute name": function(){
        assert.equals('someAttribute is required', this.model.preValidate('someAttribute', ''));
      }
    },

    "label formatting": {
      setUp: function() {
        Backbone.Validation.configure({
          labelFormatter: 'label'
        });
      },

      "looks up a label on the model": function(){
        assert.equals('Custom label is required', this.model.preValidate('someAttribute', ''));
      },

      "returns sentence cased name when label is not found": function(){
        assert.equals('Some attribute is required', this.model.preValidate('some_attribute', ''));
      },

      "returns sentence cased name when label attribute is not defined": function(){
        var Model = Backbone.Model.extend({
          validation: {
            someAttribute: {
              required: true
            }
          }
        });

        var model = new Model();
        _.extend(model, Backbone.Validation.mixin);

        assert.equals('Some attribute is required', model.preValidate('someAttribute', ''));
      }
    },

    "sentence formatting": {
      setUp: function() {
        Backbone.Validation.configure({
          labelFormatter: 'sentenceCase'
        });
      },

      "sentence cases camel cased attribute name": function(){
        assert.equals('Some attribute is required', this.model.preValidate('someAttribute', ''));
      },

      "sentence cases underscore named attribute name": function(){
        assert.equals('Some attribute is required', this.model.preValidate('some_attribute', ''));
      },

      "sentence cases underscore named attribute name with multiple underscores": function(){
        assert.equals('Some other attribute is required', this.model.preValidate('some_other_attribute', ''));
      }
    }
  },

  "Label placeholders for custom messages should be processed": {
    setUp: function () {
      Backbone.Validation.configure({
        labelFormatter: 'none'
      });

      var Model = Backbone.Model.extend({
        validation: {
          attr: {
            max: 42,
            msg: 'Max allowed value for {0} is {1}, but have {2}'
          }
        }
      });

      this.model = new Model();
      _.extend(this.model, Backbone.Validation.mixin);
    },

    tearDown: function() {
      // Reset to default formatter
      Backbone.Validation.configure({
        labelFormatter: 'sentenceCase'
      });
    },

    "by default": {
      "attr name, validator params and attr value should be used": function () {
        assert.equals('Max allowed value for attr is 42, but have 100', this.model.preValidate('attr', 100));
      },

      "array params": {
        setUp: function () {
          this.model.validation.ranged_attr = {
            range: [10, 15],
            msg: '{0} should be between {1} and {2}, but have {3}'
          };
        },

        tearDown: function () {
          delete this.model.validation.ranged_attr;
        },

        "should be unpacked": function () {
          assert.equals('ranged_attr should be between 10 and 15, but have 20', this.model.preValidate('ranged_attr', 20));
        }
      }
    },

    "when explicitly specified": {

      tearDown: function () {
        delete this.model.validation.attr.labelPlaceholders;
      },

      "not as a function": {
        setUp: function () {
          this.model.validation.attr.labelPlaceholders = 'The Answer';
        },

        "should replace only validator params": function () {
          assert.equals('Max allowed value for attr is The Answer, but have 100', this.model.preValidate('attr', 100));
        }
      },

      "as a function": {
        setUp: function () {
          this.model.validation.attr.labelPlaceholders = function (param, value) {
            return ['param:' + param, 'value:' + value];
          };
        },

        "should replace both validator params and attr value": function () {
          assert.equals('Max allowed value for attr is param:42, but have value:100', this.model.preValidate('attr', 100));
        }
      }
    }

  }
});