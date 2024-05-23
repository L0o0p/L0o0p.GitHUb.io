import { memo } from 'react'
import { Environment as EnvironmentImpl } from '@react-three/drei'

// Define an interface for the component's props
interface EnvironmentProps {
  direction?: [number, number, number];
}

export const Environment = memo(({ direction = [5, 5, 5] }: EnvironmentProps) => (
  <>
    <directionalLight position={direction} intensity={0.5} shadow-mapSize={1024} castShadow />
    <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow />
    <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow />
    <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow />
    <EnvironmentImpl preset="city" />
  </>
))