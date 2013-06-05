var elefeely = elefeely || {};

(function () {

  elefeely.PersonalView = Backbone.View.extend({

    template: Handlebars.compile($('#personal-collective-template').html()),

    events: {
      'click #day-of-week': 'graphDayOfWeek',
      'click #hour-of-day': 'graphHourOfDay',
      'click #overall': 'graphOverall',
      'click #add-phone': 'addPhone'
    },

    render: function () {
      var that = this;

      this.$el.html(this.template({ view: 'Personal',
                                    size: this.collection.size(),
                                    phone: elefeely.currentUser.get('phone')
                                  }));

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

      this.ifNoData(data);
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

      this.ifNoData(data);
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

      this.ifNoData(data);
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
    },

    ifNoData: function (data) {
      if ( data.length === 0 ) {
        this.$el.html(Handlebars.compile($('#no-data-template').html()));
      }
    },

    addPhone: function () {
      var number = this.$('#number').val();

      if ( number.length !== 10 ) {
        this.$('.phone').addClass('error');
        this.$('.phone-error').html('Please enter a 10 digit number');
      } else {
        this.$('.phone').removeClass('error');
        this.$('.phone-error').html('');

        $.ajax({
          url: elefeely.url + '/phones' + '?token=' + $.cookie('token'),
          type: 'POST',
          dataType: 'json',
          data: { number: number },
          success: function (data) {
            window.location.reload(true);
          },
          error: function (response) {
            var errors = response.responseJSON;

            if (errors.number) {
              $('.phone').addClass('error');
              $('.phone-error').html(errors.number);
            }
          }
        });
      }
    }
  });
})();
