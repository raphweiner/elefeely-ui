var elefeely = elefeely || {};

(function () {

  elefeely.HeaderView = Backbone.View.extend({

    events: {
      'click #collective': 'showCollective',
      'click #login-signup': 'showLoginSignup',
      'click #personal': 'showPersonal',
      'click #logout': 'logout'
    },

    template: Handlebars.compile($('#header-template').html()),

    render: function () {
      console.log(['current:', elefeely.currentUser]);
      this.$el.html(this.template({ isSignedIn: !!elefeely.currentUser }));
      return this;
    },

    showCollective: function () {
      // $('#main').html <- load spinner in here
      var feelings = new elefeely.Feelings;
      feelings.fetch({
        success: function() {
          var view = new elefeely.CollectiveView({collection: feelings});
          $('#main').html(view.render().el);
        }
      });
    },

    showLoginSignup: function () {
      var view = new elefeely.LoginSignupView();
      $('#main').html(view.render().el);
    },

    logout: function () {
      elefeely.signOut();
    },

    showPersonal: function () {
      var view = new elefeely.PersonalView
      $('#main').html(view.render().el)
    }
  });
})();
