var elefeely = elefeely || {};

(function () {

  elefeely.User = Backbone.Model.extend({
    url: '/users/me',

    initialize: function () {
      _.bindAll(this, 'avatar');
    },

    avatar: function () {
      return "http://gravatar.com/avatar/" + CryptoJS.MD5(this.get('email'));
    }
  });

})();
