var elefeely = elefeely || {};

(function () {

  elefeely.AppView = Backbone.View.extend({

    initialize: function () {
      _.bindAll(this, 'render', 'loadHeader');

      elefeely.on('auth:changed', this.loadHeader);

      this.render();
    },

    render: function () {
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
      $('#main').html(view.render().el);
    },

    loadFooter: function () {
      var view = new elefeely.FooterView();
      $('#footer').html(view.render().el);
    },

    showPersonal: function() {
      var view = new elefeely.PersonalView();
      $('#main').html(view.render().el);
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
    }

  });
})();
