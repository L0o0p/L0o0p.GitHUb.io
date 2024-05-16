import { useThree } from '@react-three/fiber'
import {  PointLightHelper } from 'three'

export default function LightWithHelper() {
    const pointLightRef = useRef()
    const { scene } = useThree()
  
    useEffect(() => {
      const light = pointLightRef.current
      const helper = new PointLightHelper(light)
      scene.add(helper)
    }, [scene])
  
    return <pointLight ref={pointLightRef} position={[10, 10, 10]} />
  }