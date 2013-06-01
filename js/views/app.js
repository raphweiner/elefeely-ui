var elefeely = elefeely || {};

(function () {

  elefeely.AppView = Backbone.View.extend({

    initialize: function () {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function () {
      this.loadHeader();
      this.loadFooter();

      return this;
    },

    loadHeader: function () {
      var view = new elefeely.HeaderView();
      $('#header').html(view.render().el);
    },

    loadFooter: function () {
      var view = new elefeely.FooterView();
      $('#footer').html(view.render().el);
    }

  });
})();
