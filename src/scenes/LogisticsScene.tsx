import { useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Truck() {
  const truckRef = useRef<THREE.Group>(null)
  const wheelsRef = useRef<THREE.Group[]>([])

  useLayoutEffect(() => {
    if (!truckRef.current) return

    // Initial setup
    truckRef.current.position.set(2, -2, 4)
    truckRef.current.rotation.set(0, -Math.PI / 6, 0)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // Move truck
    tl.to(truckRef.current.position, { x: -4, z: -2, ease: 'power1.inOut' }, 0)
      .to(truckRef.current.rotation, { y: Math.PI / 4, ease: 'power1.inOut' }, 0)

      .to(truckRef.current.position, { x: 5, z: 2, ease: 'power1.inOut' }, 0.25)
      .to(truckRef.current.rotation, { y: -Math.PI / 2, ease: 'power1.inOut' }, 0.25)

      .to(truckRef.current.position, { x: -2, z: 6, ease: 'power1.inOut' }, 0.5)
      .to(truckRef.current.rotation, { y: Math.PI / 8, ease: 'power1.inOut' }, 0.5)

      .to(truckRef.current.position, { x: 0, z: 0, ease: 'power1.inOut' }, 0.75)
      .to(truckRef.current.rotation, { y: -Math.PI / 4, ease: 'power1.inOut' }, 0.75)

    // Sync wheel rotation with scroll progress
    tl.to(
      {},
      {
        onUpdate: function () {
          // Calculate distance to simulate rolling
          // Just an approximation based on scroll progress
          const progress = this.progress()
          const rotationAngle = progress * Math.PI * 20
          wheelsRef.current.forEach(wheel => {
             if (wheel) wheel.rotation.x = -rotationAngle
          })
        },
      },
      0
    )

    return () => {
      tl.kill()
    }
  }, [])

  // Floating chassis (suspension simulation)
  useFrame((state) => {
    if (truckRef.current) {
      truckRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 4) * 0.05
    }
  })

  // Wheel configuration
  const wheelPositions = [
    [-0.9, 0.5, 3.2], // Front Left
    [0.9, 0.5, 3.2],  // Front Right
    [-0.9, 0.5, 0],   // Mid Left
    [0.9, 0.5, 0],    // Mid Right
    [-0.9, 0.5, -2],  // Rear Left
    [0.9, 0.5, -2],   // Rear Right
    [-0.9, 0.5, -3.2], // Back Left
    [0.9, 0.5, -3.2],  // Back Right
  ]

  const addToWheelsRef = (el: THREE.Group) => {
    if (el && !wheelsRef.current.includes(el)) {
      wheelsRef.current.push(el)
    }
  }

  return (
    <group ref={truckRef}>
      {/* --- CABIN (Aero profile) --- */}
      <group position={[0, 1.8, 3.8]}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2.2, 2]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Windshield (swept back) */}
        <mesh position={[0, 0.5, 1.05]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.8, 1]} />
          <meshStandardMaterial color="#0B0F17" metalness={1} roughness={0} />
        </mesh>

        {/* Grille */}
        <mesh position={[0, -0.5, 1.01]}>
          <boxGeometry args={[1.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.8} />
        </mesh>

        {/* Doors (Side panel cuts) */}
        {/* Left Door */}
        <mesh position={[-1.01, -0.1, 0]}>
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Right Door */}
        <mesh position={[1.01, -0.1, 0]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Headlights */}
        <mesh position={[0.7, -0.4, 1.02]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <mesh position={[-0.7, -0.4, 1.02]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <pointLight position={[0.8, -0.4, 1.2]} intensity={2} color="#00F0FF" distance={15} />
        <pointLight position={[-0.8, -0.4, 1.2]} intensity={2} color="#00F0FF" distance={15} />
      </group>

      {/* --- TRAILER CHASSIS --- */}
      <mesh position={[0, 1, -0.5]}>
        <boxGeometry args={[1.8, 0.3, 8]} />
        <meshStandardMaterial color="#1A202C" metalness={0.6} roughness={0.6} />
      </mesh>

      {/* --- CARGO CONTAINER --- */}
      <group position={[0, 2.7, -1]}>
        <mesh>
          <boxGeometry args={[2.2, 3.2, 7.5]} />
          <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Container Ridges (corrugated sides) */}
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={`ridge-l-${i}`} position={[-1.12, 0, -3 + i * 0.46]}>
            <boxGeometry args={[0.05, 3, 0.1]} />
            <meshStandardMaterial color="#0F172A" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={`ridge-r-${i}`} position={[1.12, 0, -3 + i * 0.46]}>
            <boxGeometry args={[0.05, 3, 0.1]} />
            <meshStandardMaterial color="#0F172A" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}

        {/* Neon Accents / Branding strip */}
        <mesh position={[1.11, 1, 0]}>
          <planeGeometry args={[7, 0.1]} />
          <meshBasicMaterial color="#FF6B00" />
        </mesh>
        <mesh position={[-1.11, 1, 0]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[7, 0.1]} />
          <meshBasicMaterial color="#FF6B00" />
        </mesh>
      </group>

      {/* --- WHEELS --- */}
      {wheelPositions.map((pos, i) => (
        <group key={`wheel-${i}`} position={pos as [number, number, number]} ref={addToWheelsRef}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
            <meshStandardMaterial color="#000000" roughness={0.9} metalness={0.1} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.32, 16]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Hubcap detail (to show rotation clearly) */}
          <mesh position={[pos[0] > 0 ? 0.17 : -0.17, 0, 0.2]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial color="#00F0FF" metalness={1} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Tail lights */}
      <mesh position={[0.9, 1.2, -4.8]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>
      <mesh position={[-0.9, 1.2, -4.8]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>
    </group>
  )
}

export function LogisticsScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 14]} fov={40} />
        <color attach="background" args={['#06080A']} />
        <fog attach="fog" args={['#06080A', 10, 30]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#00F0FF" />
        <directionalLight position={[0, -5, 5]} intensity={1} color="#FF6B00" />
        <spotLight position={[0, 10, 0]} intensity={2} color="#ffffff" angle={0.5} penumbra={1} />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </group>
        </Environment>

        <Truck />

        {/* Floating dust/particles for depth */}
        {Array.from({ length: 80 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 30
            ]}
          >
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color={Math.random() > 0.3 ? '#00F0FF' : '#FF6B00'} transparent opacity={0.3} />
          </mesh>
        ))}
      </Canvas>
    </div>
  )
}
