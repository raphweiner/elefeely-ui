var elefeely = elefeely || {};

(function () {

  elefeely.AppView = Backbone.View.extend({

    initialize: function () {
      _.bindAll(this, 'render', 'showHeader');

      elefeely.on('auth:changed', this.showHeader);

      this.render();
    },

    render: function () {
      this.$main = $('#main');

      this.showHeader();
      this.showHome();
      this.showFooter();

      return this;
    },

    showHeader: function () {
      var view = new elefeely.HeaderView();
      $('#header').html(view.render().el);
    },

    showFooter: function () {
      var view = new elefeely.FooterView();
      $('#footer').html(view.render().el);
    },

    showHome: function () {
      var view = new elefeely.HomeView();
      this.showView(view);
    },

    showPersonal: function() {
      // this.$main.html <- load spinner in here
      var feelings = new elefeely.PersonalFeelings;
      feelings.fetch({
        success: function() {
          var view = new elefeely.PersonalView({ collection: feelings });
          this.showView(view);
        }.bind(this),
        error: function () {
          var view = new elefeely.PersonalView();
          this.showView(view);
        }.bind(this)
      });
    },

    showCollective: function () {
      // this.$main.html <- load spinner in here
      var feelings = new elefeely.CollectiveFeelings;
      feelings.fetch({
        success: function() {
          var view = new elefeely.CollectiveView({ collection: feelings });
          this.showView(view);
        }.bind(this),
        error: function () {
          var view = new elefeely.CollectiveView();
          this.showView(view);
        }.bind(this)
      });
    },

    showSignupLogin: function () {
      if ( !elefeely.currentUser ) {
        var view = new elefeely.SignupLoginView();
        this.showView(view);
      } else {
        Backbone.history.navigate('personal', { trigger: true });
      }
    },

    showSettings: function () {
      if ( elefeely.currentUser ) {
        var view = new elefeely.SettingsView();
        this.showView(view);
      } else {
        Backbone.history.navigate('home', { trigger: true });
      }
    },

    showView: function (view) {
      this.$main.html(view.render().el);
    }

  });
})();
