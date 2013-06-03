var elefeely = elefeely || {};

(function () {

  elefeely.SettingsView = Backbone.View.extend({

    template: Handlebars.compile($('#settings-template').html()),

    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });
})();
