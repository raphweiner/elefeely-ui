$(function () {

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


  // feelings = new elefeely.Feelings;

  // feelings.fetch().done(function() {
  //   console.log('fetched ' + feelings.length + ' models from the server');
  // });

    new elefeely.AppView();
});
