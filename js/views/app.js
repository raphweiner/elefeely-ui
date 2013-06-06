var elefeely = elefeely || {};

(function () {

  elefeely.AppView = Backbone.View.extend({

    initialize: function () {
      _.bindAll(this, 'render', 'showHeader');

      elefeely.on('auth:changed', this.showHeader);

      this.collectiveFeelings = new elefeely.CollectiveFeelings;
      this.personalFeelings = new elefeely.PersonalFeelings;

      var channel = elefeely.pusher.subscribe('feelings');

      channel.bind('new_feeling', function(data) {
        this.collectiveFeelings.add(data);

        if (elefeely.currentUser && data.user_id === elefeely.currentUser.id) {
          this.personalFeelings.add(data);
        }
      }.bind(this));

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

    showPersonal: function () {
      this.showGraphView('Personal', this.personalFeelings);
    },

    showCollective: function () {
      this.showGraphView('Collective', this.collectiveFeelings);
    },

    showGraphView: function(viewTitle, collection) {
      collection.fetch({
        success: function() {
          var view = new elefeely.GraphView({ collection: collection,
                                              viewTitle: viewTitle });
          this.showView(view);
        }.bind(this),
        error: function () {
          var view = new elefeely.GraphView();
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
