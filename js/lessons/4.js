var regl = require('regl')(document.getElementById('regl-wrap'));
const drawTriangle = regl({
  vert:`
  precision mediump float;
  uniform float tick;
  attribute vec2 position;
  attribute vec3 color;
  varying vec3 fcolor;
  void main() {
    fcolor = color;
    float scale = cos(0.01 * tick);
    gl_Position = vec4(scale*position, 0, 1);
  }
  `,
  frag:`
  precision mediump float;
  varying vec3 fcolor;
  void main() {
    gl_FragColor = vec4(sqrt(fcolor), 1);
  }
  `,
  attributes: {
    position: [
      [1, 0],
      [0, 1],
      [-1, -1]
    ],
    color: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  },
  uniforms: {
    tick: regl.context('tick')
  },
  count: 3
});

regl.frame(() => {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  })
  drawTriangle();
})
