
import { useFrame, useThree } from "@react-three/fiber"
import { Image, Text } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { atom, useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { animate, useMotionValue } from "framer-motion"

export const projects = [
    {
        title: 'One',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/threeDCharacter/image/020.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Two',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/threeDCharacter/image/021.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Three',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/threeDCharacter/image/008.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Four',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/threeDCharacter/image/045.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Five',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/threeDCharacter/image/068.png',
        description: 'which is a bilibili video'
    }
]

interface ProjectProps {
    project: {
        title: string,
        url: string,
        image: string,
        description: string
    },
    hightlighted: boolean
}

const Project = (props: ProjectProps) => {
    const { project, hightlighted } = props
    const background = useRef<ThreeElements.mesh>()
    const bgOpacity = useMotionValue(0.4)

    useEffect(() => {
        animate(bgOpacity, hightlighted ? 1 : 0.4, { duration: 0.5 })
    }, [hightlighted])// 背景随着被选中项目变更而变更

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get()
    })

    return (
        < group {...props}
            // position-x={-3.8}
            position-y={0.6}
        >
            {/* // 有一个平面 */}
            <mesh
                onClick={() => window.open(project.url, '_blank')}// _blank 表示在新窗口打开
                position-z={-0.001}
                position-y={-1} // position of the image
                ref={background}
            >
                <planeGeometry attach="geometry" args={[0.9, 0.9]} />
                <meshBasicMaterial attach="material" color="black" transparent opacity={.4} />
            </mesh>
            <Image
                scale={[0.6, 0.5]} // size of the image
                url={project.image} // provide the path to your image
                toneMapped={false} // set to false if you want to use the default tone mapping
                position-y={-0.9} // position of the image
            />
            <Text
                maxWidth={0.85}
                anchorX={'left'}
                anchorY={'top'}
                fontSize={0.1}
                position={[0 - 0.32, -1.18, 0]}
            >
                {project.title.toUpperCase()}
            </Text>
            <Text
                maxWidth={0.85}
                anchorX={'left'}
                anchorY={'top'}
                fontSize={0.06}
                position={[0 - 0.32, -1.32, 0]}
            >
                {project.description}
            </Text>
        </group >
    )
}

export const currentProjectAtom = atom(Math.floor(projects.length / 2))// 当前选中的项目：为数组长度一半的那一项

export const Projects = () => {
    const [currentProjectZAtom] = useAtom(currentProjectAtom)
    const { viewport } = useThree()
    return (
        <group position-y={-viewport.height * 2 + 1}>
            {projects.map((project, index) => (
                <motion.group
                    key={'project_' + index}
                    //一字排开
                    // position={[-index * -1, 0, 0]}
                    animate={{
                        x: 0 + (index - currentProjectZAtom) * 1,
                        y: currentProjectZAtom === index ? 0.08 : 0.1,
                        z: currentProjectZAtom === index ? 0.03 : -0.05,
                        rotateX: currentProjectZAtom === index ? -Math.PI / 8 : Math.PI / 900,
                        rotateZ: currentProjectZAtom === index ? 0 : -Math.PI / 60,
                    }}
                >
                    <Project project={project} hightlighted={index === currentProjectZAtom} />
                </motion.group>
            ))
            }
        </group >
    )
}