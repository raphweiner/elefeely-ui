var elefeely = elefeely || {};

(function () {

  elefeely.CollectiveView = Backbone.View.extend({

    template: Handlebars.compile($('#personal-collective-template').html()),

    events: {
      'click #day-of-week': 'graphDayOfWeek',
      'click #hour-of-day': 'graphHourOfDay',
      'click #overall': 'graphOverall'
    },

    render: function () {
      var that = this;

      this.$el.html(this.template({ view: 'Collective', size: this.collection.size()}));
      this.$graph = this.$('#drawing');

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
        formatter: function (y, data) { return parseInt(y * 100) + '%'}
      });
    },

    graphDayOfWeek: function (e) {
      var data;

      this.toggleActivePill('#day-of-week');

      data = this.collection.dayOfWeek();

      new Morris.Bar({
        element: 'drawing',
        data: data,
        xkey: 'day',
        ykeys: ['feeling'],
        ymax: 5,
        labels: ['Feeling']
      });
    },

    graphHourOfDay: function () {
      var data;

      this.toggleActivePill('#hour-of-day');

      data = this.collection.hourOfDay();

      new Morris.Line({
        element: 'drawing',
        data: data,
        xkey: 'hour',
        ykeys: ['feeling'],
        labels: ['Avg. Feeling'],
        ymax: 5,
        parseTime: false
      });
    },

    toggleActivePill: function (id) {
      this.clearGraph();
      this.$('.toggle-pill').removeClass('active');
      this.$(id).addClass('active');

      if (id === '#overall') {
        this.$('#graphLegend').hide()
      } else if (id === '#hour-of-day' || id === '#day-of-week' ) {
        this.$('#graphLegend').fadeIn(1000)
      };
    },

    clearGraph: function () {
      this.$graph.html('');
    }
  });
})();
