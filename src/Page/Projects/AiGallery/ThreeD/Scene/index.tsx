import { useEffect } from 'react'
import { Clone, useGLTF, Image, Text } from '@react-three/drei'
import { Object3D, Object3DEventMap } from 'three'



export const Scene = () => {
  const { nodes } = useGLTF('/aiGallery/model/aiGalleryExtend.glb')

  useEffect(() => {
    console.log((nodes['Wall'].children));
  }, [])
  const image = [
    '/aiGallery/image/20240503-024740.jpg',
    '/aiGallery/image/20240503-024805.jpg',
    '/aiGallery/image/20240503-024817.jpg',
    '/aiGallery/image/20240503-024829.jpg',
    '/aiGallery/image/20240503-024857.jpg',
    '/aiGallery/image/20240503-024907.jpg',
    '/aiGallery/image/20240503-024925.jpg',
    '/aiGallery/image/20240503-024938.jpg',
    '/aiGallery/image/20240503-024952.jpg',
    '/aiGallery/image/20240503-025135.jpg',
    '/aiGallery/image/20240503-025010.jpg',
    '/aiGallery/image/20240503-025027.jpg',
  ]

  const descreption = [
    'Emerald Genesis',
    'Luminous Synthesis',
    'Scholarly Sentinel',
    'Serene Gaze',
    'Buddy Beams',
    'Divine Origami Grace',
    'Forest Essence',
    'Serenity in Bloom',
    'Vortex of Style',
    'Serenity in Bloom',
    'Avian Elegance',
    'Autumnal Enlightenment',
  ]
  return (
    <group dispose={null}>
      {/* <ImageFrame/> */}
      {/* 中间那排 */}
      <Clone object={nodes['Cube007']} />
      <Clone object={nodes['Cube008']} />
      <Clone object={nodes['Cube009']} />
      <ImageFrame object={nodes['Cube010']} imgUrl={null} description={''} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube002']} imgUrl={image[0]} description={descreption[0]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube011']} imgUrl={image[1]} description={descreption[1]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube012']} imgUrl={image[2]} description={descreption[2]} intensity={0} rotation={0} />

      {/* 楼梯旁边的 */}
      <ImageFrame object={nodes['Cube006']} imgUrl={image[3]} description={descreption[3]} intensity={0} rotation={0} />

      {/* 楼梯 */}
      <Clone object={nodes['Cube005']} />
      <Clone object={nodes['Cube013']} />

      {/* 后面 */}
      <ImageFrame object={nodes['Cube014']} imgUrl={image[5]} description={descreption[5]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube015']} imgUrl={image[6]} description={descreption[6]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube016']} imgUrl={image[7]} description={descreption[7]} intensity={0} rotation={0} />

      <ImageFrame object={nodes['Cube001']} imgUrl={image[4]} description={descreption[4]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube017']} imgUrl={image[8]} description={descreption[8]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube018']} imgUrl={image[9]} description={descreption[9]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube019']} imgUrl={image[0]} description={descreption[0]} intensity={0} rotation={0} />

      {/* 旁边 */}
      <ImageFrame object={nodes['Cube020']} imgUrl={image[11]} description={descreption[11]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube021']} imgUrl={image[2]} description={descreption[2]} intensity={0} rotation={0} />
      <ImageFrame object={nodes['Cube022']} imgUrl={image[3]} description={descreption[3]} intensity={0} rotation={0} />

      {/* 墙壁 */}
      <Clone object={nodes['Wall']} />
      <Image url={image[0]} position={[-4.98, 1.14, 1.56]} rotation={[0, Math.PI / 2, 0]} scale={[6.8, 2.08]} castShadow />
      <Text scale={0.05} position={[-4 + 0.5, 2, -2]} rotation={[0, 0, 0]} children={'二楼通道'} />
      <Text scale={0.05} position={[-4 + 0.5, 1.9, -2]} rotation={[0, 0, 0]} children={'暂未开放'} />

      {/* <ShowBoard position={[-4.98, 1.14, 1.56]} /> */}
      {/* 地面 */}
      <Clone object={nodes['showWall']} />
      <Clone object={nodes['ceiling_']} />
    </group>
  )
}

useGLTF.preload('/aiGallery/model/aiGalleryExtend.glb')


interface ImageFrameProps {
  object: Object3D<Object3DEventMap> | Object3D<Object3DEventMap>[];
  imgUrl: string | null;
  description: string;
  intensity: number
  rotation: number
}
const ImageFrame = ({ object, imgUrl, description, intensity = 300, rotation = 1, ...props }: ImageFrameProps) => {
  return (
    <Clone object={object} {...props} >
      {imgUrl &&
        <>
          <Image url={imgUrl} position={[0, 0, 0.08]} />
          <Text scale={0.1} position={[0, 0 - 0.68, 0.02]}>
            {description}
          </Text>
        </>
      }
    </Clone>
  )
}

// const ShowBoard = (position: any) => {
//   const plane = new THREE.PlaneGeometry(6.8, 2.08)
//   return (
//     <mesh geometry={plane}
//       position={[-4.98, 1.14, 1.56]}
//       rotation={[0, Math.PI / 2, 0]}
//     >
//       <Html
//         transform
//         occlude
//         position={[0, 0, 0 + 0.1]}
//         // rotation={[0, Math.PI / 2, 0]}
//         scale={[6.8, 2.08, 1]}
//       // zIndexRange={[-1, 0]}
//       >
//         {/* <div style={{
//           width: '100%',
//           height: '100%',
//           border: 'purple',
//           backgroundColor: 'green'
//         }}></div> */}
//         <iframe src='https://ai.cytelab.net/login' width={'35px'} height={'20px'} />
//       </Html>
//     </mesh>
//   )
// }