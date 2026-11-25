import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { drawPagne, DEFAULT_COLORS, PALETTE } from '../lib/weave';
import { projects } from '../data/content';
import { timeline, SLOTS, PROJECT_SLOTS, EMPTY_SLOT } from './atelierTimeline';

// L'atelier : une case ronde dont les murs sont tendus de pagnes.
// Vue d'en haut, les rangées de pagnes forment un puits ; on y descend,
// puis chaque projet se décroche du mur devant le tisserand.

const R = 7; // rayon de la salle
const TIER_GAP = 2.7; // écart vertical entre les rangées
const TIERS = 7;
const EYE_Y = 2.0;
const SLOT_ANGLE = (Math.PI * 2) / SLOTS;
const FRAME_W = 2.6;
const FRAME_H = 1.9;

const angleOf = (slot) => slot * SLOT_ANGLE;
const dirOf = (a) => new THREE.Vector3(Math.sin(a), 0, -Math.cos(a));
const lerp = (a, b, t) => a + (b - a) * t;

function pagneTexture(seed, colors, w = 512, h = 384) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  drawPagne(canvas, seed, colors);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Le cadre vide qui attend le prochain projet
function emptyFrameTexture([line1, line2]) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 468;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = PALETTE.creme;
  ctx.fillRect(0, 0, 640, 468);
  ctx.strokeStyle = PALETTE.terre;
  ctx.lineWidth = 6;
  ctx.setLineDash([22, 14]);
  ctx.strokeRect(26, 26, 588, 416);
  ctx.setLineDash([]);
  ctx.fillStyle = PALETTE.encre;
  ctx.textAlign = 'center';
  ctx.font = '800 64px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(line1, 320, 220);
  ctx.fillStyle = PALETTE.terre;
  ctx.fillText(line2, 320, 296);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Sol : une natte tissée sombre, éclairée au centre par une lueur ocre
function floorTextures() {
  const mat = document.createElement('canvas');
  mat.width = 1024;
  mat.height = 1024;
  drawPagne(mat, 'natte-atelier', [PALETTE.nuit, PALETTE.indigo, PALETTE.encre, PALETTE.ocre]);
  const ctx = mat.getContext('2d');
  ctx.fillStyle = 'rgba(18,26,64,0.55)';
  ctx.fillRect(0, 0, 1024, 1024);
  const matTex = new THREE.CanvasTexture(mat);
  matTex.colorSpace = THREE.SRGBColorSpace;

  const glow = document.createElement('canvas');
  glow.width = 512;
  glow.height = 512;
  const g = glow.getContext('2d');
  const grad = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, 'rgba(217,146,43,0.85)');
  grad.addColorStop(0.35, 'rgba(184,67,42,0.35)');
  grad.addColorStop(1, 'rgba(18,26,64,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 512);
  const glowTex = new THREE.CanvasTexture(glow);
  glowTex.colorSpace = THREE.SRGBColorSpace;
  return { matTex, glowTex };
}

// Ajuste une image dans une boîte en gardant ses proportions
function fit(tex, boxW, boxH) {
  const ratio = tex.image ? tex.image.width / tex.image.height : 1;
  return ratio > boxW / boxH ? [boxW, boxW / ratio] : [boxH * ratio, boxH];
}

function Screens({ shots, textures }) {
  // Captures mobiles côte à côte, capture navigateur seule
  if (shots[0].kind === 'desktop') {
    const [w, h] = fit(textures[0], FRAME_W - 0.36, FRAME_H - 0.36);
    return (
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={textures[0]} toneMapped={false} />
      </mesh>
    );
  }
  const list = textures.slice(0, 2);
  return list.map((tex, k) => {
    const [w, h] = fit(tex, 0.95, FRAME_H - 0.3);
    const x = list.length === 1 ? 0 : k === 0 ? -0.55 : 0.55;
    return (
      <group key={tex.uuid} position={[x, k === 1 ? -0.06 : 0.06, 0.02]}>
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[w + 0.08, h + 0.08]} />
          <meshBasicMaterial color={PALETTE.encre} />
        </mesh>
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      </group>
    );
  });
}

