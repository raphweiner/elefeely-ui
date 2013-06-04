var elefeely = elefeely || {};

(function () {

  elefeely.Feelings = Backbone.Collection.extend({

    model: elefeely.Feeling,

    initialize: function () {
      _.bindAll(this, 'overall');
    },

    overall: function () {
      // {1 => 0.3, 2 => 0.1, 3 => 0.2, 4 => 0.3, 5 => 0.1}, key is score, value is percent
      var grouped,
          total = this.size();

      grouped = _.countBy(this.models, function(feeling) {
        return feeling.get('score');
      });

      return _.reduce(grouped, function (memo, value, key) {
        memo[key] = (value / total);
        return memo;
      }, {});
    },

    timeOfDay: function () {
      // {0 => 1-5, 1 => 1-5, ..} (key is hour, value is avg_feeling (1-5))
      return this.countBy(function (feeling) {
        return feeling.timeOfDay();
      })
    },

    dayOfWeek: function () {
      // {0 => 1-5, 1 => 1-5, ..} (key is day, value is avg_feeling (1-5))
      return this.countBy(function (feeling) {
        return feeling.dayOfWeek();
      })
    }
  });

  elefeely.PersonalFeelings = elefeely.Feelings.extend({
    url: '/feelings/me'
  });

  elefeely.CollectiveFeelings = elefeely.Feelings.extend({
    url: '/feelings'
  });

})();
