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

      return _.reduce(grouped, function (memo, value, key) {
        memo.push({ label: categories[key.toString()], value: (value / total).toFixed(2) })
        return memo;
      }, []);
    },

    hourOfDay: function () {
      var grouped;

      grouped = this.groupBy(function (feeling) {
        return feeling.hourOfDay();
      })

      return _.reduce(grouped, function (memo, value, key) {

        total_score = _.reduce(value, function (sum, feeling) {
                        sum = sum + feeling.attributes.score;
                        return sum
                      }, 0);

        memo.push({ hour: key.toString() + 'h',
                    feeling: (total_score / value.length).toFixed(2) });

        return memo
      }, []);
    },

    dayOfWeek: function () {
      var grouped,
          categories = { '0' : 'Sunday',
                         '1' : 'Monday',
                         '2' : 'Tuesday',
                         '3' : 'Wednesday',
                         '4' : 'Thursday',
                         '5' : 'Friday',
                         '6' : 'Saturday' };

      grouped = this.groupBy(function (feeling) {
        return feeling.dayOfWeek();
      });

      return _.reduce(grouped, function (memo, value, key) {

        total_score = _.reduce(value, function (sum, feeling) {
                        sum = sum + feeling.attributes.score;
                        return sum
                      }, 0);

        memo.push({ day: categories[key.toString()],
                    feeling: (total_score / value.length).toFixed(2) });

        return memo
      }, []);
    }
  });

  elefeely.PersonalFeelings = elefeely.Feelings.extend({
    url: elefeely.apiDirectory.current_user_feelings_url.replace(elefeely.url, '')
  });

  elefeely.CollectiveFeelings = elefeely.Feelings.extend({
    url: elefeely.apiDirectory.feelings_url.replace(elefeely.url, '')
  });

})();