// Un projet : son pagne sert de cadre, ses captures sont posées dessus
function ProjectFrame({ project, textures, slot, refs, index }) {
  const pagne = useMemo(() => pagneTexture(project.name, project.colors), [project]);
  const a = angleOf(slot);
  const d = dirOf(a);
  return (
    <group
      ref={(el) => {
        refs.current[index] = el;
      }}
      position={[d.x * R, EYE_Y, d.z * R]}
      rotation={[0, -a, 0]}
    >
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[FRAME_W + 0.1, FRAME_H + 0.1]} />
        <meshBasicMaterial color={PALETTE.encre} />
      </mesh>
      <mesh>
        <planeGeometry args={[FRAME_W, FRAME_H]} />
        <meshBasicMaterial map={pagne} toneMapped={false} />
      </mesh>
      <Screens shots={project.images} textures={textures} />
    </group>
  );
}

// Tout ce qui n'est pas un projet : pagnes et captures accrochés en rangées
function Walls({ allShots }) {
  const items = useMemo(() => {
    const list = [];
    const pagnes = Array.from({ length: 10 }, (_, k) =>
      pagneTexture(`atelier-${k}`, k % 2 ? DEFAULT_COLORS : projects[k % projects.length].colors, 384, 288)
    );
    let shot = 0;
    for (let t = 0; t < TIERS; t += 1) {
      for (let s = 0; s < SLOTS; s += 1) {
        if (t === 0 && (PROJECT_SLOTS.includes(s) || s === EMPTY_SLOT)) continue;
        const offset = t % 2 ? 0.5 : 0;
        const a = angleOf(s + offset);
        const d = dirOf(a);
        // En hauteur, une capture sur trois ; à hauteur d'yeux, uniquement des pagnes
        const isShot = t > 0 && (s + t) % 3 === 0;
        list.push({
          key: `${t}-${s}`,
          pos: [d.x * R, EYE_Y + t * TIER_GAP, d.z * R],
          rot: [0, -a, 0],
          tex: isShot ? allShots[shot++ % allShots.length] : pagnes[(s * 7 + t * 3) % pagnes.length],
          isShot,
        });
      }
    }
    return list;
  }, [allShots]);

  return items.map(({ key, pos, rot, tex, isShot }) => {
    const [w, h] = isShot ? fit(tex, FRAME_W - 0.2, FRAME_H - 0.1) : [FRAME_W, FRAME_H];
    return (
      <group key={key} position={pos} rotation={rot}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[w + 0.12, h + 0.12]} />
          <meshBasicMaterial color={PALETTE.encre} />
        </mesh>
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={tex} toneMapped={false} color={isShot ? '#d8d2c4' : '#ffffff'} />
        </mesh>
      </group>
    );
  });
}

// Le tisserand, vu de dos, en silhouette
function Weaver({ innerRef }) {
  const ink = <meshBasicMaterial color="#0b0d1c" />;
  return (
    <group ref={innerRef}>
      <mesh position={[0, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 40]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>
      <mesh position={[-0.11, 0.45, 0]}>
        <capsuleGeometry args={[0.085, 0.72, 6, 12]} />
        {ink}
      </mesh>
      <mesh position={[0.11, 0.45, 0]}>
        <capsuleGeometry args={[0.085, 0.72, 6, 12]} />
        {ink}
      </mesh>
      <mesh position={[0, 1.18, 0]}>
        <capsuleGeometry args={[0.21, 0.5, 8, 16]} />
        {ink}
      </mesh>
      <mesh position={[-0.27, 1.12, 0.02]} rotation={[0, 0, -0.05]}>
        <capsuleGeometry args={[0.065, 0.62, 6, 12]} />
        {ink}
      </mesh>
      <mesh position={[0.27, 1.12, 0.02]} rotation={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.065, 0.62, 6, 12]} />
        {ink}
      </mesh>
      <mesh position={[0, 1.66, 0]}>
        <sphereGeometry args={[0.13, 20, 16]} />
        {ink}
      </mesh>
    </group>
  );
}

