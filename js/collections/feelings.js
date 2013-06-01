var elefeely = elefeely || {};

(function () {

  elefeely.Feelings = Backbone.Collection.extend({
    model: elefeely.Feeling,
    url: 'http://elefeely-api.herokuapp.com/feelings'
  });

})();
