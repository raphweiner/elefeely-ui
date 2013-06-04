var elefeely = elefeely || {};
elefeely.utils = {};

(function () {
  var rectangle = function (context, color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
  }

  elefeely.utils.bar = function (context, max, size, x, y) {
    var canvas_width = 400,
        canvas_height = 250,
        step = (x - 1) * (canvas_width / size),
        width = (canvas_width / size) * (0.8),
        height = -y * (canvas_height / max);

    rectangle(context, "rgb(64, 64, 128)", step, canvas_height, width, height);
  }
})();
