import { useRef, useState } from 'react';
import './index.css';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { useSpring, animated, config } from '@react-spring/three';
import TWEEN from '@tweenjs/tween.js'
import Env from './Environment/Env.js';
import { Car } from './Car/index.js'
import { Globals } from '@react-spring/three';

Globals.assign({
    frameLoop: "always",
});


function Tween() {
    useFrame(() => {
        TWEEN.update()
    })
    return null
}
// function InteractiveObject(props: any) {
//     const backObjectRef = useRef<any>();
//     const { camera, raycaster, pointer, size } = useThree();
//     const { onBackObjectClick } = props

//     const handlePointerDown = (event: any) => {
//         // 更新鼠标位置，event.clientX和event.clientY是屏幕坐标
//         // 将屏幕坐标转换到-1到1的范围内的标准化设备坐标 (NDC)
//         // 创建一个新的Vector2来存储NDC坐标
//         const pointer = new THREE.Vector2();
//         pointer.x = ((event.clientX) / size.width) * 2 - 1;
//         pointer.y = -((event.clientY) / size.height) * 2 + 1;

//         // 使用THREE.Vector2实例作为参数
//         raycaster.setFromCamera(pointer, camera);

//         // 获取与射线相交的所有对象
//         const intersects = raycaster.intersectObjects([backObjectRef.current], true);

//         // 检查是否我们的特定对象被击中了
//         if (intersects.length > 0) {
//             onBackObjectClick?.();
//         }
//     };



//     return (
//         <mesh ref={backObjectRef} position={[0, 1, 0]} onPointerDown={handlePointerDown}>
//             {/* ...mesh的子组件，如geometry和material */}
//             <boxGeometry />
//             <meshStandardMaterial />
//         </mesh>
//     );
// }

export const CarCar = () => {
    const [active, setActive] = useState(false);
    const controlRef = useRef<any>(!null)
    const cameraRef = useRef<any>()


    const toInCarAnimated = () => {
        new TWEEN.Tween(controlRef.current.target)
            .to(
                {
                    x: 0,
                    y: 3,
                    z: 8
                },
                500
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

        new TWEEN.Tween(cameraRef.current.position)
            .to(
                {
                    x: 0.75,
                    y: 1.8,
                    z: -0.8
                },
                500
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

        new TWEEN.Tween(cameraRef.current.fov)
            .to(
                { fov: 80 },
                500
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()
    }

    const toOutCarAnimated = () => {
        new TWEEN.Tween(controlRef.current.target)
            .to(
                {
                    x: 0,
                    y: 1,
                    z: 0
                },
                500
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

        new TWEEN.Tween(cameraRef.current.position)
            .to(
                {
                    x: 5,
                    y: 5,
                    z: 8
                },
                500
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

        new TWEEN.Tween(cameraRef.current.fov)
            .to(
                { fov: 60 },
                500
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()
    }
    const [onLight, setOnLight] = useState(false);
    // 点击事件
    const handleClick = () => {
        setActive(!active);
        if (active) {
            toOutCarAnimated()
        } else {
            toInCarAnimated()
        }

        console.log(
            'target', controlRef.current.target,
            'camera', cameraRef.current.position,
            'active', active
        )

        setOnLight(!onLight)
    }

    const Look = active ? 'Look outCar' : 'Look inCar'


    return (
        <>
            <div className='layout' onClick={() => handleClick()}><div>{Look}</div></div>
            <Canvas shadows={true} >
                {/* 坐标轴辅助器 */}
                {/* <axesHelper args={[10]} /> */}
                <group
                    position={[0, 5, 0]}
                >
                    <Env />
                </group>

                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault={true}
                    position={[5, 3, 8]}
                    fov={60}
                />

                <OrbitControls
                    ref={controlRef}
                    target={[0, 1, 0]}
                    maxDistance={15}
                    minDistance={0}
                    maxPolarAngle={active ? (Math.PI) : (Math.PI / 3)}
                    // 运动阻尼感
                    enableDamping={true}
                    dampingFactor={0.07}
                    zoomSpeed={3} // 镜头滚动速度
                    // 自动旋转
                    autoRotate={active ? false : true}
                    autoRotateSpeed={-2}

                />

                {/* <mesh
          // ref={backObjectRef}
          position={[0, 1, 0]}
          onClick={() => handleClick()}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh> */}

                {/* <animated.group */}
                {/* // onClick={handleClick} */}
                {/* > */}
                <Car
                    onLight={onLight}
                // onOneClick={() => handleClick()}
                />
                {/* </animated.group> */}
                <Tween />
            </Canvas>
        </>
    );
}



