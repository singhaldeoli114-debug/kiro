import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const dom = {
  canvas: document.querySelector('#experience-canvas'),
  entry: document.querySelector('#entry'),
  entryActions: document.querySelector('#entry-actions'),
  loadingBar: document.querySelector('#loading-bar'),
  loadingLabel: document.querySelector('#loading-label'),
  loadingPercent: document.querySelector('#loading-percent'),
  fallback: document.querySelector('#fallback'),
  ui: document.querySelector('#experience-ui'),
  sceneCopy: document.querySelector('#scene-copy'),
  sceneOverline: document.querySelector('#scene-overline'),
  sceneTitle: document.querySelector('#scene-title'),
  sceneDescription: document.querySelector('#scene-description'),
  sceneMeta: document.querySelector('#scene-meta'),
  sceneAction: document.querySelector('#scene-action'),
  skipIntro: document.querySelector('#skip-intro'),
  exploreHint: document.querySelector('#explore-hint'),
  soundToggle: document.querySelector('#sound-toggle'),
  qualityToggle: document.querySelector('#quality-toggle'),
  detailsDialog: document.querySelector('#details-dialog'),
  rsvpDialog: document.querySelector('#rsvp-dialog'),
  journeyProgress: document.querySelector('#journey-progress')
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobileDevice = window.matchMedia('(max-width: 800px), (pointer: coarse)').matches;
const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 4;
let quality = mobileDevice || lowPowerDevice ? 'lite' : 'high';

let renderer;
let composer;
let bloomPass;
let scene;
let camera;
let controls;
let clock;
let world;
let skyMaterial;
let hemisphereLight;
let keyLight;
let gateLeft;
let gateRight;
let petals;
let petalVelocity;
let fireMeshes = [];
let animatedLanterns = [];
let sangeetLights = [];
let coupleGroup;
let mandapGroup;
let started = false;
let introActive = false;
let introStartedAt = 0;
let transition = null;
let activeRoute = 'arrival';
let soundEnabled = false;
let audioContext;
let audioMaster;
let audioNodes = [];
let renderWithComposer = quality === 'high';

const tempColor = new THREE.Color();
const tempVector = new THREE.Vector3();
const clockVector = new THREE.Vector3();

const routes = {
  arrival: {
    index: 0,
    position: new THREE.Vector3(0, 5.6, 16),
    target: new THREE.Vector3(0, 4.5, -19),
    overline: 'Welcome to Jaipur',
    title: 'A palace written in light',
    description: 'The gates open to three days of music, colour, and a promise for forever.',
    meta: ['20–22 November', 'Rajmahal Palace'],
    action: 'Meet the couple',
    next: 'story',
    skyTop: 0x321133,
    skyBottom: 0xd47468,
    fog: 0x5a2836,
    light: 0xffc88d,
    intensity: 2.7,
    bloom: 0.52
  },
  story: {
    index: 1,
    position: new THREE.Vector3(0, 3.55, -5.8),
    target: new THREE.Vector3(0, 3.1, -14.2),
    overline: 'Two paths · One forever',
    title: 'Aarav & Meera',
    description: 'Five years, twelve cities, and countless cups of chai led us to this moment.',
    meta: ['Written in the stars', 'Made for each other'],
    action: 'Follow the sunshine',
    next: 'haldi',
    skyTop: 0x4c1837,
    skyBottom: 0xe28a73,
    fog: 0x6a3041,
    light: 0xffd0a4,
    intensity: 2.25,
    bloom: 0.58
  },
  haldi: {
    index: 2,
    position: new THREE.Vector3(-14, 5.25, 11),
    target: new THREE.Vector3(-23, 2.5, 0),
    overline: 'Friday · 10:30 in the morning',
    title: 'Haldi in the sun',
    description: 'A courtyard of marigolds, laughter, and a little golden mischief.',
    meta: ['Surya Courtyard', 'Sunshine hues'],
    action: 'Dance beneath the stars',
    next: 'sangeet',
    skyTop: 0x4680a2,
    skyBottom: 0xffc46b,
    fog: 0xd79962,
    light: 0xffe2a1,
    intensity: 3.8,
    bloom: 0.32
  },
  sangeet: {
    index: 3,
    position: new THREE.Vector3(14, 5.2, 11),
    target: new THREE.Vector3(23, 2.55, 0),
    overline: 'Friday · 7:30 in the evening',
    title: 'Sangeet under stars',
    description: 'Music fills the palace as two families become one on the dance floor.',
    meta: ['Sheesh Mahal Lawns', 'Jewel tones'],
    action: 'Witness the vows',
    next: 'wedding',
    skyTop: 0x070a2b,
    skyBottom: 0x40194f,
    fog: 0x171333,
    light: 0x807fff,
    intensity: 1.35,
    bloom: 1.05
  },
  wedding: {
    index: 4,
    position: new THREE.Vector3(0, 5.9, 5.5),
    target: new THREE.Vector3(0, 2.8, -14.5),
    overline: 'Saturday · Pheras at sunset',
    title: 'Seven sacred promises',
    description: 'Beneath the royal mandap, two souls begin one beautiful forever.',
    meta: ['Rajmahal Palace', 'Royal Indian formal'],
    action: 'Respond to our invitation',
    next: 'rsvp',
    skyTop: 0x26071d,
    skyBottom: 0x9c3c43,
    fog: 0x481421,
    light: 0xffa86f,
    intensity: 2.05,
    bloom: 0.82
  }
};

const introPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 5.2, 46),
  new THREE.Vector3(0, 5.0, 34),
  new THREE.Vector3(0, 4.6, 25),
  new THREE.Vector3(0, 4.8, 20),
  routes.arrival.position.clone()
], false, 'catmullrom', .35);

function setProgress(value, label) {
  dom.loadingBar.style.width = `${value}%`;
  dom.loadingPercent.textContent = `${value}%`;
  dom.loadingLabel.textContent = label;
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function showFallback(message = 'Your browser could not start the real-time 3D palace.') {
  dom.entry.hidden = true;
  dom.fallback.hidden = false;
  const copy = dom.fallback.querySelector('p:not(.eyebrow)');
  if (copy) copy.textContent = `${message} You can still view every wedding detail.`;
}

function createCanvasTexture(size, painter) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d');
  painter(context, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = quality === 'high' ? 8 : 2;
  return texture;
}

function createSandstoneTexture() {
  const texture = createCanvasTexture(256, (context, size) => {
    const gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#bd755a');
    gradient.addColorStop(.5, '#d9946a');
    gradient.addColorStop(1, '#a85e4d');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    for (let index = 0; index < 3800; index += 1) {
      const alpha = Math.random() * .07;
      context.fillStyle = Math.random() > .5 ? `rgba(255,235,190,${alpha})` : `rgba(70,22,20,${alpha})`;
      const radius = Math.random() * 1.8;
      context.fillRect(Math.random() * size, Math.random() * size, radius, radius);
    }
    context.strokeStyle = 'rgba(80,35,28,.09)';
    context.lineWidth = 1;
    for (let y = 32; y < size; y += 32) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(size, y + Math.sin(y) * 2);
      context.stroke();
    }
  });
  texture.repeat.set(3, 2);
  return texture;
}

