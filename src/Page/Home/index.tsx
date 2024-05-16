import { useEffect, useState } from "react";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import styles from './index.module.scss'
import 'animate.css';
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { setTab } from "../../Store";
import { Float } from "../../component/Float";



export const Home = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Web Developer", "3D Artist", "Web Designer",];
    const period = 2000;
    const [activeTabIndex, setActiveTabIndex] = useAtom(setTab); // 初始化为 1，表示第一个标签
    const [hover, setHover] = useState(false);
    // 处理鼠标进入事件
    const handleMouseEnter = () => {
        setHover(true);
        console.log('Mouse is hovering!');
    };

    // 处理鼠标离开事件
    const handleMouseLeave = () => {
        setHover(false);
        console.log('Mouse is not hovering.');
    };
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.textContainer}>
                    <span className={styles.tagline}>Welcome to my Portfolio</span>

                    <h1 className={styles.bigTitle}>
                        <p>
                            {`Hi! I'm Loop Shen, `}
                        </p>
                        <span className="txt-rotate" dataperiod="1000" data-rotate='[ "Web Developer", "3D Artist", "Web Designer", ]'>
                            <span className="wrap">{text}</span>
                        </span>
                    </h1>
                    <div className={styles.description}>
                        <p>Go big or go home when it comes to having fun --👻 👻</p>
                        <p> Party like there’s no tomorrow...HahHah..</p>
                    </div>
                    <div
                        className={styles.aniButton}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            marginLeft: hover ? '10px' : '0px',
                            transition: 'margin-left 0.2s ease-in-out, font-style 0.2s ease-in-out',
                            fontStyle: hover ? 'italic' : 'normal' // 控制字体样式
                        }}
                    >
                        <Link onClick={() => { console.log('Go sightseeing～'); setActiveTabIndex(1) }} to={"/projects"}>Go sightseeing</Link>
                        <div style={{ marginLeft: hover ? '10px' : '0px', transition: 'margin-left 0.3s ease-in-out' }}><ArrowRightCircle size={25} /></div>
                    </div>
                </div>
            </div >
            <Float />
        </>
    )
}