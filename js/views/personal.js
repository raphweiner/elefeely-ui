var elefeely = elefeely || {};

(function () {

  elefeely.PersonalView = Backbone.View.extend({

    template: Handlebars.compile($('#personal-collective-template').html()),

    events: {
      'click #day-of-week': 'graphDayOfWeek',
      'click #time-of-day': 'graphTimeOfDay',
      'click #overall': 'graphOverall'
    },

    render: function () {
      this.$el.html(this.template({ view: 'Personal'}));
      this.graphOverall();

      return this;
    },

    graphOverall: function () {
      var canvas = this.$("#drawing").get(0),
          context = canvas.getContext("2d"),
          data,
          max;

      this.toggleActivePill('#overall');
      this.clearCanvas(canvas);

      data = this.collection.overall();
      max = _.max(data);

      _.each(data, function (score_percent, score) {
        elefeely.utils.bar(context, max, 5, score, score_percent);
      });
    },

    graphDayOfWeek: function (e) {
      var canvas = this.$("#drawing").get(0),
          context = canvas.getContext("2d"),
          data,
          max;

      this.toggleActivePill('#day-of-week');
      this.clearCanvas(canvas);

      data = this.collection.dayOfWeek();
      max = _.max(data);

      _.each(data, function (avg_score, day_of_week) {
        elefeely.utils.bar(context, max, 7, day_of_week, avg_score);
      });
    },

    graphTimeOfDay: function () {
      var canvas = this.$("#drawing").get(0),
          context = canvas.getContext("2d"),
          data,
          max;

      this.toggleActivePill('#time-of-day');
      this.clearCanvas(canvas);

      data = this.collection.timeOfDay();
      max = _.max(data);

      _.each(data, function (avg_score, time_of_day) {
        elefeely.utils.bar(context, max, 24, time_of_day, avg_score);
      });
    },

    toggleActivePill: function (id) {
      this.$('.toggle-pill').removeClass('active');
      this.$(id).addClass('active');
    },

    clearCanvas: function (canvas) {
      canvas.width = canvas.width;
    }

  });
})();
