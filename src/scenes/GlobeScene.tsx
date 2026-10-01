import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Line, Preload } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const globeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={globeRef}>
      {/* Base Globe */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0B0F17"
          roughness={0.8}
          metalness={0.2}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </Sphere>

      {/* Nodes / Cities */}
      <Sphere args={[0.05, 16, 16]} position={[2, 0, 0]}>
        <meshBasicMaterial color="#00F0FF" />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[-1.5, 1.3, -0.5]}>
        <meshBasicMaterial color="#FF6B00" />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[0, -1.8, 0.8]}>
        <meshBasicMaterial color="#00F0FF" />
      </Sphere>

      {/* Arcs/Routes */}
      <Line
        points={[
          new THREE.Vector3(2, 0, 0),
          new THREE.Vector3(0.5, 1, -0.5),
          new THREE.Vector3(-1.5, 1.3, -0.5),
        ]}
        color="#00F0FF"
        lineWidth={2}
        dashed={true}
        dashScale={0.5}
      />
      <Line
        points={[
          new THREE.Vector3(-1.5, 1.3, -0.5),
          new THREE.Vector3(-0.5, -0.2, 0.2),
          new THREE.Vector3(0, -1.8, 0.8),
        ]}
        color="#FF6B00"
        lineWidth={1.5}
      />
    </group>
  )
}

export function GlobeScene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        <Preload all />
      </Canvas>
    </div>
  )
}