function createTileTexture() {
  const texture = createCanvasTexture(256, (context, size) => {
    context.fillStyle = '#793b37';
    context.fillRect(0, 0, size, size);
    const tile = size / 4;
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 4; column += 1) {
        context.strokeStyle = 'rgba(246,199,124,.36)';
        context.strokeRect(column * tile, row * tile, tile, tile);
        context.beginPath();
        context.arc(column * tile + tile / 2, row * tile + tile / 2, tile * .25, 0, Math.PI * 2);
        context.stroke();
      }
    }
  });
  texture.repeat.set(14, 18);
  return texture;
}

function createPetalTexture() {
  return createCanvasTexture(64, (context, size) => {
    context.clearRect(0, 0, size, size);
    context.save();
    context.translate(size / 2, size / 2);
    context.rotate(Math.PI / 4);
    const gradient = context.createRadialGradient(0, 0, 2, 0, 0, size * .35);
    gradient.addColorStop(0, '#fff2aa');
    gradient.addColorStop(.45, '#efb12e');
    gradient.addColorStop(1, 'rgba(202,70,16,0)');
    context.fillStyle = gradient;
    context.beginPath();
    context.ellipse(0, 0, size * .13, size * .33, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  });
}

function createMaterials() {
  const sandstoneMap = createSandstoneTexture();
  const tileMap = createTileTexture();
  return {
    sandstone: new THREE.MeshStandardMaterial({ color: 0xe0a078, map: sandstoneMap, roughness: .78, metalness: .02 }),
    sandstoneDark: new THREE.MeshStandardMaterial({ color: 0x8f493f, map: sandstoneMap, roughness: .82 }),
    sandstoneLight: new THREE.MeshStandardMaterial({ color: 0xf0c08e, map: sandstoneMap, roughness: .72 }),
    floor: new THREE.MeshStandardMaterial({ color: 0xa95e4c, map: tileMap, roughness: .7 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xd7a64f, metalness: .82, roughness: .25 }),
    darkGold: new THREE.MeshStandardMaterial({ color: 0x9c6429, metalness: .72, roughness: .36 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x4f1b19, roughness: .64, metalness: .04 }),
    door: new THREE.MeshStandardMaterial({ color: 0x5d1425, roughness: .46, metalness: .06 }),
    opening: new THREE.MeshStandardMaterial({ color: 0x13050a, roughness: 1 }),
    foliage: new THREE.MeshStandardMaterial({ color: 0x24472f, roughness: .92 }),
    foliageLight: new THREE.MeshStandardMaterial({ color: 0x46643b, roughness: .9 }),
    water: new THREE.MeshPhysicalMaterial({ color: 0x254f68, roughness: .12, metalness: .18, transmission: .08, transparent: true, opacity: .78, clearcoat: 1, clearcoatRoughness: .08 }),
    marigold: new THREE.MeshStandardMaterial({ color: 0xf2a516, roughness: .67, emissive: 0x8d3500, emissiveIntensity: .18 }),
    marigoldRed: new THREE.MeshStandardMaterial({ color: 0xa72926, roughness: .65 }),
    ivory: new THREE.MeshStandardMaterial({ color: 0xffe5b3, roughness: .66 }),
    crimson: new THREE.MeshStandardMaterial({ color: 0x8e1734, roughness: .58 }),
    magenta: new THREE.MeshStandardMaterial({ color: 0x8b285f, roughness: .52, emissive: 0x2b071d, emissiveIntensity: .22 }),
    purple: new THREE.MeshStandardMaterial({ color: 0x3d225f, roughness: .45, emissive: 0x16082d, emissiveIntensity: .35 }),
    cyanGlow: new THREE.MeshStandardMaterial({ color: 0x9be8ff, emissive: 0x4d9cff, emissiveIntensity: 2.4, roughness: .2 }),
    warmGlow: new THREE.MeshStandardMaterial({ color: 0xffc96b, emissive: 0xff7b20, emissiveIntensity: 2.5, roughness: .2 }),
    skin: new THREE.MeshStandardMaterial({ color: 0xb87355, roughness: .66 }),
    black: new THREE.MeshStandardMaterial({ color: 0x160d10, roughness: .84 })
  };
}

function configureMesh(mesh, cast = true, receive = true) {
  mesh.castShadow = quality === 'high' && cast;
  mesh.receiveShadow = quality === 'high' && receive;
  return mesh;
}

function addMesh(parent, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const mesh = configureMesh(new THREE.Mesh(geometry, material));
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(...scale);
  parent.add(mesh);
  return mesh;
}

function box(parent, material, size, position, rotation = [0, 0, 0]) {
  return addMesh(parent, new THREE.BoxGeometry(...size), material, position, rotation);
}

function cylinder(parent, material, radii, height, position, segments = quality === 'high' ? 24 : 12, rotation = [0, 0, 0]) {
  return addMesh(parent, new THREE.CylinderGeometry(radii[0], radii[1], height, segments), material, position, rotation);
}

function createDome(parent, materials, x, y, z, radius, material = materials.sandstoneLight) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  parent.add(group);
  cylinder(group, materials.darkGold, [radius * 1.08, radius * 1.08], .24, [0, 0, 0]);
  const dome = addMesh(group, new THREE.SphereGeometry(radius, quality === 'high' ? 32 : 16, quality === 'high' ? 16 : 8, 0, Math.PI * 2, 0, Math.PI / 2), material, [0, .1, 0], [0, 0, 0], [1, .78, 1]);
  dome.castShadow = quality === 'high';
  cylinder(group, materials.gold, [.055, .075], radius * .8, [0, radius * .92, 0], 10);
  addMesh(group, new THREE.SphereGeometry(radius * .12, 12, 8), materials.gold, [0, radius * 1.3, 0]);
  return group;
}

function createArch(parent, materials, options = {}) {
  const { x = 0, y = 0, z = 0, scale = 1, depth = .5, material = materials.sandstoneLight, backing = true } = options;
  const group = new THREE.Group();
  group.position.set(x, y, z);
  parent.add(group);
  if (backing) box(group, materials.opening, [3.5 * scale, 4.9 * scale, depth * .7], [0, 2.25 * scale, depth * .2]);
  box(group, material, [.42 * scale, 3.4 * scale, depth], [-1.62 * scale, 1.7 * scale, 0]);
  box(group, material, [.42 * scale, 3.4 * scale, depth], [1.62 * scale, 1.7 * scale, 0]);
  addMesh(group, new THREE.TorusGeometry(1.62 * scale, .22 * scale, 8, quality === 'high' ? 32 : 16, Math.PI), material, [0, 3.38 * scale, 0]);
  box(group, materials.gold, [.08 * scale, 3.15 * scale, depth * 1.06], [-1.31 * scale, 1.72 * scale, -.02]);
  box(group, materials.gold, [.08 * scale, 3.15 * scale, depth * 1.06], [1.31 * scale, 1.72 * scale, -.02]);
  addMesh(group, new THREE.TorusGeometry(1.31 * scale, .06 * scale, 6, quality === 'high' ? 28 : 14, Math.PI), materials.gold, [0, 3.1 * scale, -.02]);
  return group;
}

