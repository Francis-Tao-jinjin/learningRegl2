var regl = require('regl')(document.getElementById('regl-wrap'));
const mat4 = require('../lib/gl-mat4');
const bunny = require('../lib/mesh/bunny');

const drawBunny = regl({
  vert: `
  precision mediump float;
  attribute vec3 position;
  uniform mat4 model, view, projection;
  void main() {
    gl_Position = projection * view * model * vec4(position, 1);
  }
  `,
  frag: `
  precision mediump float;
  uniform vec3 color;
  void main() {
    gl_FragColor = vec4(color, 1);
    // gl_FragColor = vec4(1, 1, 1, 1);
  }
  `,
  attributes: {
    position: bunny.positions
  },

  elements: bunny.cells,

  uniforms: {
    // model: mat4.identity([]),
    model: ({tick}) => {
      const t = 0.01 * tick;
      var mv = mat4.identity([]);
      return mat4.rotateZ(
        [],
        mv,
        -1
      );
    },
    view: ({tick}) => {
      const t = 0.01 * tick;
      return mat4.lookAt([],
        [30*Math.cos(t), 2.5, 30*Math.sin(t)],
        [0, 5, 0],
        [0, 1, 0]);
    },
    projection: ({viewportWidth, viewportHeight}) => {
      return mat4.perspective([],
        Math.PI/4,
        viewportWidth/viewportHeight,
        0.01,
        1000);
    },
    color: () => [Math.random(), Math.random(), Math.random()]
  }
});

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  });

  drawBunny();
})