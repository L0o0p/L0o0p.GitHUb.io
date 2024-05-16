import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
    const cursorOutline = useRef<HTMLDivElement>(null);
    const [hoverButton, setHoverButton] = useState(false);

    const animate = () => {
        const distX = mouseX - outlineX;
        const distY = mouseY - outlineY;

        outlineX = outlineX + distX * CURSOR_SPEED;
        outlineY = outlineY + distY * CURSOR_SPEED;
        if (cursorOutline.current) {
            cursorOutline.current.style.left = `${outlineX}px`;
            cursorOutline.current.style.top = `${outlineY}px`;
            requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        const mouseEventsListener = function (event: MouseEvent) {
            mouseX = event.pageX;
            mouseY = event.pageY;
        };
        document.addEventListener("mousemove", mouseEventsListener);
        const animateEvent = requestAnimationFrame(animate);
        return () => {
            document.removeEventListener("mousemove", mouseEventsListener);
            cancelAnimationFrame(animateEvent);
        };
    }, []);

    useEffect(() => {
        const mouseEventListener = function (e) {
            if (
                e.target &&
                (
                    (e.target as HTMLElement).tagName.toLowerCase() === "button" ||
                    (e.target as HTMLElement).parentElement &&
                    (e.target as HTMLElement).parentElement.tagName.toLowerCase() === "button" ||
                    (e.target as HTMLElement).tagName.toLowerCase() === "input" ||
                    (e.target as HTMLElement).tagName.toLowerCase() === "textarea"
                )
            ) {
                setHoverButton(true);
            } else {
                setHoverButton(false);
            }
        };
        document.addEventListener("mouseover", mouseEventListener);
        return () => {
            document.removeEventListener("mouseover", mouseEventListener);
        };
    }, []);


    return (
        <>
            <div
                className={`z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform
        ${hoverButton
                        ? "bg-transparent border-2 border-indigo-900 w-5 h-5"
                        : "bg-indigo-500 w-3 h-3"
                    }`}
                ref={cursorOutline}
            ></div>
        </>
    );
};