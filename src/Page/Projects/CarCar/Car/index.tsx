// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'
import CarRest from './CarRest'
import CarLdoor from './CarLdoor'
import CarRdoor from './CarRdoor'
import { useState } from 'react'
import { useSpring } from '@react-spring/three';
import { animated } from '@react-spring/three';

// import { M } from 'vite/dist/node/types.d-FdqQ54oU'
interface CarProps {
    onLight?: boolean;
    onOneClick?: () => void;
}

export const Car = (props: CarProps) => {
    const [clicked, click] = useState(false)
    const [clickedL, clickL] = useState(false)

    const x = 1.6;
    const y = 0;
    const z = -.8;

    const xa = 1.6;
    const ya = 0;
    const za = 0.8;

    const { rotX: rotXR, rotY: rotYR, rotZ: rotZR } = useSpring({
        rotX: clicked ? 0 : 0,
        rotY: clicked ? Math.PI / 3 : 0,
        rotZ: clicked ? 0 : 0,
        config: { mass: 1, tension: 210, friction: 20 },
    });
    const { rotX: rotXL, rotY: rotYL, rotZ: rotZL } = useSpring({
        rotX: clickedL ? 0 : 0,
        rotY: clickedL ? -Math.PI / 3 : 0,
        rotZ: clickedL ? 0 : 0,
        config: { mass: 1, tension: 210, friction: 20 },
    });



    // eslint-disable-next-line react/prop-types
    const { onLight } = props
    const lightIntensity = onLight ? 1000 : 0;

    // eslint-disable-next-line react/prop-types
    const { onOneClick } = props

    function onCarClick() {
        // setOnLight(!onLight)
        onOneClick?.(); // 在确认是函数后调用
    }

    return (
        <>
            {/* 右门 */}
            <animated.group
                position={[0 - x, 0 - y, 0 - z]}
                rotation-x={rotXR}
                rotation-y={rotYR}
                rotation-z={rotZR}
                onClick={() => { click(!clicked); onCarClick(); }}
            >

                {/* eslint-disable-next-line react/no-unknown-property */}
                <group position={[0 + x, 0 + y, 0 + z]}>
                    <CarRdoor />
                </group>
            </animated.group>

            {/* 左门 */}
            <animated.group
                position={[0 + xa, 0 + ya, 0 + za]}
                rotation-x={rotXL}
                rotation-y={rotYL}
                rotation-z={rotZL}
                onClick={() => { clickL(!clickedL); onCarClick(); }}
            >


                {/* eslint-disable-next-line react/no-unknown-property */}
                <group position={[0 - xa, 0 - ya, 0 - za]}>
                    <CarLdoor />
                </group>
            </animated.group>

            {/* 车身 */}
            <animated.group
            // ref={backObjectRef}
            // onClick={onCarClick}
            >
                <CarRest />
            </animated.group>

            <group>
                {/* <pointLight color="blue" position={[0, 1.2, 0]} intensity={200}/> */}
                {/*  eslint-disable-next-line react/no-unknown-property */}
                <pointLight color="blue" position={[0, 1.7, 0]} intensity={lightIntensity} />
                {/*  eslint-disable-next-line react/no-unknown-property */}
                <pointLight color="blue" position={[0 + 0.8, 1.7, 0 + .5]} intensity={lightIntensity} />
                {/*  eslint-disable-next-line react/no-unknown-property */}
                <pointLight color="blue" position={[0 - 0.8, 1, 0 + .4]} intensity={lightIntensity} />
            </group>



        </>
    )
}