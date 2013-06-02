var elefeely = elefeely || {};

(function () {

    elefeely.Feelings = Backbone.Collection.extend({
        model: elefeely.Feeling,
        url: '/feelings'
    });

})();
