var regl = require('regl')();

/*
In regl, you write commands to tell the GPU how to render objects. 
Each command contains a vertex and fragment shader, which tells 
the GPU what to draw. Shaders are tiny programs that run on the GPU 
written in a special language called GLSL.
*/

var drawTriangle = regl({
  vert: `
    precision mediump float;
    uniform float scale;
    attribute vec2 position;
    attribute vec3 color;
    varying vec3 fcolor;
    void main() {
      fcolor = color;
      gl_Position = vec4(scale * position, 0, 1);
    }
  `,
  frag: `
    precision mediump float;
    varying vec3 fcolor;
    void main() {
      gl_FragColor = vec4(fcolor, 1);
    }
  `,
  attributes: {
    position: [
      [1,0],
      [0,1],
      [-1, -1]
    ],
    color: [
      [1, 0, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
  },
  uniforms: {
    scale: 0.5
  },
  count: 3
});

regl.frame(function() {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  });

  drawTriangle();
});

