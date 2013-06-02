var elefeely = elefeely || {};

(function () {

  elefeely.PersonalView = Backbone.View.extend({

    template: Handlebars.compile($('#personal-template').html()),

    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });
})();
