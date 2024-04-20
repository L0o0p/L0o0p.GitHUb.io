interface MenuProps {
    onSectionChange: (index: number) => void;
    menuOpened: boolean;
    setMenuOpened: (index: boolean) => void;
}

interface MenuButtonProps {
    label: string;
    onClick: () => void;
}

export const Menu = (props: MenuProps) => {
    const { onSectionChange, menuOpened, setMenuOpened } = props;

    // “菜单的开关按钮”的点击事件
    const onLableClick = (i: number) => {
        setMenuOpened(false);// 关闭菜单
        onSectionChange(i);// 跳转
        console.log('clicked0');//检查
    }
    return (
        <>
            {/* 菜单的开关按钮 */}
            <button
                onClick={() => { setMenuOpened(!menuOpened); console.log('clicked') }}
                className="z-20 fixed top-12 right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md  "
            >
                <div className="flex  flex-col items-center justify-center">
                <div
                    className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? 'rotate-45 translate-y-0.5' : ''}`}
                />
                <div
                    className={`bg-white h-0.5 rounded-md w-full my-1 ${menuOpened ? ' hidden' : ''}`}
                />
                <div
                    className={`bg-white h-0.5 rounded-md w-full my-1 ${menuOpened ? ' -rotate-45' : ''}`}
                />
                </div>
            </button>

            {/* 菜单的条目容器 */}
            <div
                className={`z-10 fixed top-0 right-0 bottom-0  bg-white transition-all overflow-hidden flex flex-col
                ${menuOpened ? 'w-80' : 'w-0'}`}
            >
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                    <MenuButton label="Home" onClick={() => onLableClick(0)} />
                    <MenuButton label="Skills" onClick={() => onLableClick(1)} />
                    <MenuButton label="Project" onClick={() => onLableClick(2)} />
                    <MenuButton label="Contact me" onClick={() => onLableClick(3)} />
                </div>
            </div >

        </>
    )
}

// 菜单中的内容条目
const MenuButton = (props: MenuButtonProps) => {
    const { label, onClick } = props
    return (
        <button
            onClick={onClick}
            className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors font-tilt"
        >
            {label}
        </button>
    )
}