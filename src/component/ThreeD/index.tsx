import { RoomScene } from "./model/roomScene/RoomScene"
import { XBot } from "./model/Xbot"
import { useEffect, useState } from "react"
import { motion } from "framer-motion-3d"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import { ThreeDGallery } from "./ThreeDGallery"
import { Background } from "./Background"
import { animate, useMotionValue } from "framer-motion"


interface Props {
    section: string | number
    menuOpened: boolean
}

export const ThreeD = (props: Props) => {
    const [section, setSection] = useState(0)
    const data = useScroll()
    const [cAnimation, setCAnimation] = useState('Typing')
    const { viewport } = useThree()
    const cameraPositionX = useMotionValue(0);
    const cameraLookAtX = useMotionValue(0);
    const { menuOpened } = props

    useFrame((state) => {
        // 这里是将data.scroll的值乘以data.pages的值，得到当前的section
        let curSection = Math.floor(data.offset * data.pages)
        // 如果当前的sectionB和上一次的sectionB不一样，就设置sectionB
        if (curSection !== section) {
            setSection(curSection)
        }
        // 另外，如果当前的sectionB大于3，就设置为3
        // 这个设置是因为当到了底部继续往下滑动的时候会出现“section > 3”的情况，由于没有设置这个section对应的参数导致模型消失
        if (curSection > 3) {
            curSection = 3
        }
        state.camera.position.x = cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0, 0)
    })

    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -5 : 0), {
            // ...framerMotionConfig
        }
        animate(cameraLookAtX, menuOpened ? 1 : 0), {
            // ...framerMotionConfig
        }
        console.log('camera should change')

    }, [menuOpened])

    useEffect(
        () => {
            setCAnimation('Falling')
            setTimeout(() => {
                console.log(section)
                setCAnimation(section === 0 ? 'Typing' : 'Standing')
            }, 700)
        }, [section])

    return (
        <>
            {/* 环境光照 */}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* 载入的模型 */}
            <group
                rotation={[0, 0 + Math.PI / 2 + Math.PI / 4, 0]}
                position={[0, 0 - 1, 0]}
            >
                {/* 动画人模型 */}
                <motion.group
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    animate={'' + section}
                    transition={{ duration: 0.8 }}
                    variants={{
                        '0': {

                        },
                        '1': {
                            y: -viewport.height,
                            x: 0,
                            z: 0,
                            rotateY: Math.PI / 2 + Math.PI / 7 + Math.PI,

                        },
                        '2': {
                            y: -viewport.height * 2,
                            x: 0,
                            z: 0,
                            rotateY: Math.PI / 2 + Math.PI / 7 * 2 + Math.PI,
                        },
                        '3': {
                            y: -viewport.height * 3 + 0.5,
                            //         x: 0,
                            //         z: 0,
                            rotateY: Math.PI / 2 + Math.PI / 7 * 3 + Math.PI,
                        },
                        '4': {
                            y: -viewport.height * 3 + 0.5,
                            //         x: 0,
                            //         z: 0,
                            rotateY: Math.PI / 2 + Math.PI / 7 * 3 + Math.PI,
                        }
                    }}

                >
                    <XBot animation={cAnimation} />
                </motion.group>
                {/* 房间场景模型 */}
                <RoomScene />
            </group>
            {/* 三维画廊 */}
            <ThreeDGallery />
            <Background />

        </>
    )
}