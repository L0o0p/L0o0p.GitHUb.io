
import './index.css'
// import ThreeDAvatar from './ThreeDAvatar'
import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls } from '@react-three/drei'
import { Interface } from './Component/Interface'
import { ThreeD } from './Component/ThreeD'
import { ScrollManager } from './Component/ScrollManager'
import { useState } from 'react'
import { Menu } from './Component/Menu'
import { MotionConfig } from 'framer-motion'
import { framerMotionConfig } from './Component/framerMotionConfig'
// import { Cursor } from './Component/Cursor.tsx'

export const ThreeDCharacter = () => {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <MotionConfig
        transition={{
          ...framerMotionConfig
        }}
      >
        <Canvas
          shadows
          camera={{
            position: [0, 2, 4],
            fov: 50
          }}
        >
          {/* 背景色 */}
          {/* <color attach={'background'} args={['#fad0c4']} /> */}
          <ScrollControls pages={4} damping={0.15} style={{ zIndex: 10 }}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll html>
              <Interface />
            </Scroll>
            <Scroll>
              <ThreeD section={section} menuOpened={menuOpened} />
            </Scroll>
          </ScrollControls>
        </Canvas >
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        {/* <Cursor /> */}
      </MotionConfig>
    </>
  )
}


