var elefeely = window.elefeely || {};

elefeely.url = 'http://elefeely-api.herokuapp.com';

$.ajax({
  async: false,
  type: 'GET',
  url: elefeely.url,
  success: function(data) {
    elefeely.apiDirectory = data;
  }
});

var getAccessToken = function() {
  return $.cookie('token');
};

var myAjax = function(options) {
  options = options || {};
  options.url = elefeely.url + options.url;

  var accessToken = getAccessToken();

  if ( accessToken ) {
    options.url += '?token=' + accessToken;
  }

  $.ajax(options);
};

Backbone.ajax = myAjax; // override to include currentUser's token

elefeely.setCurrentUser = function(data) {
  $.cookie('token', data.token);
  elefeely.currentUser = new elefeely.User(data);
  elefeely.trigger('auth:changed');
};

elefeely.signOut = function() {
  $.removeCookie('token');
  elefeely.currentUser = null
  elefeely.trigger('auth:changed');
  window.location.hash = '';
  window.location.reload();
};

elefeely.autoSignIn = function(done) {
  var accessToken = getAccessToken(),
      user;

  if ( accessToken ) {
    user = new elefeely.User({ token: accessToken });

    user.fetch({
      success: function() {
        elefeely.setCurrentUser(user.attributes);
        done();
      },
      error: function () {
        $.removeCookie('token');
        done();
      }
    });
  } else {
    done();
  }
};
