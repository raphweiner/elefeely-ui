var elefeely = elefeely || {};

(function () {

  elefeely.User = Backbone.Model.extend({
    url: elefeely.apiDirectory.current_user_url.replace(elefeely.url, ''),

    initialize: function () {
      _.bindAll(this, 'avatar');
    },

    avatar: function () {
      return "http://gravatar.com/avatar/" + CryptoJS.MD5(this.get('email'));
    }
  });

})();
