import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    // lifted from https://codepen.io/loktar00/pen/CHpGo
      (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback) {
          window.setTimeout(callback, 1000 / 60);
      };
      window.requestAnimationFrame = requestAnimationFrame;
  })();


  var flakes = [],
      canvas = document.getElementById("snowfall"),
      ctx = canvas.getContext("2d"),
      flakeCount = 100,
      mX = -10,
      mY = -10

      canvas.width = window.innerWidth;
      canvas.height = 400;

  function snow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < flakeCount; i++) {
          var flake = flakes[i],
              x = mX,
              y = mY,
              minDist = 100,
              x2 = flake.x,
              y2 = flake.y;

          var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
              dx = x2 - x,
              dy = y2 - y;

          if (dist < minDist) {
              var force = minDist / (dist * dist),
                  xcomp = (x - x2) / dist,
                  ycomp = (y - y2) / dist,
                  deltaV = force / 2;

              flake.velX -= deltaV * xcomp;
              flake.velY -= deltaV * ycomp;

          } else {
              flake.velX *= .18;
              if (flake.velY <= flake.speed) {
                  flake.velY = flake.speed
              }
              flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
          }

          ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
          flake.y += flake.velY;
          flake.x += flake.velX;

          if (flake.y >= canvas.height || flake.y <= 0) {
              reset(flake);
          }


          if (flake.x >= canvas.width || flake.x <= 0) {
              reset(flake);
          }

          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
          ctx.fill();
      }
      requestAnimationFrame(snow);
  };

  function reset(flake) {
      flake.x = Math.floor(Math.random() * canvas.width);
      flake.y = 0;
      flake.size = (Math.random() * 3) + 1;
      flake.speed = (Math.random() * 1) + 0.1;
      flake.velY = flake.speed;
      flake.velX = 0;
      flake.opacity = (Math.random() * 0.5) + 0.3;
  }

  function init() {
      for (var i = 0; i < flakeCount; i++) {
          var x = Math.floor(Math.random() * canvas.width),
              y = Math.floor(Math.random() * canvas.height),
              size = (Math.random() * 0.1) + 1,
              speed = (Math.random() * 0.1) + 0.05,
              opacity = (Math.random() * 0.5) + 0.3;

          flakes.push({
              speed: speed,
              velY: speed,
              velX: 0,
              x: x,
              y: y,
              size: size,
              stepSize: (Math.random()) / 30,
              step: 0,
              opacity: opacity
          });
      }

      snow();
  };

  canvas.addEventListener("mousemove", function(e) {
      mX = e.clientX,
      mY = e.clientY
  });

  init();
  }
});
