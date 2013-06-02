var elefeely = elefeely || {};

(function () {

    elefeely.Router = Backbone.Router.extend({

        routes: {
            "personal": "personal"
        },

        personal: function () {
            elefeely.appView.showPersonal();
        }

    });

})();