function createJali(parent, materials, x, y, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  parent.add(group);
  box(group, materials.opening, [1.55 * scale, 2.1 * scale, .18], [0, 0, 0]);
  box(group, materials.gold, [1.75 * scale, .1 * scale, .24], [0, 1.1 * scale, 0]);
  box(group, materials.gold, [1.75 * scale, .1 * scale, .24], [0, -1.1 * scale, 0]);
  box(group, materials.gold, [.1 * scale, 2.3 * scale, .24], [.88 * scale, 0, 0]);
  box(group, materials.gold, [.1 * scale, 2.3 * scale, .24], [-.88 * scale, 0, 0]);
  for (let index = -2; index <= 2; index += 1) {
    box(group, materials.darkGold, [.035 * scale, 2.02 * scale, .23], [index * .28 * scale, 0, -.02], [0, 0, Math.PI / 4]);
    box(group, materials.darkGold, [.035 * scale, 2.02 * scale, .23], [index * .28 * scale, 0, -.02], [0, 0, -Math.PI / 4]);
  }
  return group;
}

function createFlowerString(parent, materials, points, count = 28, alternate = false) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const tube = addMesh(parent, new THREE.TubeGeometry(curve, count, .025, 5, false), materials.foliage);
  tube.castShadow = false;
  const geometry = new THREE.IcosahedronGeometry(.12, quality === 'high' ? 1 : 0);
  for (let index = 0; index < count; index += 1) {
    const point = curve.getPoint(index / Math.max(1, count - 1));
    const flower = addMesh(parent, geometry, alternate && index % 4 === 0 ? materials.marigoldRed : materials.marigold, [point.x, point.y, point.z]);
    flower.scale.setScalar(.75 + Math.random() * .45);
  }
}

function createLantern(parent, materials, x, y, z, light = false, color = 0xffa24d) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  parent.add(group);
  cylinder(group, materials.darkGold, [.24, .18], .12, [0, .38, 0], 10);
  const glow = addMesh(group, new THREE.SphereGeometry(.22, 12, 8), materials.warmGlow, [0, .15, 0], [0, 0, 0], [1, 1.35, 1]);
  cylinder(group, materials.darkGold, [.18, .24], .12, [0, -.08, 0], 10);
  if (light && quality === 'high') {
    const point = new THREE.PointLight(color, 2.2, 7, 2);
    point.position.set(0, .15, 0);
    group.add(point);
  }
  animatedLanterns.push({ group, glow, offset: Math.random() * Math.PI * 2, baseY: y });
  return group;
}

function createTree(parent, materials, x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.scale.setScalar(scale);
  parent.add(group);
  cylinder(group, materials.wood, [.18, .28], 2.8, [0, 1.4, 0], 10);
  const leafGeometry = new THREE.IcosahedronGeometry(1, quality === 'high' ? 2 : 1);
  [[0,3.2,0],[-.7,2.8,.15],[.72,2.9,-.15],[0,3.7,.05]].forEach((position, index) => {
    const leaf = addMesh(group, leafGeometry, index % 2 ? materials.foliageLight : materials.foliage, position);
    leaf.scale.set(1.05, .8, 1.05);
  });
}

function createGate(parent, materials) {
  const group = new THREE.Group();
  group.position.z = 24;
  parent.add(group);
  box(group, materials.sandstoneDark, [15, 1.4, 3.2], [0, 9.7, 0]);
  box(group, materials.sandstone, [4.2, 10.5, 3.4], [-7.2, 5.25, 0]);
  box(group, materials.sandstone, [4.2, 10.5, 3.4], [7.2, 5.25, 0]);
  createDome(group, materials, -7.2, 10.55, 0, 2.05, materials.sandstoneLight);
  createDome(group, materials, 7.2, 10.55, 0, 2.05, materials.sandstoneLight);
  createArch(group, materials, { x: 0, y: .2, z: -1.75, scale: 2.15, depth: .65, material: materials.sandstoneLight, backing: false });
  box(group, materials.sandstone, [2.2, 2.3, 3.5], [-4.6, 1.15, 0]);
  box(group, materials.sandstone, [2.2, 2.3, 3.5], [4.6, 1.15, 0]);
  createJali(group, materials, -7.2, 5.6, -1.75, .72);
  createJali(group, materials, 7.2, 5.6, -1.75, .72);
  createFlowerString(group, materials, [[-5.9,8.1,-1.95],[0,6.4,-1.95],[5.9,8.1,-1.95]], quality === 'high' ? 52 : 28, true);

  gateLeft = new THREE.Group();
  gateLeft.position.set(-3.7, 3.35, -2.05);
  group.add(gateLeft);
  const leftDoor = box(gateLeft, materials.door, [3.7, 6.7, .34], [1.85, 0, 0]);
  gateRight = new THREE.Group();
  gateRight.position.set(3.7, 3.35, -2.05);
  group.add(gateRight);
  const rightDoor = box(gateRight, materials.door, [3.7, 6.7, .34], [-1.85, 0, 0]);

  [leftDoor, rightDoor].forEach((door, doorIndex) => {
    const sign = doorIndex === 0 ? 1 : -1;
    box(door, materials.gold, [.09, 5.8, .39], [sign * 1.45, 0, 0]);
    box(door, materials.gold, [3.1, .09, .39], [0, 2.65, 0]);
    box(door, materials.gold, [3.1, .09, .39], [0, -2.65, 0]);
    for (let y = -2; y <= 2; y += 1) {
      for (let x = -1; x <= 1; x += 1) {
        const stud = addMesh(door, new THREE.SphereGeometry(.085, 8, 6), materials.gold, [x * .92, y * 1.04, .23]);
        stud.castShadow = false;
      }
    }
  });

  createLantern(group, materials, -4.7, 7.8, -2.1, true);
  createLantern(group, materials, 4.7, 7.8, -2.1, true);
  return group;
}

