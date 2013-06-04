var elefeely = elefeely || {};

(function () {

  elefeely.Feelings = Backbone.Collection.extend({

    model: elefeely.Feeling,

    initialize: function () {
      _.bindAll(this, 'overall');
    },

    overall: function () {
      var grouped,
          total = this.size(),
          categories = { '1' : 'Sad',
                         '2' : 'Tired',
                         '3' : 'Okay',
                         '4' : 'Good',
                         '5' : 'Awesome' };

      grouped = _.countBy(this.models, function(feeling) {
        return feeling.get('score');
      });
      // {1 => 0.3, 2 => 0.1, 3 => 0.2, 4 => 0.3, 5 => 0.1}, key is score, value is percent

      return _.reduce(grouped, function (memo, value, key) {
        memo.push({ label: categories[key.toString()], value: (value / total).toFixed(2) })
        return memo;
      }, []);
    },

    timeOfDay: function () {
      // {0 => 1-5, 1 => 1-5, ..} (key is hour, value is avg_feeling (1-5))
      return this.countBy(function (feeling) {
        return feeling.timeOfDay();
      })
    },

    dayOfWeek: function () {
      var categories = { '0' : 'Sunday',
                         '1' : 'Monday',
                         '2' : 'Tuesday',
                         '3' : 'Wednesday',
                         '4' : 'Thursday',
                         '5' : 'Friday',
                         '6' : 'Saturday' };

      count_by_day = this.countBy(function (feeling) {
        return feeling.dayOfWeek();
      })

      console.log(count_by_day);

      // total_score_by_day = this.reduce(function (memo, value, key) {
      //   memo[]
      //   return memo;
      // }, {})

      // console.log(total_score_by_day);
      // {0 => 1-5, 1 => 1-5, ..} (key is day, value is avg_feeling (1-5))

      return _.reduce(count_by_day, function (memo, value, key) {
        memo.push({ day: categories[key.toString()], feeling: value })
        return memo;
      }, []);
    }
  });

  elefeely.PersonalFeelings = elefeely.Feelings.extend({
    url: '/feelings/me'
  });

  elefeely.CollectiveFeelings = elefeely.Feelings.extend({
    url: '/feelings'
  });

})();
