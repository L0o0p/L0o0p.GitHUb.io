import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Scene } from "./Scene"
import { Sky, PerspectiveCamera, Text } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Vector3 } from "three"
import { motion } from "framer-motion-3d"
import { Bloom, EffectComposer } from '@react-three/postprocessing';
// import { Model } from "./Scene/AiGalleryBaked"

export const ThreeD = () => {
    return (
        <Canvas
            shadows
            flat
            dpr={[1, 1.5]}
            gl={{ antialias: false }}
        >
            {/* <OrbitControls /> */}
            <PerspectiveCamera
                makeDefault
                position={[0 + 4, 1, 2]}
            // rotation={[0, Math.PI / 2, 0]}
            />
            <ambientLight intensity={1.5 * Math.PI} />
            <Sky />
            <Scene />
            {/* <Baked /> */}ya
            <InteractiveFloor />
            {/* <CameraWatcher /> */}
            <CameraControls />
        </Canvas>
    )
}

function CameraControls() {
    const { camera } = useThree();
    const moveState = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        rotateLeft: false,
        rotateRight: false,
    });

    const moveSpeed = 0.05;
    const rotationSpeed = 0.01; // 适当调整旋转速度

    // 定义边界
    const bounds = {
        minX: -2.2,
        maxX: 3.5,
        minZ: -3,
        maxZ: 4
    };

    useEffect(() => {
        // 设置摄像机初始朝向的点，例如朝向原点
        camera.lookAt(new Vector3(0, 1, 2));
    }, [camera])

    useEffect(() => {
        const onKeyDown = (event: { key: any }) => {
            switch (event.key) {
                case 'w': moveState.current.forward = true; break;
                case 's': moveState.current.backward = true; break;
                case 'a': moveState.current.right = true; break;
                case 'd': moveState.current.left = true; break;
                case 'q': moveState.current.rotateLeft = true; break;
                case 'e': moveState.current.rotateRight = true; break;
                default: break;
            }
        };

        const onKeyUp = (event: { key: any }) => {
            switch (event.key) {
                case 'w': moveState.current.forward = false; break;
                case 's': moveState.current.backward = false; break;
                case 'a': moveState.current.right = false; break;
                case 'd': moveState.current.left = false; break;
                case 'q': moveState.current.rotateLeft = false; break;
                case 'e': moveState.current.rotateRight = false; break;
                default: break;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    useFrame(() => {
        const direction = new Vector3();
        camera.getWorldDirection(direction);

        // 向前和向后移动
        if (moveState.current.forward) camera.position.addScaledVector(direction, moveSpeed);
        if (moveState.current.backward) camera.position.addScaledVector(direction, -moveSpeed);

        // 向左和向右移动
        const right = new Vector3();
        right.crossVectors(camera.up, direction).normalize();
        if (moveState.current.left) camera.position.addScaledVector(right, -moveSpeed);
        if (moveState.current.right) camera.position.addScaledVector(right, moveSpeed);

        // 旋转
        // 使用 rotateY 保持全局Y轴旋转
        if (moveState.current.rotateLeft) camera.rotateY(rotationSpeed);
        if (moveState.current.rotateRight) camera.rotateY(-rotationSpeed);

        camera.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, camera.position.x));
        camera.position.z = Math.max(bounds.minZ, Math.min(bounds.maxZ, camera.position.z));
    });

    return null;
}

function InteractiveFloor() {
    const { camera } = useThree();
    const [isOverTarget, setIsOverTarget] = useState(false);
    const targetPosition = new Vector3(0 - 1.800, 1, 2); // 目标区域的中心位置
    const range = 0.5; // 考虑范围的大小，1.5单位范围内有效

    useFrame(() => {
        if (camera.position.distanceTo(targetPosition) <= range) {
            if (!isOverTarget) {
                setIsOverTarget(true);
                console.log("摄像机现在在目标区域上方");
                // 这里可以触发任何相关的事件
            }
        } else {
            if (isOverTarget) {
                setIsOverTarget(false);
                console.log("摄像机已离开目标区域");
            }
        }
    });

    useEffect(() => {
        const handleKeyDown = (event: { code: string }) => {
            if (event.code === 'Space' && isOverTarget) {
                window.location.href = "https://ai.cytelab.net/login"
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOverTarget]);

    return (
        <group>

            <motion.group
                position={[-2.903 - 1.5, 1, 1.56]}
                rotation={[0, Math.PI / 2, 0]}
                animate={{
                    scale: isOverTarget ? 0.6 : 0
                }}
            >
                <Text
                    children={
                        '<开始创作>'
                    }
                    color={'greenyellow'}
                />
            </motion.group>
            {isOverTarget && (
                <>
                    <mesh position={[-4.8, 1.14, 1.56]} rotation={[0, Math.PI / 2, 0]}  >
                        <planeGeometry args={[6.8, 2.08]} />
                        <meshStandardMaterial color='black' transparent opacity={0.1} />
                    </mesh>
                    <mesh
                        position={[-2.903, 0, 1.56]}
                        rotation={[0, Math.PI / 2, 0]}
                        onClick={() => console.log("Floor clicked!")}
                        castShadow
                    >
                        <boxGeometry args={[6.8, 0.1, 4.14]} />
                        <meshStandardMaterial color='greenyellow' />
                    </mesh>
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
                    </EffectComposer>
                </>
            )}
        </group >

    );
}
