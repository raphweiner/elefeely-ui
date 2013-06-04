var elefeely = elefeely || {};

(function () {

  elefeely.CollectiveView = Backbone.View.extend({

    template: Handlebars.compile($('#personal-collective-template').html()),

    events: {
      'click #day-of-week': 'graphDayOfWeek',
      'click #time-of-day': 'graphTimeOfDay',
      'click #overall': 'graphOverall'
    },

    render: function () {
      var that = this;

      this.$el.html(this.template({ view: 'Collective'}));

      setTimeout(function() {
        that.graphOverall();
      }, 0);

      return this;
    },

    graphOverall: function () {
      var data;

      this.toggleActivePill('#overall');

      data = this.collection.overall();

      new Morris.Donut({
        element: 'drawing',
        data: data,
      });
    },

    graphDayOfWeek: function (e) {
      var data;

      this.toggleActivePill('#day-of-week');

      data = this.collection.dayOfWeek();
      console.log(data);
      // data =  [
      //     { day: 'Sunday', feeling: 4 },
      //     { day: 'Monday', feeling: 3 },
      //     { day: 'Tuesday', feeling: 2 },
      //     { day: 'Wednesday', feeling: 3 },
      //     { day: 'Thursday', feeling: 5 },
      //     { day: 'Friday', feeling: 1 },
      //     { day: 'Saturday', feeling: 2 }
      //   ]

      new Morris.Bar({
        element: 'drawing',
        data: data,
        xkey: 'day',
        ykeys: ['feeling'],
        labels: ['Feeling']
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
