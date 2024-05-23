
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ModelNodes {
  [name: string]: THREE.Mesh;
}

export const Baked = () => {
  const { nodes } = useGLTF('/model/baked.gltf') as unknown as { nodes: ModelNodes };
  const { materials } = useGLTF('/model/baked.gltf')
  const texture = useTexture('./model/b.png')
  texture.flipY = false
  const bakedMaterial = new THREE.MeshStandardMaterial(
    { map: texture }
  )
  return (
    <group dispose={null}>
      <group name="RootNode" position={[4.626, -0.174, 3.707]} rotation={[0, -1.571, 0]} scale={0.407}>
        <group name="Couch_Medium1" position={[0, 0, 0.281]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh name="Couch_Medium1_1" geometry={nodes.Couch_Medium1_1.geometry} material={bakedMaterial} />
          <mesh name="Couch_Medium1_2" geometry={nodes.Couch_Medium1_2.geometry} material={bakedMaterial} />
        </group>
      </group>
      <mesh name="Wall" geometry={nodes.Wall.geometry} material={materials.blackWall} />
      <mesh name="ceiling_" geometry={nodes.ceiling_.geometry} material={materials.blackWall} />
      <mesh name="showWall" geometry={nodes.showWall.geometry} material={bakedMaterial} />
      <mesh name="Wall001" geometry={nodes.Wall001.geometry} material={materials['wood_floor.001']} />
      <mesh name="Cube007" geometry={nodes.Cube007.geometry} material={bakedMaterial} />
      <mesh name="Cube008" geometry={nodes.Cube008.geometry} material={bakedMaterial} position={[1.825, 0, 0]} />
      <mesh name="Cube009" geometry={nodes.Cube009.geometry} material={bakedMaterial} position={[3.65, 0, 0]} />
      <mesh name="Cube010" geometry={nodes.Cube010.geometry} material={bakedMaterial} position={[5.475, 0, 0]} />
      <mesh name="Cube006" geometry={nodes.Cube006.geometry} material={materials.image} position={[-3.141, 1.034, -3.717]} rotation={[0, Math.PI / 2, 0]} />
      <mesh name="Cube005" geometry={nodes.Cube005.geometry} material={bakedMaterial} position={[-5, 1.514, -3.401]} />
      <mesh name="Cube013" geometry={nodes.Cube013.geometry} material={bakedMaterial} position={[-5, 1.514, -3.401]} />
      <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={bakedMaterial} position={[0, 1.032, 0.139]} />
      <mesh name="Cube011" geometry={nodes.Cube011.geometry} material={bakedMaterial} position={[1.832, 1.032, 0.139]} />
      <mesh name="Cube012" geometry={nodes.Cube012.geometry} material={bakedMaterial} position={[3.665, 1.032, 0.139]} />
      <mesh name="Cube014" geometry={nodes.Cube014.geometry} material={bakedMaterial} position={[0, 1.032, -0.137]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh name="Cube015" geometry={nodes.Cube015.geometry} material={bakedMaterial} position={[1.832, 1.032, -0.137]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh name="Cube016" geometry={nodes.Cube016.geometry} material={bakedMaterial} position={[3.665, 1.032, -0.137]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={bakedMaterial} position={[-1.544, 1.032, -4.995]} />
      <mesh name="Cube017" geometry={nodes.Cube017.geometry} material={bakedMaterial} position={[0.288, 1.032, -4.995]} />
      <mesh name="Cube018" geometry={nodes.Cube018.geometry} material={bakedMaterial} position={[2.12, 1.032, -4.995]} />
      <mesh name="Cube019" geometry={nodes.Cube019.geometry} material={bakedMaterial} position={[3.953, 1.032, -4.995]} />
      <mesh name="Cube020" geometry={nodes.Cube020.geometry} material={bakedMaterial} position={[2.084, 1.032, 4.958]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh name="Cube021" geometry={nodes.Cube021.geometry} material={bakedMaterial} position={[0.252, 1.032, 4.958]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh name="Cube022" geometry={nodes.Cube022.geometry} material={bakedMaterial} position={[-1.58, 1.032, 4.958]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={bakedMaterial} position={[-3.413, 1.032, 4.958]} rotation={[Math.PI, 0, Math.PI]} />
    </group>
  )
}

useGLTF.preload('/model/baked.gltf')