function Room({ progressRef, emptyFrame }) {
  const { camera, size, scene } = useThree();
  const room = useRef();
  const weaver = useRef();
  const frames = useRef([]);
  const emptyRef = useRef();
  const smooth = useRef(progressRef.current);

  // Toutes les captures, chargées une seule fois
  const urls = useMemo(() => projects.flatMap((p) => p.images.map((i) => i.src)), []);
  const loaded = useLoader(THREE.TextureLoader, urls);
  const byUrl = useMemo(() => {
    const map = new Map();
    loaded.forEach((tex, k) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      map.set(urls[k], tex);
    });
    return map;
  }, [loaded, urls]);

  const emptyTex = useMemo(() => emptyFrameTexture(emptyFrame), [emptyFrame]);
  const { matTex, glowTex } = useMemo(() => floorTextures(), []);

  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    // Le défilement est lissé pour que la caméra glisse au lieu de sauter
    smooth.current += (progressRef.current - smooth.current) * Math.min(1, delta * 5);
    const tl = timeline(smooth.current);
    const portrait = size.width < size.height;
    const back = portrait ? 4.6 : 2.4;
    camera.fov = portrait ? 62 : 48;

    const a = angleOf(tl.slot);
    const d = dirOf(a);
    // En paysage, le texte est à gauche : on vise un peu à gauche pour décaler le cadre à droite
    const aim = dirOf(a - (portrait ? 0 : 0.2));
    const eyePos = tmpPos.set(-d.x * back, EYE_Y + 0.55, -d.z * back);
    const eyeLook = tmpLook.set(aim.x * R, portrait ? EYE_Y + 0.35 : EYE_Y - 0.1, aim.z * R);

    // Descente : on part du haut du puits, regard vers le sol
    const e = tl.descent;
    camera.position.set(lerp(0, eyePos.x, e), lerp(TIERS * TIER_GAP + 8, eyePos.y, e), lerp(0.001, eyePos.z, e));
    const look = new THREE.Vector3(lerp(0, eyeLook.x, e), lerp(0, eyeLook.y, e), lerp(-0.001, eyeLook.z, e));
    camera.lookAt(look);
    camera.updateProjectionMatrix();

    // Le puits tourne doucement pendant la descente
    room.current.rotation.y = (1 - e) * 0.9;
    scene.fog.far = lerp(48, 26, e);

    // Le tisserand reste devant la caméra et regarde le mur
    weaver.current.position.set(d.x * 1.7, 0, d.z * 1.7);
    weaver.current.rotation.y = -a + Math.PI;

    // Le projet actif se décroche du mur et s'avance
    const pulledDist = portrait ? 2.6 : 3.3;
    frames.current.forEach((g, k) => {
      if (!g) return;
      const pull = tl.pulls[k];
      const fa = angleOf(PROJECT_SLOTS[k]);
      const fd = dirOf(fa);
      const r = lerp(R, pulledDist, pull);
      g.position.set(fd.x * r, EYE_Y + pull * (portrait ? 0.75 : 0.2), fd.z * r);
      g.scale.setScalar(1 + pull * 0.35);
    });
    const ed = dirOf(angleOf(EMPTY_SLOT));
    const er = lerp(R, pulledDist, tl.emptyPull);
    emptyRef.current.position.set(ed.x * er, EYE_Y + tl.emptyPull * (portrait ? 0.75 : 0.2), ed.z * er);
    emptyRef.current.scale.setScalar(1 + tl.emptyPull * 0.35);
  });

  const allShots = useMemo(() => [...byUrl.values()], [byUrl]);
  const ea = angleOf(EMPTY_SLOT);

  return (
    <group ref={room}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R + 0.4, 96]} />
        <meshBasicMaterial map={matTex} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[R * 0.75, 64]} />
        <meshBasicMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <Walls allShots={allShots} />

      {projects.map((p, k) => (
        <ProjectFrame
          key={p.name}
          project={p}
          index={k}
          slot={PROJECT_SLOTS[k]}
          refs={frames}
          textures={p.images.map((i) => byUrl.get(i.src))}
        />
      ))}

      <group ref={emptyRef} rotation={[0, -ea, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[FRAME_W + 0.1, FRAME_H + 0.1]} />
          <meshBasicMaterial color={PALETTE.encre} />
        </mesh>
        <mesh>
          <planeGeometry args={[FRAME_W, FRAME_H]} />
          <meshBasicMaterial map={emptyTex} toneMapped={false} />
        </mesh>
      </group>

      <Weaver innerRef={weaver} />
    </group>
  );
}

export default function AtelierScene({ progressRef, active, emptyFrame }) {
  return (
    <Canvas
      className="atelier__canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 48, near: 0.1, far: 80, position: [0, 30, 0.001] }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color(PALETTE.nuit);
        scene.fog = new THREE.Fog(PALETTE.nuit, 6, 30);
      }}
    >
      <Suspense fallback={null}>
        <Room progressRef={progressRef} emptyFrame={emptyFrame} />
      </Suspense>
    </Canvas>
  );
}
