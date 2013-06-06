var elefeely = elefeely || {};

(function () {

  elefeely.GraphView = Backbone.View.extend({

    template: Handlebars.compile($('#graph-template').html()),

    events: {
      'click #day-of-week': 'graphDayOfWeek',
      'click #hour-of-day': 'graphHourOfDay',
      'click #overall': 'graphOverall'
    },

    initialize: function (options) {
      this.viewTitle = options.viewTitle;
      _.bindAll(this, 'render', 'showActiveTab');

      this.listenTo(this.collection, 'add', this.render);
    },

    showActiveTab: function () {
      switch(this.currentView) {
        case '#day-of-week':
          this.graphDayOfWeek();
          break;
        case '#hour-of-day':
          this.graphHourOfDay();
          break;
        default:
          this.graphOverall();
      }
    },

    render: function () {
      this.$el.html(this.template({ view: this.viewTitle, size: this.collection.size()}));
      this.$graph = this.$('#drawing');

      setTimeout(function () {
        this.showActiveTab();
      }.bind(this), 0);

      return this;
    },

    graphOverall: function () {
      var data;

      this.showTab('#overall');
      data = this.collection.overall();

      new Morris.Donut({
        element: 'drawing',
        data: data,
        formatter: function (y, data) { return parseInt(y * 100) + '%'}
      });
    },

    showTab: function (tab) {
      this.currentView = tab;
      this.toggleActivePill(tab);
    },

    graphDayOfWeek: function (e) {
      var data;

      this.showTab('#day-of-week');
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

      this.showTab('#hour-of-day');
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
