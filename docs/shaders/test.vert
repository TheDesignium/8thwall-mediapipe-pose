#include <common>

varying vec3 v2f_position;
varying vec2 v2f_uv;

void main() {
      v2f_position = position;
      v2f_uv = uv;
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vec4 mvPosition =  viewMatrix * worldPosition;
      gl_Position = projectionMatrix * mvPosition;
}