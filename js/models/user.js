var elefeely = elefeely || {};

(function () {

  elefeely.User = Backbone.Model.extend({
    urlRoot: '/users',

    initialize: function () {
      _.bindAll(this, 'avatar');
    },

    avatar: function () {
      return "http://gravatar.com/avatar/" + CryptoJS.MD5(this.get('email'));
    }
  });

})();
