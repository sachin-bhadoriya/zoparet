// Change this value from any script to adjust the grid spacing in CSS pixels.
window.GRID_SIZE = 48;
window.GRID_LINE_WIDTH = 1;
window.GRID_LINE_OPACITY = 0.3;
window.GRID_POINT_SIZE = 1;
window.GRID_POINT_OPACITY = 1;
window.GRID_DIAGONAL_ANGLE = 45;
window.GRID_HOVER_RADIUS = 500;
window.GRID_HOVER_STRENGTH = 0.72;
window.GRID_HOVER_EASING = 0.12;
window.GRID_HOVER_DIM_OPACITY = 0.5;


import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const container = document.querySelector('.canvas_grid_box');
const renderer = new THREE.WebGLRenderer({
  canvas: container.querySelector('canvas'),
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 1);

const scene = new THREE.Scene();
const camera = new THREE.Camera();

const depthMap = new THREE.TextureLoader().load('./assets/depth_map.png', renderGrid);
depthMap.colorSpace = THREE.NoColorSpace;
depthMap.minFilter = THREE.LinearFilter;
depthMap.magFilter = THREE.LinearFilter;

const sharedUniforms = {
  depthMap: { value: depthMap },
  viewportSize: { value: new THREE.Vector2(1, 1) },
  resolution: { value: new THREE.Vector2(1, 1) },
  pointerPosition: { value: new THREE.Vector2() },
  pointerDirection: { value: new THREE.Vector2(1, 0) },
  pointerInfluence: { value: 0 },
  hoverRadius: { value: window.GRID_HOVER_RADIUS },
  hoverStrength: { value: window.GRID_HOVER_STRENGTH },
  hoverDimOpacity: { value: window.GRID_HOVER_DIM_OPACITY },
};

const vertexShader = `
uniform vec2 viewportSize;
uniform vec2 pointerPosition;
uniform vec2 pointerDirection;
uniform float pointerInfluence;
uniform float hoverRadius;
uniform float hoverStrength;
varying float vDistortion;

vec2 displacePoint(vec2 point) {
vec2 offset = point - pointerPosition;
float distanceToPointer = length(offset);
float normalizedDistance = clamp(
distanceToPointer / max(hoverRadius, 1.0), 0.0, 1.0
);
float sphereProfile = 1.0 - normalizedDistance * normalizedDistance;
sphereProfile *= sphereProfile;
vDistortion = pointerInfluence * sphereProfile;

vec2 pushDirection = distanceToPointer > 0.5
? offset / distanceToPointer
: pointerDirection;
float pushDistance = hoverRadius * hoverStrength * 0.22 * vDistortion;
return point + pushDirection * pushDistance;
}

void main() {
vec2 displaced = displacePoint(position.xy);
vec2 clipPosition = displaced / (viewportSize * 0.5);
gl_Position = vec4(clipPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D depthMap;
uniform vec2 resolution;
uniform float opacity;
uniform float hoverDimOpacity;
varying float vDistortion;

void main() {
vec2 screenUv = gl_FragCoord.xy / resolution;
float depthFilter = texture2D(depthMap, screenUv).r;
float distortionFade = mix(
1.0,
hoverDimOpacity,
smoothstep(0.0, 1.0, vDistortion)
);
float alpha = opacity * depthFilter * distortionFade;
gl_FragColor = vec4(vec3(1.0), alpha);
}
`;

const lineMaterial = new THREE.ShaderMaterial({
  uniforms: {
    ...sharedUniforms,
    opacity: { value: window.GRID_LINE_OPACITY },
  },
  vertexShader,
  fragmentShader,
  transparent: true,
  depthTest: false,
  depthWrite: false,
});

const pointMaterial = new THREE.ShaderMaterial({
  uniforms: {
    ...sharedUniforms,
    opacity: { value: window.GRID_POINT_OPACITY },
    pointSize: { value: window.GRID_POINT_SIZE },
    pixelRatio: { value: renderer.getPixelRatio() },
  },
  vertexShader: vertexShader.replace(
    'gl_Position = vec4(clipPosition, 0.0, 1.0);',
    `gl_Position = vec4(clipPosition, 0.0, 1.0);
gl_PointSize = pointSize * pixelRatio;`
  ).replace(
    'uniform float hoverStrength;',
    `uniform float hoverStrength;
uniform float pointSize;
uniform float pixelRatio;`
  ),
  fragmentShader,
  transparent: true,
  depthTest: false,
  depthWrite: false,
});

const gridLines = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
const gridPoints = new THREE.Points(new THREE.BufferGeometry(), pointMaterial);
scene.add(gridLines, gridPoints);

const pointer = {
  current: new THREE.Vector2(),
  target: new THREE.Vector2(),
  direction: new THREE.Vector2(1, 0),
  influence: 0,
  targetInfluence: 0,
};

function updatePointer(event) {
  const bounds = container.getBoundingClientRect();
  const nextX = event.clientX - bounds.left - bounds.width * 0.5;
  const nextY = bounds.height * 0.5 - (event.clientY - bounds.top);
  const movementX = nextX - pointer.target.x;
  const movementY = nextY - pointer.target.y;
  const movementLength = Math.hypot(movementX, movementY);

  if (pointer.targetInfluence > 0 && movementLength > 0.01) {
    pointer.direction.set(
      movementX / movementLength,
      movementY / movementLength
    );
  }

  pointer.target.set(
    nextX,
    nextY
  );

  if (pointer.targetInfluence === 0) {
    pointer.current.copy(pointer.target);
  }

  pointer.targetInfluence = 1;
}

container.addEventListener('pointerenter', updatePointer);
container.addEventListener('pointermove', updatePointer);
container.addEventListener('pointerleave', () => {
  pointer.targetInfluence = 0;
});

function renderGrid() {
  renderer.render(scene, camera);
}

function addSegment(positions, x1, y1, x2, y2) {
  positions.push(x1, y1, 0, x2, y2, 0);
}

function rebuildGridGeometry(width, height) {
  const gridSize = Math.max(window.GRID_SIZE, 1);
  const minX = Math.floor((-width * 0.5) / gridSize) * gridSize - gridSize;
  const maxX = Math.ceil((width * 0.5) / gridSize) * gridSize + gridSize;
  const minY = Math.floor((-height * 0.5) / gridSize) * gridSize - gridSize;
  const maxY = Math.ceil((height * 0.5) / gridSize) * gridSize + gridSize;
  const linePositions = [];
  const pointPositions = [];

  for (let y = minY; y < maxY; y += gridSize) {
    for (let x = minX; x < maxX; x += gridSize) {
      addSegment(linePositions, x, y, x + gridSize, y);
      addSegment(linePositions, x, y, x, y + gridSize);
      addSegment(linePositions, x, y, x + gridSize, y + gridSize);
      addSegment(linePositions, x + gridSize, y, x, y + gridSize);
    }
  }

  for (let y = minY; y <= maxY; y += gridSize) {
    for (let x = minX; x <= maxX; x += gridSize) {
      pointPositions.push(x, y, 0);
    }
  }

  gridLines.geometry.dispose();
  gridPoints.geometry.dispose();
  gridLines.geometry = new THREE.BufferGeometry();
  gridPoints.geometry = new THREE.BufferGeometry();
  gridLines.geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(linePositions, 3)
  );
  gridPoints.geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(pointPositions, 3)
  );
}

