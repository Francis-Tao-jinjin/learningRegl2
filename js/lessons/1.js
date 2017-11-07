const regl = require('regl')();

regl.frame(function () {
  regl.clear({
    color: [0, 0.5*(1.0 + Math.cos(Date.now() * 0.01)), 1, 1]
  });
});