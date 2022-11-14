varying vec3 v2f_position;
varying vec2 v2f_uv;

uniform sampler2D cameraTexture;
uniform sampler2D segmentTexture;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
      float _u = map(v2f_uv.x, 0.0, 1.0, 0.15, 0.845);
      vec4 cam = texture2D(cameraTexture, v2f_uv.xy);
      vec4 seg = texture2D(segmentTexture, vec2(_u, v2f_uv.y));
      vec4 tes = vec4(1.0, 0.0, 0.0, 1.0);
      gl_FragColor = mix(cam, seg, seg.x);
      // gl_FragColor = cam;//seg;
}