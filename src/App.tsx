import { Scroll, ScrollControls } from '@react-three/drei'
import './App.css'
import { Interface } from './component/Interface'
import { ThreeD } from './component/ThreeD'
import { Canvas } from '@react-three/fiber'
import { ScrollManager } from './component/ScrollManager'
import { useState } from 'react'
import { Menu } from './component/Menu'

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  // const onContactMe = () => { setSection(); console.log(section) }

  return (
    <>
      <Canvas>
        <ScrollControls pages={4} damping={0.15}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
            <ThreeD section={section} menuOpened={menuOpened} />
          </Scroll>
          <Scroll html>
            <Interface
              onSectionChange={setSection}
            />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu
        onSectionChange={setSection}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      />
    </>
  )
}

export default App