function createPalace(parent, materials) {
  const group = new THREE.Group();
  parent.add(group);
  const facadeZ = -25;

  box(group, materials.sandstoneDark, [44, 1.2, 5.4], [0, .6, facadeZ]);
  box(group, materials.sandstone, [17, 8.5, 4.4], [-13.5, 4.85, facadeZ]);
  box(group, materials.sandstone, [17, 8.5, 4.4], [13.5, 4.85, facadeZ]);
  box(group, materials.sandstoneLight, [3.2, 10.8, 4.8], [-4.7, 5.8, facadeZ - .05]);
  box(group, materials.sandstoneLight, [3.2, 10.8, 4.8], [4.7, 5.8, facadeZ - .05]);
  box(group, materials.sandstoneLight, [12.5, 3.4, 4.8], [0, 10.3, facadeZ - .05]);
  box(group, materials.opening, [6.25, 8.25, .45], [0, 4.12, facadeZ + 2.25]);
  addMesh(group, new THREE.TorusGeometry(3.12, .43, 10, quality === 'high' ? 42 : 20, Math.PI), materials.sandstoneLight, [0, 7.75, facadeZ + 2.55]);
  box(group, materials.sandstoneLight, [.8, 6.2, .8], [-3.12, 3.15, facadeZ + 2.55]);
  box(group, materials.sandstoneLight, [.8, 6.2, .8], [3.12, 3.15, facadeZ + 2.55]);
  addMesh(group, new THREE.TorusGeometry(2.55, .1, 8, quality === 'high' ? 36 : 18, Math.PI), materials.gold, [0, 7.3, facadeZ + 3]);

  [-18.2,-13.8,-9.4,9.4,13.8,18.2].forEach((x) => createArch(group, materials, { x, y: .8, z: facadeZ + 2.3, scale: .72, depth: .42, material: materials.sandstoneLight }));
  [-18,-13.5,-9,9,13.5,18].forEach((x) => createJali(group, materials, x, 6.7, facadeZ + 2.3, .58));

  [-23.5,23.5].forEach((x) => {
    box(group, materials.sandstone, [5.3, 12.6, 5.3], [x, 6.3, facadeZ]);
    createJali(group, materials, x, 5.1, facadeZ + 2.75, .84);
    createDome(group, materials, x, 12.7, facadeZ, 2.7, materials.sandstoneLight);
  });
  createDome(group, materials, 0, 12.15, facadeZ, 4.15, materials.sandstoneLight);

  [-18,-12,-6,6,12,18].forEach((x) => {
    cylinder(group, materials.sandstoneLight, [.18,.22], 1.4, [x,9.55,facadeZ+2.35], 10);
    addMesh(group, new THREE.SphereGeometry(.26,10,7), materials.gold, [x,10.33,facadeZ+2.35]);
  });

  box(group, materials.sandstoneDark, [13, 5.5, 4], [-29, 3.05, -13], [0, .28, 0]);
  box(group, materials.sandstoneDark, [13, 5.5, 4], [29, 3.05, -13], [0, -.28, 0]);
  [-33,-28,-24,24,28,33].forEach((x) => createArch(group, materials, { x, y: .35, z: -10.8 + Math.abs(x) * .015, scale: .65, depth: .35 }));

  createFlowerString(group, materials, [[-4.2,9.2,facadeZ+2.7],[0,7.5,facadeZ+3],[4.2,9.2,facadeZ+2.7]], quality === 'high' ? 44 : 24, true);
  createLantern(group, materials, -3.8, 7.4, facadeZ + 3, true);
  createLantern(group, materials, 3.8, 7.4, facadeZ + 3, true);
  return group;
}

function createCourtyard(parent, materials) {
  const floor = addMesh(parent, new THREE.PlaneGeometry(90, 90), materials.floor, [0, -.02, 0], [-Math.PI / 2, 0, 0]);
  floor.receiveShadow = quality === 'high';
  box(parent, materials.sandstoneLight, [10, .14, 54], [0, .05, 9]);
  const pool = addMesh(parent, new THREE.PlaneGeometry(8, 19), materials.water, [0, .14, 5.5], [-Math.PI / 2, 0, 0]);
  pool.receiveShadow = false;
  box(parent, materials.sandstoneLight, [8.7, .22, .36], [0, .12, 15]);
  box(parent, materials.sandstoneLight, [8.7, .22, .36], [0, .12, -4]);
  box(parent, materials.sandstoneLight, [.36, .22, 19], [-4.18, .12, 5.5]);
  box(parent, materials.sandstoneLight, [.36, .22, 19], [4.18, .12, 5.5]);

  for (let z = 18; z >= -8; z -= 6.5) {
    createLantern(parent, materials, -6.2, 2.25, z, z === 11.5 || z === -1.5);
    createLantern(parent, materials, 6.2, 2.25, z, z === 11.5 || z === -1.5);
  }
  [[-10,16],[10,16],[-12,8],[12,8],[-10,-7],[10,-7],[-32,-2],[32,-2]].forEach(([x,z], index) => createTree(parent, materials, x, z, .75 + (index % 3) * .12));
}

function createStylizedPerson(parent, materials, type, x) {
  const group = new THREE.Group();
  group.position.set(x, .62, -14.1);
  parent.add(group);
  const groom = type === 'groom';
  const outfit = groom ? materials.ivory : materials.crimson;
  if (groom) {
    cylinder(group, outfit, [.5,.72], 2.2, [0,1.65,0], 18);
    box(group, materials.gold, [.08,2.1,.58], [0,1.65,.54]);
    cylinder(group, materials.ivory, [.18,.18], 1.6, [-.58,1.65,0], 12, [0,0,-.08]);
    cylinder(group, materials.ivory, [.18,.18], 1.6, [.58,1.65,0], 12, [0,0,.08]);
    cylinder(group, materials.black, [.18,.2], 1.3, [-.3,.45,0], 10);
    cylinder(group, materials.black, [.18,.2], 1.3, [.3,.45,0], 10);
  } else {
    addMesh(group, new THREE.ConeGeometry(1.18,.1,24), materials.gold, [0,.35,0]);
    addMesh(group, new THREE.ConeGeometry(1.12,2.25,quality === 'high' ? 32 : 16,1,true), outfit, [0,1.38,0]);
    cylinder(group, outfit, [.43,.55], 1.35, [0,2.65,0], 18);
    addMesh(group, new THREE.TorusGeometry(.88,.045,6,28,Math.PI), materials.gold, [0,2.25,.05], [0,0,0]);
    const veil = addMesh(group, new THREE.SphereGeometry(.82,20,12,0,Math.PI*2,0,Math.PI/2), materials.crimson, [0,3.55,0], [0,0,0], [1,1.3,.65]);
    veil.material = materials.crimson.clone();
    veil.material.transparent = true;
    veil.material.opacity = .78;
  }
  addMesh(group, new THREE.SphereGeometry(.39,20,14), materials.skin, [0,3.45,0]);
  if (groom) {
    addMesh(group, new THREE.SphereGeometry(.5,18,10), materials.crimson, [0,3.78,0], [0,0,.08], [1.15,.58,1]);
    addMesh(group, new THREE.ConeGeometry(.07,.78,8), materials.gold, [.37,4.16,0], [0,0,-.2]);
  } else {
    addMesh(group, new THREE.TorusGeometry(.2,.035,6,18,Math.PI), materials.gold, [0,3.58,.38]);
  }
  group.scale.setScalar(1.05);
  return group;
}

