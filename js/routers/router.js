var elefeely = elefeely || {};

(function () {

  elefeely.Router = Backbone.Router.extend({

    routes: {
      "home":       "home",
      "personal":   "personal",
      "collective": "collective",
      "logout":     "logout",
      "login":      "login",
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

    login: function () {
      elefeely.appView.showLogin();
    },

    settings: function () {
      elefeely.appView.showSettings();
    }

  });
})();

