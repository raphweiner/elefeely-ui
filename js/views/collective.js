var elefeely = elefeely || {};

(function () {

  elefeely.CollectiveView = Backbone.View.extend({

    template: Handlebars.compile($('#collective-template').html()),

    render: function () {
      console.log("render collective");
      this.$el.html(this.template());
      this.showFeelings();
      console.log(this.collection);

      return this;
    },

    showFeelings: function () {
      this.collection.each(this.showOne);
    },

    showOne: function (feeling) {
      console.log('showing:' + feeling.score);
      var view = new elefeely.FeelingView({ model: feeling });
      this.$('#feelings').append(view.render().el);
    }

  });
})();
