var elefeely = elefeely || {};

(function () {

  elefeely.AppView = Backbone.View.extend({

    initialize: function () {
      _.bindAll(this, 'render', 'loadHeader');

      elefeely.on('auth:changed', this.loadHeader);

      this.render();
    },

    render: function () {
      this.$main = $('#main');

      this.loadHeader();
      this.loadMain();
      this.loadFooter();

      return this;
    },

    loadHeader: function () {
      var view = new elefeely.HeaderView();
      $('#header').html(view.render().el);
    },

    loadMain: function () {
      var view = new elefeely.MainView();
      this.showView(view);
    },

    loadFooter: function () {
      var view = new elefeely.FooterView();
      $('#footer').html(view.render().el);
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

    showLogin: function () {
      var view = new elefeely.LoginSignupView();
      this.showView(view);
    },

    showSettings: function () {
      var view = new elefeely.SettingsView();
      this.showView(view);
    },

    showView: function (view) {
      this.$main.html(view.render().el);
    }

  });
})();
