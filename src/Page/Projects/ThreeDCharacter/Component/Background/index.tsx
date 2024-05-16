import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three'
import gsap from 'gsap'

export const Background = () => {
    const material = useRef()
    const color = useRef({
        color: '#b9bcff'
    })
    const data = useScroll()
    const tl = useRef()

    useFrame(() => {
        if (tl.current) {
            tl.current.progress(data.scroll.current);
        }
        if (material.current) {
            material.current.color.set(color.current.color); // 使用 .set 方法更新颜色
        }
    });

    useEffect(() => {
        // 初始化 GSAP 时间线
        tl.current = gsap.timeline({ paused: true });

        // 创建颜色的过渡动画
        tl.current.to(color.current, { color: "#212121", duration: 1 });
        tl.current.to(color.current, { color: "#7a7ca5", duration: 1 });
        tl.current.to(color.current, { color: "#9b96dd", duration: 1 });
    }, []);

    return (
        <group>
            <Sphere scale={30}>
                <meshBasicMaterial
                    ref={material}
                    side={THREE.BackSide}
                    toneMapped={false}
                />
            </Sphere>
        </group>
    )
}