var elefeely = elefeely || {};

(function () {

  elefeely.Router = Backbone.Router.extend({

    routes: {
      "personal":   "personal",
      "collective": "collective",
      "logout":     "logout",
      "login":      "login"
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
    }

  });
})();

