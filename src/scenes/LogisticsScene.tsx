import { useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// A stylized, low-poly autonomous truck built with primitives
function Truck() {
  const truckRef = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    if (!truckRef.current) return

    // Initial setup
    truckRef.current.position.set(0, -1, 0)
    truckRef.current.rotation.set(0, Math.PI / 4, 0)

    // Scroll animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // Animate across sections
    tl.to(truckRef.current.position, { x: -3, z: 2, ease: 'power1.inOut' }, 0)
      .to(truckRef.current.rotation, { y: -Math.PI / 4, ease: 'power1.inOut' }, 0)

      .to(truckRef.current.position, { x: 3, z: -2, ease: 'power1.inOut' }, 0.3)
      .to(truckRef.current.rotation, { y: Math.PI / 2, ease: 'power1.inOut' }, 0.3)

      .to(truckRef.current.position, { x: 0, z: 4, ease: 'power1.inOut' }, 0.6)
      .to(truckRef.current.rotation, { y: -Math.PI / 6, ease: 'power1.inOut' }, 0.6)

    return () => {
      tl.kill()
    }
  }, [])

  // Floating animation
  useFrame((state) => {
    if (truckRef.current) {
      truckRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={truckRef}>
      {/* Cabin */}
      <mesh position={[0, 1.5, 2]}>
        <boxGeometry args={[2.2, 2.5, 1.5]} />
        <meshStandardMaterial color="#FF6B00" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 2, 2.76]}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#00F0FF" roughness={0.1} metalness={0.9} transparent opacity={0.8} />
      </mesh>

      {/* Trailer Base */}
      <mesh position={[0, 0.8, -1.5]}>
        <boxGeometry args={[2.4, 0.4, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.5} />
      </mesh>

      {/* Cargo Container */}
      <mesh position={[0, 2.5, -1.5]}>
        <boxGeometry args={[2.4, 3, 5.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Container details (VORTEX branding simulation) */}
      <mesh position={[1.21, 2.5, -1.5]}>
        <boxGeometry args={[0.05, 1, 4]} />
        <meshStandardMaterial color="#00F0FF" roughness={0.4} />
      </mesh>
      <mesh position={[-1.21, 2.5, -1.5]}>
        <boxGeometry args={[0.05, 1, 4]} />
        <meshStandardMaterial color="#00F0FF" roughness={0.4} />
      </mesh>

      {/* Wheels */}
      {[-3, -1, 1, 2.5].map((z, i) => (
        <group key={`wheels-${i}`} position={[0, 0.4, z]}>
          <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
            <meshStandardMaterial color="#000000" roughness={0.9} />
          </mesh>
          <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
            <meshStandardMaterial color="#000000" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[0.8, 1, 2.8]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.8, 1, 2.8]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight position={[0.8, 1, 3]} intensity={2} color="#ffffff" distance={10} />
      <pointLight position={[-0.8, 1, 3]} intensity={2} color="#ffffff" distance={10} />
    </group>
  )
}

export function LogisticsScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
        <color attach="background" args={['#0B0F17']} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-10, 5, -5]} intensity={2} color="#00F0FF" />
        <directionalLight position={[0, -5, 5]} intensity={1} color="#FF6B00" />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </group>
        </Environment>

        <Truck />

        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={Math.random() > 0.5 ? '#00F0FF' : '#FF6B00'} transparent opacity={0.5} />
          </mesh>
        ))}
      </Canvas>
    </div>
  )
}
