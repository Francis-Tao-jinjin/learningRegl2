var regl = require('regl')(document.getElementById('regl-wrap'));
/*
In regl, you write commands to tell the GPU how to render objects. 
Each command contains a vertex and fragment shader, which tells 
the GPU what to draw. Shaders are tiny programs that run on the GPU 
written in a special language called GLSL.
*/
var container = document.getElementById('regl-wrap');
var positions = [[1,0], [0,1], [-1, -1]];
var colors = [[1, 0, 0], [0, 1, 1], [0, 0, 1]];



container.addEventListener('click', (e) => {
  console.log("clientX: " + event.clientX +
  " - clientY: " + event.clientY);
  let position = clientPos2normalPos(event.clientX, event.clientY);
  add_point(position[0], position[1]);
});

function clientPos2normalPos(position) {
  let x = (position[0] - window.innerWidth/2) / (window.innerWidth/2) ;
  let y = (position[1] - window.innerHeight/2) / (window.innerHeight/2);
  return [x, y];
}

function add_point(x, y) {
  positions.push([x, y]);
  colors.push([Math.random(), Math.random(), Math.random()]);
  // drawTriangle = generate_cmd();
}

function generate_cmd() {
  console.log(positions);
  console.log(colors);
  
  return regl({
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
      position: positions,
      color: colors,
    },
    uniforms: {
      scale: 0.5
    },
    count: positions.length
  });
}

var drawTriangle = generate_cmd();

regl.frame(function() {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  });

  // drawTriangle();
  generate_cmd()();
});

