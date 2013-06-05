var elefeely = elefeely || {};

(function () {

  elefeely.HeaderView = Backbone.View.extend({

    template: Handlebars.compile($('#header-template').html()),

    render: function () {
      debugger
      this.$el.html(this.template({ isSignedIn: !!elefeely.currentUser,
                                    currentUser:  elefeely.currentUser }));
      return this;
    }

  });
})();
