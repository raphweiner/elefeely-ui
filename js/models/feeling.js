var elefeely = window.elefeely || {};

(function () {

  elefeely.Feeling = Backbone.Model.extend({
    url: elefeely.apiDirectory.feelings_url.replace(elefeely.url, ''),

    hourOfDay: function () {
      var createdAt = this.createdAt();
      return createdAt.getHours();
    },

    createdAt: function () {
      return new Date(Date.parse(this.get('created_at')));
    },

    dayOfWeek: function () {
      var createdAt = this.createdAt();
      return createdAt.getDay();
    }

  });

})();
