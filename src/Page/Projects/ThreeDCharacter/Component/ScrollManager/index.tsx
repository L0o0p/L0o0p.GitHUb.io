//该组件的主要功能是根据用户的滚动位置自动切换到不同的滚动区段，并对这些滚动事件进行平滑的动画处理。
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface ScrollManagerProps {
    section: number
    onSectionChange: (section: number) => void
    // children: React.ReactNode
}


// 这是一个简单的滚动管理器
export const ScrollManager = (props: ScrollManagerProps) => {
    const { section, onSectionChange } = props; // 这里是你传入的参数

    const data = useScroll();// 这里是useScroll的返回值
    const lastScroll = useRef(0);// 这里是lastScroll的ref，这里是用来记录上一次的滚动位置，0表示初始状态
    const isAnimating = useRef(false); // 这里是isAnimating的ref，用来判断是否正在进行滚动

    data.fill.classList.add("top-0");// 这里是给el添加一个top-0的类名，这是为了让el的滚动位置为0，el是scroll的容器
    data.fill.classList.add("absolute");// 这里是给el添加一个absolute的类名，这是为了让el的滚动位置为0，el是scroll的容器

    // 这里是useEffect的回调函数，当section改变时，就会执行useEffect的回调函数
    useEffect(() => {
        // 这里是使用gsap库来实现滚动动画，这里的scrollTop表示滚动到section的容器的滚动位置
        gsap.to(data.el, {
            duration: 1,
            scrollTop: section * data.el.clientHeight,// 这里是将section的容器的滚动位置乘以section的容器的高度，得到section的容器的滚动位置
            onStart: () => {
                isAnimating.current = true;// 这里是将isAnimating的值设置为true，表示正在进行滚动动画
            },
            onComplete: () => {
                isAnimating.current = false;
            },
        });
    }, [section]);

    useFrame(() => {
        // 这里是使用gsap库来实现滚动动画，这里的scrollTop表示滚动到section的容器的滚动位置
        if (isAnimating.current) {
            // 这里是判断isAnimating的值，如果isAnimating的值为true，表示正在进行滚动动画，则不进行滚动动画
            lastScroll.current = data.scroll.current// 这里是将lastScroll的值设置为data.scroll的值
            return;
        }

        const curSection = Math.floor(data.scroll.current * data.pages)// 这里是将data.scroll的值乘以data.pages的值，得到当前的section
        if (data.scroll.current > lastScroll.current && curSection === 0) {
            onSectionChange(1);
        }
        if (
            data.scroll.current < lastScroll.current &&
            data.scroll.current < 1 / (data.pages - 1)
        ) {
            onSectionChange(0);
        }
        lastScroll.current = data.scroll.current;
    });

    return null;
};