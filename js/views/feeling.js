var elefeely = elefeely || {};

(function () {

  elefeely.FeelingView = Backbone.View.extend({

    template: Handlebars.compile($('#feeling-template').html()),

    initialize: function () {
      console.log('initializing FeelingView');
      _.bindAll(this, 'render');
    },

    render: function () {
      this.$el.html(this.template({'feeling': this.model.toJSON()}));
      return this;
    }
  });
})();
