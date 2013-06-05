var elefeely = elefeely || {};

(function () {

  elefeely.Router = Backbone.Router.extend({

    routes: {
      "home":       "home",
      "personal":   "personal",
      "collective": "collective",
      "logout":     "logout",
      "signup":     "signup",
      "settings":   "settings"
    },

    home: function () {
      elefeely.appView.showHome();
    },

    personal: function () {
      elefeely.appView.showPersonal();
    },

    collective: function () {
      elefeely.appView.showCollective();
    },

    logout: function () {
      elefeely.signOut();
    },

    signup: function () {
      elefeely.appView.showSignupLogin();
    },

    settings: function () {
      elefeely.appView.showSettings();
    }

  });
})();

