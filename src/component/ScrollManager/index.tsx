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
    //在 useEffect 钩子中，当 section 变量变化时，会触发一个新的滚动动画。在 gsap.to 动画函数中，onStart 和 onComplete 回调函数被用来更新 isAnimating 的状态：

    // onStart: 当动画开始时，onStart 函数被调用，设置 isAnimating.current 为 true。这表示动画正在进行中。
    // onComplete: 当动画完成时，onComplete 函数被调用，设置 isAnimating.current 为 false。这标志着动画已结束。

    useFrame(() => {
        // 这里是使用gsap库来实现滚动动画，这里的scrollTop表示滚动到section的容器的滚动位置
        if (isAnimating.current) {
            // 这里是判断isAnimating的值，如果isAnimating的值为true，表示正在进行滚动动画，则不进行滚动动画
            lastScroll.current = data.offset// 这里是将lastScroll的值设置为data.scroll的值
            return;
        }
        const nextSectionStart = 1 / (data.pages - 1); // 计算进入下一个区段的起始点
        // 这行代码计算当前的 section 索引。data.offset 是一个介于 0 到 1 之间的值，表示用户滚动的相对位置。data.pages 是总的页面数量或滚动区段数。将这两个值相乘后取整，可以得到当前用户所在的 section。
        const curSection = Math.floor(data.offset * data.pages)// 这里是将data.scroll的值乘以data.pages的值，得到当前的section
        // 这行代码计算当前的 section 索引。data.offset 是一个介于 0 到 1 之间的值，表示用户滚动的相对位置。data.pages 是总的页面数量或滚动区段数。将这两个值相乘后取整，可以得到当前用户所在的 section。
        if (data.offset > lastScroll.current && curSection === 0) {
            onSectionChange(1);
        }
        // 如果当前滚动位置小于上一次记录的位置，并且当前滚动位置小于 1 / (data.pages - 1)，则调用 onSectionChange(0)。这个条件通常是在用户从第二个区段向上滚动回第一个区段时触发。1 / (data.pages - 1) 是计算第一个区段的上限阈值。
        if (
            data.offset < lastScroll.current &&
            data.offset < 1 / (data.pages - 1)
        ) {
            onSectionChange(0);
        }
        if (data.offset > lastScroll.current) {
            // 检测向下滚动
            if (curSection === 0 && data.offset >= nextSectionStart) {
                // 如果当前区段是0，并且滚动位置超过了第二个区段的起始点
                onSectionChange(2);
            }
        } else if (data.offset < lastScroll.current) {
            // 检测向上滚动
            if (curSection === 1 && data.offset < nextSectionStart) {
                // 如果当前区段是1，并且滚动位置回到了第一个区段的范围内
                onSectionChange(1);
            }
        }

        // 最后，更新 lastScroll.current 为当前的滚动位置，为下一帧的比较准备数据。
        lastScroll.current = data.offset;
    });

    return null;
};