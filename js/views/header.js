var elefeely = elefeely || {};

(function () {

  elefeely.HeaderView = Backbone.View.extend({

    events: {
      'click #collective': 'showCollective'
    },

    template: Handlebars.compile($('#header-template').html()),

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    showCollective: function () {
      console.log('show collective');
      var view = new elefeely.CollectiveView({collection: elefeely.FeelingList});
      $('#main').html(view.render().el);
    }

  });
})();
