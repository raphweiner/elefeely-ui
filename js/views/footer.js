var elefeely = elefeely || {};

(function () {

  elefeely.FooterView = Backbone.View.extend({

    template: Handlebars.compile($('#footer-template').html()),

    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });
})();