function animateGrid() {
  const easing = THREE.MathUtils.clamp(window.GRID_HOVER_EASING, 0.01, 1);
  pointer.current.lerp(pointer.target, easing);
  pointer.influence = THREE.MathUtils.lerp(
    pointer.influence,
    pointer.targetInfluence,
    easing
  );

  if (Math.abs(pointer.influence - pointer.targetInfluence) < 0.001) {
    pointer.influence = pointer.targetInfluence;
  }

  sharedUniforms.pointerPosition.value.copy(pointer.current);
  sharedUniforms.pointerDirection.value.copy(pointer.direction);
  sharedUniforms.pointerInfluence.value = pointer.influence;
  sharedUniforms.hoverRadius.value = window.GRID_HOVER_RADIUS;
  sharedUniforms.hoverStrength.value = window.GRID_HOVER_STRENGTH;
  sharedUniforms.hoverDimOpacity.value = THREE.MathUtils.clamp(
    window.GRID_HOVER_DIM_OPACITY,
    0,
    1
  );
  renderGrid();
  requestAnimationFrame(animateGrid);
}

function resizeGrid() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height, false);
  renderer.getDrawingBufferSize(sharedUniforms.resolution.value);
  sharedUniforms.viewportSize.value.set(width, height);
  sharedUniforms.hoverRadius.value = window.GRID_HOVER_RADIUS;
  sharedUniforms.hoverStrength.value = window.GRID_HOVER_STRENGTH;
  lineMaterial.uniforms.opacity.value = window.GRID_LINE_OPACITY;
  lineMaterial.linewidth = window.GRID_LINE_WIDTH;
  pointMaterial.uniforms.opacity.value = window.GRID_POINT_OPACITY;
  pointMaterial.uniforms.pointSize.value = window.GRID_POINT_SIZE;
  pointMaterial.uniforms.pixelRatio.value = renderer.getPixelRatio();
  rebuildGridGeometry(width, height);
  renderGrid();
}

window.updateGrid = resizeGrid;
window.addEventListener('resize', resizeGrid);
resizeGrid();
animateGrid();