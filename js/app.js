var elefeely = window.elefeely || {};

$(function () {

  elefeely.on = Backbone.Events.on;
  elefeely.off = Backbone.Events.off;
  elefeely.trigger = Backbone.Events.trigger;

  elefeely.pusher = new Pusher('04a0ef97e7f6ccaab599');

  elefeely.autoSignIn(function() {
    elefeely.appView = new elefeely.AppView();

    new elefeely.Router();
    Backbone.history.start();
  });
});
