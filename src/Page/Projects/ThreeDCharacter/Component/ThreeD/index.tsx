// import { ContactShadows } from "@react-three/drei"
import RoomScene from "./RoomScene"
import XBot from "./XBot"
import { Leva } from 'leva'
import { motion } from 'framer-motion-3d'
import { useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, useScroll } from "@react-three/drei"
import { animate, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"
import { framerMotionConfig } from "../framerMotionConfig"
import { Projects } from "./Projects"
import { Background } from "../Background"

interface Props {
    section: number
    menuOpened: boolean
}

export const ThreeD = (props: Props) => {
    // 创建一个控制面板来选择不同的动画
    // const { animation } = useControls({
    //     animation: {
    //         value: 'FallAnimation',
    //         options: ['Typing', 'Praying', 'FallAnimation', 'Standing']
    //     }
    // })
    const { section } = props
    const [sectionB, setSectionB] = useState(0)
    const { menuOpened } = props
    const { viewport } = useThree()
    // const characterContainerAboutRef = useRef<any>(null)
    const [characterAnimation, setCharacterAnimation] = useState('Typing')
    const data = useScroll()
    const cameraPositionX = useMotionValue(0);
    const cameraLookAtX = useMotionValue(0);
    useEffect(
        () => {
            setCharacterAnimation('FallAnimation')
            setTimeout(() => {
                setCharacterAnimation(section === 0 ? 'Typing' : 'Praying')
            }, 800)
        }, [section])

    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -5 : 0), { //[0 + 20, 0 - 0.5, -4]
            ...framerMotionConfig
        }
        animate(cameraLookAtX, menuOpened ? 1 : 0), {// [0, 1, 1]
            ...framerMotionConfig
        }

    }, [menuOpened])

    useFrame((state) => {
        let curSectionB = Math.floor(data.offset * data.pages)// 这里是将data.scroll的值乘以data.pages的值，得到当前的section

        if (curSectionB > 3) {
            curSectionB = 3
        }

        // 如果当前的sectionB和上一次的sectionB不一样，就设置sectionB
        if (curSectionB !== sectionB) {
            setSectionB(curSectionB)
        }
        state.camera.position.x = cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0, 0)
    })

    return (
        <>
            <Background />
            <ambientLight intensity={3} />
            {/* <OrbitControls /> */}
            {/* <ContactShadows
                opacity={0.42}
                blur={1}
                scale={10}
                far={10}
                resolution={256}
                color={'#000000'}
            /> */}

            {/* 房间 */}
            <motion.group
                rotation={[0, (Math.PI / 2) + (Math.PI / 6), 0]}
                position={[0.5, 0 - 0.5, 0]}
                scale={[1.1, 1.1, 1.1]}
            >
                <RoomScene section={section} />
            </motion.group>

            <motion.group
                animate={{
                    z: section === 1 ? 8 : -8,
                    y: section === 1 ? -viewport.height : -1.5

                }}
            >
                {/* 浮动的球：red */}
                <Float>
                    <mesh
                        position={[0 - 1, 0, -13]}
                        scale={[1, 1, 1]}
                    >
                        <sphereGeometry />
                        <MeshDistortMaterial
                            opacity={0.7}
                            transparent
                            distort={0.4}
                            speed={4}
                            color={'red'}
                        />
                    </mesh>
                </Float >
                {/* 浮动的球：yellow */}
                <Float>
                    <mesh
                        position={[0 - 1, 0, -13]}
                        scale={[1, 1, 1]}
                    >
                        <sphereGeometry />
                        <MeshDistortMaterial
                            opacity={0.8}
                            transparent
                            distort={1}
                            speed={4}
                            color={'yellow'}
                        />
                    </mesh>
                </Float >
                {/* 活动的人 */}
                <motion.group
                    position={[0 + 0.9, 0 + 1.01, 0 + 7.7]}
                    // rotation={ [0, Math.PI / 2 + Math.PI / 7, 0]},
                    // scale={[0.6, 0.6, 0.6]}

                    //设置XBot当不同section对应的属性变化
                    animate={'' + sectionB}
                    transition={{ duration: 0.6 }}
                    variants={{
                        '0': {
                            scaleX: 1,
                            scaleY: 1,
                            scaleZ: 1,
                            rotateX: 0,
                            rotateY: Math.PI / 2 + Math.PI / 7,
                            rotateZ: 0,
                        },
                        '1': {
                            y: 0.1,
                            x: 0,
                            z: -6,
                            rotateY: Math.PI / 2 + Math.PI / 7 + Math.PI,

                        },
                        '2': {
                            y: -viewport.height * 1.4,
                            x: 0,
                            z: -8,
                            rotateY: Math.PI / 2 + Math.PI / 7,
                        },
                        '3': {
                            y: -viewport.height * 2,
                            x: 0,
                            z: -6,
                        }

                    }}
                >
                    <XBot animation={characterAnimation} menuOpened={menuOpened} />
                </motion.group>
            </motion.group >
            <Projects />

            <Leva hidden />
        </>

    )
}