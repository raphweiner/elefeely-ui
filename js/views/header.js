var elefeely = elefeely || {};

(function () {

  elefeely.HeaderView = Backbone.View.extend({

    template: Handlebars.compile($('#header-template').html()),

    render: function () {
      console.log(['current:', elefeely.currentUser]);
      this.$el.html(this.template({ isSignedIn: !!elefeely.currentUser }));
      return this;
    }

  });
})();
