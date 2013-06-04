var elefeely = elefeely || {};

(function () {

  elefeely.CollectiveView = Backbone.View.extend({

    template: Handlebars.compile($('#collective-template').html()),

    events: {
      'click #day-of-week': 'graphDayOfWeek',
      'click #time-of-day': 'graphTimeOfDay',
      'click #overall': 'graphOverall'
    },

    render: function () {
      console.log("render collective");
      this.$el.html(this.template());
      this.graphOverall();

      return this;
    },

    graphOverall: function () {
      var canvas = this.$("#drawing").get(0),
          context = canvas.getContext("2d"),
          data,
          max;

      this.toggleActivePill('#overall');

      data = this.collection.overall();
      max = _.max(data);

      _.each(data, function (count, score) {
        elefeely.utils.bar(context, score, count, max);
      });
    },

    graphDayOfWeek: function (e) {
      this.toggleActivePill('#day-of-week');

      var dow =  this.collection.dayOfWeek();
      console.log(dow);
      // Write new rectangle implementation with 7 bars
    },

    graphTimeOfDay: function () {
      this.toggleActivePill('#time-of-day');

      var tod = this.collection.timeOfDay();
      console.log(tod);
      // Write new rectangle implementation with 24 bars
    },

    toggleActivePill: function (id) {
      this.$('.toggle-pill').removeClass('active');
      this.$(id).addClass('active');
    }

  });
})();
