window.signIn = function(done) {
    var accessToken = $.cookie('access_token');

    if ( accessToken ) {
        $.getJSON('/people/me').done(function (data) {
            window.currentUser = new User(data);
            done();
        });
    } else {
        done();
    }
};


signIn(function() {
    new elefeely.AppView();
});

var myAjax = function(options) {
    options = options || {};
    options.url = 'https://elefeely.com' + options.url;
    if(currentUser) {
        // TODO: attach currentUser.get('token') to query string or header
    }
    $.ajax(options);
};

Backbone.ajax = myAjax; // override to include currentUser's token