function createMandapAndCouple(parent, materials) {
  const group = new THREE.Group();
  mandapGroup = group;
  group.visible = false;
  group.position.set(0, 0, 0);
  parent.add(group);
  box(group, materials.sandstoneLight, [11, .58, 8], [0, .3, -14]);
  box(group, materials.crimson, [9.5, .18, 6.8], [0, .64, -14]);
  const columns = [[-4,-16.8],[4,-16.8],[-4,-11.2],[4,-11.2]];
  columns.forEach(([x,z]) => {
    cylinder(group, materials.gold, [.23,.3], 5.5, [x,3.4,z], 16);
    cylinder(group, materials.crimson, [.3,.36], .45, [x,.88,z], 16);
    cylinder(group, materials.crimson, [.3,.36], .45, [x,5.92,z], 16);
  });
  box(group, materials.crimson, [9.5,.28,7], [0,6.15,-14]);
  const canopy = addMesh(group, new THREE.ConeGeometry(5.7,1.45,4,1,true), materials.crimson, [0,6.8,-14], [0,Math.PI/4,0], [1,1,.72]);
  canopy.material = materials.crimson.clone();
  canopy.material.side = THREE.DoubleSide;
  createFlowerString(group, materials, [[-4,5.85,-16.8],[0,5.15,-16.8],[4,5.85,-16.8]], quality === 'high' ? 34 : 18, true);
  createFlowerString(group, materials, [[-4,5.85,-11.2],[0,5.15,-11.2],[4,5.85,-11.2]], quality === 'high' ? 34 : 18, true);

  coupleGroup = new THREE.Group();
  group.add(coupleGroup);
  createStylizedPerson(coupleGroup, materials, 'groom', -1.05);
  createStylizedPerson(coupleGroup, materials, 'bride', 1.05);

  box(group, materials.darkGold, [2.2,.35,1.45], [0,.88,-11.6]);
  for (let index = 0; index < 4; index += 1) {
    const flame = addMesh(group, new THREE.ConeGeometry(.17 + index * .045,.68 + index * .12,10), index % 2 ? materials.marigold : materials.warmGlow, [0,1.28 + index * .12,-11.6], [0,0,(index-1.5)*.16]);
    fireMeshes.push({ mesh: flame, offset: index * .8, baseY: flame.position.y });
  }
  if (quality === 'high') {
    const fireLight = new THREE.PointLight(0xff7a24, 8, 10, 2);
    fireLight.position.set(0,2,-11.6);
    group.add(fireLight);
  }
  return group;
}

function createHaldiWorld(parent, materials) {
  const group = new THREE.Group();
  group.position.set(-23, 0, 0);
  parent.add(group);
  box(group, materials.sandstoneLight, [12,.48,10], [0,.25,0]);
  box(group, materials.marigold, [10.5,.12,8.5], [0,.55,0]);
  [[-4,-3],[4,-3],[-4,3],[4,3]].forEach(([x,z]) => {
    cylinder(group, materials.ivory, [.16,.2], 5, [x,3.05,z], 14);
    createFlowerString(group, materials, [[x,5.5,z],[x+.22,3.2,z],[x,1,z]], quality === 'high' ? 20 : 10, false);
  });
  const canopy = addMesh(group, new THREE.ConeGeometry(6,1.1,4,1,true), materials.marigold, [0,5.75,0], [0,Math.PI/4,0], [1,1,.78]);
  canopy.material = materials.marigold.clone();
  canopy.material.side = THREE.DoubleSide;
  canopy.material.transparent = true;
  canopy.material.opacity = .86;
  createFlowerString(group, materials, [[-4,5.25,-3],[0,4.45,-3],[4,5.25,-3]], quality === 'high' ? 38 : 20, true);
  createFlowerString(group, materials, [[-4,5.25,3],[0,4.45,3],[4,5.25,3]], quality === 'high' ? 38 : 20, true);
  cylinder(group, materials.gold, [1.25,.86], .68, [0,.95,0], 24);
  cylinder(group, materials.marigold, [1.15,1.15], .14, [0,1.32,0], 24);
  [[-2.7,-1.7],[2.7,-1.7],[-2.7,1.7],[2.7,1.7]].forEach(([x,z],index) => {
    const cushion = box(group,index%2?materials.crimson:materials.magenta,[1.4,.35,1.4],[x,.82,z],[0,index*.3,0]);
    cushion.scale.y=.7;
  });
  createLantern(group, materials, -4.6, 5.9, -3.4, false);
  createLantern(group, materials, 4.6, 5.9, -3.4, false);
  return group;
}

function createSangeetWorld(parent, materials) {
  const group = new THREE.Group();
  group.position.set(23,0,0);
  parent.add(group);
  box(group, materials.purple, [13,.55,10], [0,.28,0]);
  const floor = box(group, materials.black, [8,.12,6], [0,.64,1]);
  for (let x = -3.5; x <= 3.5; x += 1) {
    box(group, x % 2 ? materials.magenta : materials.cyanGlow, [.055,.08,6], [x,.72,1]);
  }
  for (let z = -1.5; z <= 3.5; z += 1) {
    box(group, z % 2 ? materials.magenta : materials.cyanGlow, [8,.08,.055], [0,.72,z]);
  }
  box(group, materials.magenta, [10,.7,3], [0,1,-3]);
  const archGeometry = new THREE.TorusGeometry(3.25,.16,8,quality==='high'?36:18,Math.PI);
  addMesh(group,archGeometry,materials.gold,[0,4.1,-3]);
  box(group,materials.gold,[.3,3.4,.3],[-3.25,2.4,-3]);
  box(group,materials.gold,[.3,3.4,.3],[3.25,2.4,-3]);
  createFlowerString(group,materials,[[-3.1,4.1,-2.8],[0,6,-2.8],[3.1,4.1,-2.8]],quality==='high'?38:20,true);
  for (let index = -4; index <= 4; index += 1) {
    const light = createLantern(group,materials,index*1.25,6 + Math.cos(index*.7)*.55,-1.2,false,index%2?0x9d61ff:0x4edfff);
    light.scale.setScalar(.65);
  }
  if (quality === 'high') {
    [-3.5,3.5].forEach((x,index) => {
      const spot = new THREE.SpotLight(index ? 0xff4fbd : 0x4d9fff,12,35,.32,.7,1);
      spot.position.set(x,7,-1);
      spot.target.position.set(index?2:-2,.5,1);
      group.add(spot,spot.target);
      sangeetLights.push({ light: spot, target: spot.target, offset: index*Math.PI });
    });
  }
  floor.receiveShadow = true;
  return group;
}

