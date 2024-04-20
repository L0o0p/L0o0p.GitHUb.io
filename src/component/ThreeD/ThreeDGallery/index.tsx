import { useFrame, useThree } from "@react-three/fiber"
import { Image } from "@react-three/drei"
import { atom, useAtom } from "jotai"
import { motion } from "framer-motion-3d"
import { useEffect, useRef } from "react"
import { animate, useMotionValue } from "framer-motion"
import { Material, Mesh } from "three"

// 图片
export const items = [
    {
        title: 'One',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/image/020.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Two',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/image/021.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Three',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/image/008.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Four',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/image/045.png',
        description: 'which is a bilibili video'
    },
    {
        title: 'Five',
        url: 'https://www.bilibili.com/video/BV1mJ4m1G7T1?spm_id_from=333.1007.tianma.2-2-4.click',
        image: '/image/068.png',
        description: 'which is a bilibili video'
    }
]

interface ThreeDGalleryItemProps {
    item: {
        title: string,
        url: string,
        image: string,
        description: string
    }
    highlighted: boolean
}

// 画框
const ThreeDGalleryItem = (props: ThreeDGalleryItemProps) => {
    const { item, highlighted } = props // 图片编号
    const imageSize: number | [number, number] | undefined = [0.5, 0.5] //图片大小
    const frameSize = 1.2 //画框大小
    const background = useRef<Mesh>(null)//将画框指定为一个ref
    const bgOpacity = useMotionValue(0.4) //定义一个可变的变量，用于控制透明度

    // 背景随着选中态变更而变更
    useEffect(() => {
        animate(bgOpacity, highlighted ? 1 : 0.4, { duration: 0.5 })
    }, [highlighted])

    //对于每一帧，实时接收这个透明度的值
    useFrame(() => {
        if (background.current?.material) {
            const { material } = background.current;

            if (Array.isArray(material)) {
                material.forEach((mat: Material) => {
                    mat.opacity = bgOpacity.get();
                });
            } else {
                (material as Material).opacity = bgOpacity.get();
            }
        }

    })

    return (
        < group>
            {/* // 有一个平面 */}
            <mesh
                // onClick={() => window.open(project.url, '_blank')}// _blank 表示在新窗口打开
                position-z={-0.001}
                // position-y={-1} // position of the image
                ref={background}
            >
                <planeGeometry attach="geometry" args={[imageSize[0] * frameSize, imageSize[1] * frameSize]} />
                <meshBasicMaterial attach="material" color="black" transparent opacity={.4} />
            </mesh>
            <Image
                scale={imageSize} // size of the image
                url={item.image} // provide the path to your image
                toneMapped={false} // set to false if you want to use the default tone mapping
            />
        </group >
    )
}

// 初始化 选中态：为数组长度一半的那一项
export const currentItemAtom = atom(Math.floor(items.length / 2))

// 画廊
export const ThreeDGallery = () => {
    const { viewport } = useThree()
    const [currentItem] = useAtom(currentItemAtom)

    return (
        <motion.group
            position={[0, 0 - viewport.height * 2 + 1, 0]}
            animate={{
                x: currentItem,
                transition: { duration: 0.6 }
            }}
        >
            {items.map((item, index) => (
                <motion.group
                    position={[-index * 1, 0, 0]}
                    key={'section' + index}
                    animate={{
                        y: currentItem === index ? 0 - 0.15 : 0,
                        z: currentItem === index ? 0 + 0.10 : 0,
                        rotateX: currentItem === index ? 0 : -Math.PI / 3,
                        transition: { duration: 0.6 }
                    }}
                ><group position={[0, 0.5, 0]}>
                        <ThreeDGalleryItem
                            item={item}
                            highlighted={currentItem === index}
                        />
                    </group>
                </motion.group>
            ))}
        </motion.group>
    )
}