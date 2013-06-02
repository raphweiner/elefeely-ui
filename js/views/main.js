var elefeely = elefeely || {};

(function () {

  elefeely.MainView = Backbone.View.extend({

    template: Handlebars.compile($('#main-template').html()),

    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });
})();
