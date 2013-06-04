var elefeely = elefeely || {};

(function () {

  elefeely.Feelings = Backbone.Collection.extend({

    model: elefeely.Feeling,

    initialize: function () {
      _.bindAll(this, 'overall');
      // this.on('all', this.overall, this);
    },

    overall: function () {
      // {1 => 0.3, 2 => 0.1, 3 => 0.2, 4 => 0.3, 5 => 0.1}
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
      // {1 => 1-5, 2 => 1-5, ..} (key is hour, value is avg. feeling (1-5))
      return this.countBy(function (feeling) {
        return feeling.timeOfDay();
      })
    },

    dayOfWeek: function () {
      // {'Mon' => 1-5, 'Tue' => 1-5, } (key is day, value is avg. feeling (1-5))
      return this.countBy(function (feeling) {
        return feeling.dayOfWeek();
      })
    }
  });

  elefeely.PersonalFeelings = elefeely.Feelings.extend({
    url: '/me/feelings'
  });

  elefeely.CollectiveFeelings = elefeely.Feelings.extend({
    url: '/feelings'
  });

})();
