var elefeely = elefeely || {};
elefeely.utils = {};

(function () {
  var rectangle = function (context, color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
  }

  elefeely.utils.bar = function (context, x, y, max) {
    rectangle(context, "rgb(64, 64, 128)", x*60, 250, 45, -y*(250/max));
  }
})();
