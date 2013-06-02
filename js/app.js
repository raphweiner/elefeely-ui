var elefeely = window.elefeely || {};

$(function () {

  elefeely.on = Backbone.Events.on;
  elefeely.off = Backbone.Events.off;
  elefeely.trigger = Backbone.Events.trigger;

  $.ajaxSetup({
    statusCode: {
      401: function () {
        window.location.replace('#login');
      },
      403: function () {
        window.location.replace('#denied');
      }
    }
  });

  elefeely.autoSignIn(function() {
    elefeely.appView = new elefeely.AppView();

    new elefeely.Router();
    Backbone.history.start();
  });
});
