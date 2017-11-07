var regl = require('regl')(document.getElementById('regl-wrap'));

const COLORS = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1]
]

const drawTriangle = regl({
  vert: `
  precision mediump float;
  uniform vec2 translate;
  uniform vec2 scale;
  attribute vec2 position;
  void main () {
    gl_Position = vec4(scale * position + translate, 0, 1);
  }
  `,

  frag: `
  precision mediump float;
  uniform vec3 color;
  void main () {
    gl_FragColor = vec4(color, 1);
  }
  `,

  attributes: {
    position: [
      [1, 0],
      [0, 1],
      [-1, -1]
    ]
  },

  uniforms: {
    translate: ({tick}, props, batchId) => [Math.cos(0.1*batchId*tick), Math.sin(0.1*tick)] ,
    scale: ({tick}, {scale}) => [Math.cos(0.01 * tick)*scale, Math.sin(0.03*tick)*scale], // [0.3*Math.cos(0.8*tick) + scale, scale]
    // scale: regl.prop('scale'),
    color: (context, props, batchId) => COLORS[batchId]
    // batchId: which is the index of the draw command in the batch
  },

  count: 3
})

const draw = regl({
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    uniform float angle;
    uniform vec2 offset;
    void main() {
      gl_Position = vec4(
        cos(angle) * position.x + sin(angle) * position.y + offset.x,
        -sin(angle) * position.x + cos(angle) * position.y + offset.y, 0, 1);
    }`,

  attributes: {
    position: [
      0.5, 0,
      0, 0.5,
      1, 1]
  },

  uniforms: {
    // the batchId parameter gives the index of the command
    color: ({tick}, props, batchId) => [
      Math.sin(0.02 * ((0.1 + Math.sin(batchId)) * tick + 3.0 * batchId)),
      Math.cos(0.02 * (0.02 * tick + 0.1 * batchId)),
      Math.sin(0.02 * ((0.3 + Math.cos(2.0 * batchId)) * tick + 0.8 * batchId)),
      1
    ],
    angle: ({tick}) => 0.01 * tick,
    offset: regl.prop('offset')
  },

  depth: {
    enable: false
  },

  count: 3
})

regl.frame(({tick}) => {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  })

  drawTriangle([
    {scale: 0.5},
    {scale: 0.4},
    {scale: 0.5},
    {scale: 0.4},
    {scale: 0.5},
    {scale: 0.4},
  ]);

  // This tells regl to execute the command once for each object
  draw([
    { offset: [-1, -1] },
    { offset: [-1, 0] },
    { offset: [-1, 1] },
    { offset: [0, -1] },
    { offset: [0, 0] },
    { offset: [0, 1] },
    { offset: [1, -1] },
    { offset: [1, 0] },
    { offset: [1, 1] }
  ]);
})