function createParticles(parent) {
  const count = quality === 'high' ? 320 : 110;
  const positions = new Float32Array(count * 3);
  petalVelocity = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    positions[index*3] = (Math.random()-.5)*70;
    positions[index*3+1] = Math.random()*14+.5;
    positions[index*3+2] = (Math.random()-.5)*62+2;
    petalVelocity[index] = .18 + Math.random()*.32;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const material = new THREE.PointsMaterial({ map:createPetalTexture(), size:quality==='high'?.34:.42, transparent:true, opacity:.75, depthWrite:false, blending:THREE.AdditiveBlending, color:0xffbd45, sizeAttenuation:true });
  petals = new THREE.Points(geometry,material);
  petals.frustumCulled = false;
  parent.add(petals);

  const starCount = quality === 'high' ? 520 : 180;
  const stars = new Float32Array(starCount*3);
  for(let index=0;index<starCount;index+=1){
    const radius=75+Math.random()*35;
    const angle=Math.random()*Math.PI*2;
    stars[index*3]=Math.cos(angle)*radius;
    stars[index*3+1]=20+Math.random()*55;
    stars[index*3+2]=Math.sin(angle)*radius;
  }
  const starGeometry=new THREE.BufferGeometry();
  starGeometry.setAttribute('position',new THREE.BufferAttribute(stars,3));
  const starMaterial=new THREE.PointsMaterial({color:0xffedc0,size:quality==='high'?.2:.28,transparent:true,opacity:.56,depthWrite:false});
  parent.add(new THREE.Points(starGeometry,starMaterial));
}

