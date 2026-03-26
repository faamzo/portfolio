import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { RADIANT_FALLBACK_BG } from '../lib/radiant-palette'

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rot * p * 2.02 + 7.3;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  centered.x *= uResolution.x / max(uResolution.y, 1.0);

  float t = uTime * 0.11;

  vec3 base = vec3(0.02, 0.025, 0.04);

  vec2 flowUv = centered * 2.6;
  flowUv += vec2(sin(t * 1.7), cos(t * 1.3)) * 0.13;

  float field = fbm(flowUv + fbm(flowUv + t));

  vec2 orbA = centered - vec2(-0.52 + sin(t * 0.8) * 0.06, 0.18);
  vec2 orbB = centered - vec2(0.62 + cos(t * 0.6) * 0.05, -0.12);
  float glowA = exp(-dot(orbA, orbA) * 2.5);
  float glowB = exp(-dot(orbB, orbB) * 2.0);

  vec3 violet = vec3(0.4314, 0.3098, 0.9490);
  vec3 blue = vec3(0.1882, 0.4510, 0.9216);

  vec3 col = base;
  col += violet * glowA * (0.26 + field * 0.16);
  col += blue * glowB * (0.21 + (1.0 - field) * 0.14);

  float vignette = smoothstep(1.15, 0.18, length(centered));
  col *= vignette;

  float grain = hash21(gl_FragCoord.xy + uTime * 10.0) - 0.5;
  col += grain * 0.045;

  float contrast = 1.08;
  col = (col - 0.5) * contrast + 0.5;
  col = clamp(col, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const reduceMotion = useReducedMotion()
  const { size } = useThree()
  const isMobile = size.width < 768

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height],
  )

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height)
  }, [size.width, size.height, uniforms])

  useFrame((_, delta) => {
    if (!materialRef.current) return
    if (reduceMotion) return
    materialRef.current.uniforms.uTime.value += delta * (isMobile ? 0.5 : 1)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default function ShaderBackground() {
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{ opacity: 0.9 }}
    >
      <Canvas
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'default' : 'high-performance',
        }}
        dpr={isMobile ? [1, 1.1] : [1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <color attach="background" args={['#07080c']} />
        <ShaderPlane />
      </Canvas>
      {reduceMotion ? (
        <div className="absolute inset-0" style={{ background: RADIANT_FALLBACK_BG }} />
      ) : null}
    </div>
  )
}
