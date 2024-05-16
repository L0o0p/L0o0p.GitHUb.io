import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { setProjectShow, setTab } from '../Store';
import { useAtom } from 'jotai';
import { Avatar } from './Avatar';

export const NavBar = () => {
    const tabsX = ['Home', 'Projects', 'Chat'];
    const tabsY = ['Login', 'Setting'];
    const [activeTabIndex, setActiveTabIndex] = useAtom(setTab); // 初始化为 1，表示第一个标签
    const [menu, openMenu] = useState(false)
    const optionClick = () => {
        openMenu(!menu)
        console.log(menu)
    }

    // 在组件加载时，尝试从 LocalStorage 获取之前保存的标签索引
    useEffect(() => {
        const savedIndex = localStorage.getItem('activeTabIndex');
        if (savedIndex) {
            setActiveTabIndex(parseInt(savedIndex));
        }
    }, []);
    const [, setProjectShowstate] = useAtom(setProjectShow)
    const handleClick = (index: number) => {
        setActiveTabIndex(index);
        localStorage.setItem('activeTabIndex', index.toString()); // 保存索引到 LocalStorage
        openMenu(false)
        console.log('clicked the tab', index);
        if (setProjectShow) { setProjectShowstate(!setProjectShow); console.log('state Changed', setProjectShow) }
    };

    return (
        <>
            <div className={styles.navContainer}>
                <div className={styles.tabs}>
                    <Avatar />
                    {tabsX.map((tab, index) => (
                        <Link
                            key={tab}
                            to={`/${tab.toLowerCase()}`}
                            className={`${styles.tab} ${index === activeTabIndex ? styles.active : ''}`}
                            onClick={() => { handleClick(index); optionClick() }}
                        >
                            {tab}
                        </Link>
                    ))}

                </div>
                <div className={styles.tabs}>
                    <div className={styles.divider}>|</div>
                    <div className={styles.tabs}>
                        {tabsY.map(tab => (
                            <div
                                key={tab}
                                className={styles.tabY}  // 添加新类名
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};