function createSky() {
  const geometry = new THREE.SphereGeometry(120,quality==='high'?48:24,quality==='high'?24:12);
  skyMaterial = new THREE.ShaderMaterial({
    side:THREE.BackSide,
    depthWrite:false,
    uniforms:{
      topColor:{value:new THREE.Color(routes.arrival.skyTop)},
      bottomColor:{value:new THREE.Color(routes.arrival.skyBottom)},
      offset:{value:14},
      exponent:{value:.72}
    },
    vertexShader:`varying vec3 vWorldPosition; void main(){ vec4 worldPosition=modelMatrix*vec4(position,1.0); vWorldPosition=worldPosition.xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader:`uniform vec3 topColor; uniform vec3 bottomColor; uniform float offset; uniform float exponent; varying vec3 vWorldPosition; void main(){ float h=normalize(vWorldPosition+vec3(0.0,offset,0.0)).y; float mixValue=max(pow(max(h,0.0),exponent),0.0); gl_FragColor=vec4(mix(bottomColor,topColor,mixValue),1.0); }`
  });
  const sky=addMesh(scene,geometry,skyMaterial);
  sky.castShadow=false;
  sky.receiveShadow=false;
}

function createLighting() {
  hemisphereLight = new THREE.HemisphereLight(0xffd0af,0x331023,.95);
  scene.add(hemisphereLight);
  keyLight = new THREE.DirectionalLight(routes.arrival.light,routes.arrival.intensity);
  keyLight.position.set(-18,28,24);
  keyLight.castShadow=quality==='high';
  if(quality==='high'){
    keyLight.shadow.mapSize.set(2048,2048);
    keyLight.shadow.camera.left=-45;
    keyLight.shadow.camera.right=45;
    keyLight.shadow.camera.top=38;
    keyLight.shadow.camera.bottom=-25;
    keyLight.shadow.camera.near=1;
    keyLight.shadow.camera.far=95;
    keyLight.shadow.bias=-.00025;
  }
  scene.add(keyLight);
  const rim=new THREE.DirectionalLight(0xcc7cff,.8);
  rim.position.set(24,14,-28);
  scene.add(rim);
}

function createWorld(materials) {
  world = new THREE.Group();
  scene.add(world);
  createCourtyard(world,materials);
  createGate(world,materials);
  createPalace(world,materials);
  createHaldiWorld(world,materials);
  createSangeetWorld(world,materials);
  createMandapAndCouple(world,materials);
  createParticles(world);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ canvas:dom.canvas, antialias:quality==='high', powerPreference:'high-performance', stencil:false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,quality==='high'?1.75:1.15));
  renderer.setSize(window.innerWidth,window.innerHeight,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=quality==='high';
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;

  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x1b0712);
  scene.fog=new THREE.FogExp2(routes.arrival.fog,.0115);
  camera=new THREE.PerspectiveCamera(mobileDevice?57:48,window.innerWidth/window.innerHeight,.1,220);
  camera.position.copy(introPath.getPoint(0));
  camera.lookAt(0,4,-20);

  controls=new OrbitControls(camera,dom.canvas);
  controls.enabled=false;
  controls.enableDamping=true;
  controls.dampingFactor=.055;
  controls.enablePan=false;
  controls.minDistance=4.2;
  controls.maxDistance=24;
  controls.minPolarAngle=.55;
  controls.maxPolarAngle=1.48;
  controls.rotateSpeed=.36;
  controls.zoomSpeed=.55;
  controls.target.copy(routes.arrival.target);
  controls.addEventListener('start',()=>dom.exploreHint.classList.add('is-hidden'));

  composer=new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,camera));
  bloomPass=new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),routes.arrival.bloom,.72,.72);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());

  clock=new THREE.Clock();
  window.addEventListener('resize',resize);
  dom.canvas.addEventListener('webglcontextlost',(event)=>{
    event.preventDefault();
    showFallback('The 3D renderer was interrupted.');
  });
}

function resize(){
  if(!renderer||!camera)return;
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.fov=mobileDevice?57:48;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight,false);
  composer.setSize(window.innerWidth,window.innerHeight);
}

async function buildExperience(){
  try{
    setProgress(8,'Starting the real-time renderer');
    await nextFrame();
    setupRenderer();
    animate();
    setProgress(22,'Painting the Jaipur sky');
    createSky();
    createLighting();
    await nextFrame();
    setProgress(38,'Carving sandstone and jali');
    const materials=createMaterials();
    await nextFrame();
    setProgress(58,'Building the palace courtyards');
    createWorld(materials);
    await nextFrame();
    setProgress(82,'Lighting the ceremony worlds');
    await nextFrame();
    setProgress(100,'The palace is ready');
    window.__royalExperienceReady=true;
    dom.entryActions.hidden=false;
  }catch(error){
    console.error('Unable to build the royal 3D experience:',error);
    showFallback('This device could not initialise the real-time palace.');
  }
}

function easeInOutCubic(value){
  return value<.5?4*value*value*value:1-Math.pow(-2*value+2,3)/2;
}

function startExperience(withSound){
  if(started)return;
  started=true;
  if(withSound)startSoundscape(true);
  dom.entry.classList.add('is-leaving');
  dom.ui.setAttribute('aria-hidden','false');
  document.body.classList.add('is-cinematic');
  introActive=true;
  introStartedAt=performance.now();
  dom.skipIntro.hidden=reducedMotion;
  window.setTimeout(()=>{dom.entry.hidden=true;},1250);
  if(reducedMotion)finishIntro();
}

function updateIntro(now){
  const duration=6700;
  const raw=Math.min(1,(now-introStartedAt)/duration);
  const eased=easeInOutCubic(raw);
  const pathProgress=Math.min(1,Math.max(0,(raw-.08)/.86));
  camera.position.copy(introPath.getPoint(easeInOutCubic(pathProgress)));
  const lookProgress=Math.min(1,pathProgress*1.15);
  tempVector.set(0,4.5,THREE.MathUtils.lerp(15,-19,lookProgress));
  camera.lookAt(tempVector);
  const doorProgress=easeInOutCubic(Math.min(1,raw/.42));
  gateLeft.rotation.y=doorProgress*1.28;
  gateRight.rotation.y=-doorProgress*1.28;
  if(raw>=1)finishIntro();
}

function finishIntro(){
  if(!introActive&&!reducedMotion)return;
  introActive=false;
  camera.position.copy(routes.arrival.position);
  controls.target.copy(routes.arrival.target);
  controls.update();
  controls.enabled=true;
  gateLeft.rotation.y=1.28;
  gateRight.rotation.y=-1.28;
  dom.skipIntro.hidden=true;
  document.body.classList.remove('is-cinematic');
  setSceneContent('arrival',true);
  window.setTimeout(()=>dom.exploreHint.classList.add('is-hidden'),6500);
}

function navigateTo(routeName, immediate=false){
  if(routeName==='rsvp'){
    openDialog(dom.rsvpDialog);
    return;
  }
  const route=routes[routeName];
  if(!route)return;
  introActive=false;
  document.body.classList.remove('is-cinematic');
  dom.skipIntro.hidden=true;
  activeRoute=routeName;
  controls.enabled=false;
  transition={
    startedAt:performance.now(),
    duration:reducedMotion||immediate?1:2400,
    startPosition:camera.position.clone(),
    endPosition:route.position.clone(),
    startTarget:controls.target.clone(),
    endTarget:route.target.clone(),
    startSkyTop:skyMaterial.uniforms.topColor.value.clone(),
    startSkyBottom:skyMaterial.uniforms.bottomColor.value.clone(),
    startFog:scene.fog.color.clone(),
    startLight:keyLight.color.clone(),
    startIntensity:keyLight.intensity,
    startBloom:bloomPass.strength
  };
  setSceneContent(routeName);
  playBell(route.index);
}

function setSceneContent(routeName,immediate=false){
  const route=routes[routeName];
  if(mandapGroup) mandapGroup.visible=routeName==='story'||routeName==='wedding';
  const update=()=>{
    dom.sceneOverline.textContent=route.overline;
    dom.sceneTitle.textContent=route.title;
    dom.sceneDescription.textContent=route.description;
    dom.sceneMeta.innerHTML=`<span>${route.meta[0]}</span><i></i><span>${route.meta[1]}</span>`;
    dom.sceneAction.innerHTML=`${route.action} <span>→</span>`;
    dom.sceneAction.dataset.next=route.next;
    document.querySelectorAll('.chapter-button').forEach((button)=>button.classList.toggle('is-active',button.dataset.scene===routeName));
    dom.journeyProgress.style.width=`${(route.index+1)*20}%`;
    dom.sceneCopy.classList.remove('is-changing');
  };
  if(immediate){update();return;}
  dom.sceneCopy.classList.add('is-changing');
  window.setTimeout(update,320);
}

function updateTransition(now){
  if(!transition)return;
  const route=routes[activeRoute];
  const raw=Math.min(1,(now-transition.startedAt)/transition.duration);
  const eased=easeInOutCubic(raw);
  camera.position.lerpVectors(transition.startPosition,transition.endPosition,eased);
  controls.target.lerpVectors(transition.startTarget,transition.endTarget,eased);
  skyMaterial.uniforms.topColor.value.lerpColors(transition.startSkyTop,tempColor.set(route.skyTop),eased);
  skyMaterial.uniforms.bottomColor.value.lerpColors(transition.startSkyBottom,tempColor.set(route.skyBottom),eased);
  scene.fog.color.lerpColors(transition.startFog,tempColor.set(route.fog),eased);
  keyLight.color.lerpColors(transition.startLight,tempColor.set(route.light),eased);
  keyLight.intensity=THREE.MathUtils.lerp(transition.startIntensity,route.intensity,eased);
  bloomPass.strength=THREE.MathUtils.lerp(transition.startBloom,route.bloom,eased);
  controls.update();
  if(raw>=1){
    transition=null;
    controls.enabled=true;
  }
}

function updateAnimations(elapsed,delta){
  animatedLanterns.forEach(({group,glow,offset,baseY})=>{
    group.position.y=baseY+Math.sin(elapsed*.72+offset)*.035;
    glow.scale.set(1+Math.sin(elapsed*2.3+offset)*.06,1.35,1+Math.sin(elapsed*2.3+offset)*.06);
  });
  fireMeshes.forEach(({mesh,offset,baseY})=>{
    mesh.scale.y=.78+Math.sin(elapsed*5.5+offset)*.25;
    mesh.scale.x=.9+Math.sin(elapsed*4.1+offset)*.12;
    mesh.position.y=baseY+Math.sin(elapsed*5.5+offset)*.06;
    mesh.rotation.y+=delta*.65;
  });
  sangeetLights.forEach(({target,offset})=>{
    target.position.x=Math.sin(elapsed*.8+offset)*3.5;
    target.position.z=1+Math.cos(elapsed*.65+offset)*2;
  });
  if(coupleGroup){
    coupleGroup.position.y=Math.sin(elapsed*.7)*.025;
  }
  if(petals){
    const positions=petals.geometry.attributes.position.array;
    for(let index=0;index<petalVelocity.length;index+=1){
      const offset=index*3;
      positions[offset+1]-=petalVelocity[index]*delta;
      positions[offset]+=Math.sin(elapsed*.55+index)*delta*.08;
      if(positions[offset+1]<.2){
        positions[offset+1]=12+Math.random()*4;
        positions[offset]=(Math.random()-.5)*70;
        positions[offset+2]=(Math.random()-.5)*62+2;
      }
    }
    petals.geometry.attributes.position.needsUpdate=true;
    petals.rotation.y=elapsed*.006;
  }
}

function animate(now=performance.now()){
  requestAnimationFrame(animate);
  if(!renderer||!scene||!camera)return;
  const delta=Math.min(clock.getDelta(),.05);
  const elapsed=clock.elapsedTime;
  if(!started&&!introActive){
    camera.position.x=Math.sin(elapsed*.12)*.28;
    camera.position.y=5.2+Math.sin(elapsed*.18)*.08;
    camera.lookAt(0,4.6,-18);
  }
  if(introActive)updateIntro(now);
  if(transition)updateTransition(now);
  if(controls.enabled)controls.update();
  updateAnimations(elapsed,delta);
  if(renderWithComposer)composer.render();
  else renderer.render(scene,camera);
}

function setQuality(nextQuality){
  quality=nextQuality;
  renderWithComposer=quality==='high';
  if(renderer){
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,renderWithComposer?1.75:1));
    renderer.shadowMap.enabled=renderWithComposer;
    resize();
  }
  dom.qualityToggle.querySelector('span').textContent=renderWithComposer?'HD':'LITE';
  dom.qualityToggle.setAttribute('aria-label',renderWithComposer?'Use lite graphics':'Use high-definition graphics');
}

function createAudioContext(){
  if(audioContext)return audioContext;
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext)return null;
  audioContext=new AudioContext();
  return audioContext;
}

function playBell(index=0){
  if(!soundEnabled||!audioContext)return;
  const now=audioContext.currentTime;
  const frequencies=[293.66,329.63,392,440,523.25];
  [frequencies[index%frequencies.length],frequencies[(index+2)%frequencies.length]*2].forEach((frequency,noteIndex)=>{
    const oscillator=audioContext.createOscillator();
    const gain=audioContext.createGain();
    oscillator.type='sine';
    oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0,now+noteIndex*.08);
    gain.gain.linearRampToValueAtTime(.025,now+noteIndex*.08+.03);
    gain.gain.exponentialRampToValueAtTime(.0001,now+1.8+noteIndex*.1);
    oscillator.connect(gain).connect(audioMaster||audioContext.destination);
    oscillator.start(now+noteIndex*.08);
    oscillator.stop(now+2);
  });
}

function startSoundscape(chime=false){
  const context=createAudioContext();
  if(!context||soundEnabled)return;
  if(context.state==='suspended')context.resume();
  audioMaster=context.createGain();
  audioMaster.gain.value=.42;
  audioMaster.connect(context.destination);
  const droneGain=context.createGain();
  droneGain.gain.value=.035;
  droneGain.connect(audioMaster);
  [98,146.83,196].forEach((frequency,index)=>{
    const oscillator=context.createOscillator();
    const filter=context.createBiquadFilter();
    const gain=context.createGain();
    oscillator.type=index===0?'triangle':'sine';
    oscillator.frequency.value=frequency;
    filter.type='lowpass';
    filter.frequency.value=380+index*90;
    gain.gain.value=index===0?.42:.18;
    oscillator.connect(filter).connect(gain).connect(droneGain);
    oscillator.start();
    audioNodes.push(oscillator);
  });
  const lfo=context.createOscillator();
  const lfoGain=context.createGain();
  lfo.frequency.value=.11;
  lfoGain.gain.value=.012;
  lfo.connect(lfoGain).connect(droneGain.gain);
  lfo.start();
  audioNodes.push(lfo);
  soundEnabled=true;
  dom.soundToggle.setAttribute('aria-pressed','true');
  dom.soundToggle.setAttribute('aria-label','Turn sound off');
  if(chime)playBell(0);
}

function stopSoundscape(){
  audioNodes.forEach((node)=>{try{node.stop();}catch{}});
  audioNodes=[];
  if(audioMaster)audioMaster.disconnect();
  soundEnabled=false;
  dom.soundToggle.setAttribute('aria-pressed','false');
  dom.soundToggle.setAttribute('aria-label','Turn sound on');
}

function openDialog(dialog){
  controls.enabled=false;
  if(typeof dialog.showModal==='function')dialog.showModal();
  else dialog.setAttribute('open','');
}

function closeDialog(dialog){
  if(typeof dialog.close==='function')dialog.close();
  else dialog.removeAttribute('open');
  if(started&&!introActive&&!transition)controls.enabled=true;
}

function downloadCalendar(){
  const calendar=[
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Aarav and Meera Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',
    'UID:aarav-meera-wedding@example.invalid','DTSTAMP:20260729T000000Z','DTSTART:20261120T050000Z','DTEND:20261121T160000Z',
    'SUMMARY:Aarav & Meera — Royal Wedding Celebrations','LOCATION:Rajmahal Palace, Jaipur, Rajasthan',
    'DESCRIPTION:Haldi, Sangeet and Wedding celebrations at Rajmahal Palace.','END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const url=URL.createObjectURL(new Blob([calendar],{type:'text/calendar;charset=utf-8'}));
  const anchor=document.createElement('a');
  anchor.href=url;
  anchor.download='aarav-meera-royal-wedding.ics';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function setupUI(){
  document.querySelectorAll('[data-enter]').forEach((button)=>button.addEventListener('click',()=>startExperience(button.dataset.enter==='sound')));
  document.querySelectorAll('.chapter-button').forEach((button)=>button.addEventListener('click',()=>navigateTo(button.dataset.scene)));
  dom.sceneAction.addEventListener('click',()=>navigateTo(dom.sceneAction.dataset.next||'story'));
  dom.skipIntro.addEventListener('click',finishIntro);
  dom.soundToggle.addEventListener('click',()=>soundEnabled?stopSoundscape():startSoundscape(true));
  dom.qualityToggle.addEventListener('click',()=>setQuality(quality==='high'?'lite':'high'));
  document.querySelector('#details-open').addEventListener('click',()=>openDialog(dom.detailsDialog));
  document.querySelector('#fallback-details').addEventListener('click',()=>openDialog(dom.detailsDialog));
  document.querySelector('#rsvp-open').addEventListener('click',()=>{closeDialog(dom.detailsDialog);window.setTimeout(()=>openDialog(dom.rsvpDialog),120);});
  document.querySelector('#calendar-download').addEventListener('click',downloadCalendar);
  document.querySelectorAll('.dialog-close').forEach((button)=>button.addEventListener('click',()=>closeDialog(button.closest('dialog'))));
  document.querySelectorAll('dialog').forEach((dialog)=>dialog.addEventListener('click',(event)=>{
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog(dialog);
  }));
  const form=document.querySelector('#rsvp-form');
  form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const data=new FormData(form);
    const name=String(data.get('guest')||'Guest').trim();
    document.querySelector('#form-status').textContent=data.get('attendance')==='accept'
      ?`Thank you, ${name}. Your place in our celebration is waiting.`
      :`Thank you for letting us know, ${name}. You will be missed.`;
  });
  window.addEventListener('keydown',(event)=>{
    if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;
    const routeNames=Object.keys(routes);
    const current=routeNames.indexOf(activeRoute);
    const next=event.key==='ArrowRight'?Math.min(routeNames.length-1,current+1):Math.max(0,current-1);
    navigateTo(routeNames[next]);
  });
  setQuality(quality);
}

setupUI();
buildExperience();
