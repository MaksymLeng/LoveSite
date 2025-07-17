// src/components/HeartParticles.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all"; // включает image shape

// Фабрика настроек: отдаёт разные числа/размеры в зависимости от ширины экрана
function makeOptions(isMobile) {
    const speed = isMobile ? 1 : 1.8;        // падают медленнее на мобилках
    const count = isMobile ? 30 : 60;

    return {
        autoPlay: true,
        fullScreen: {
            enable: false, // ВАЖНО: не перекрываем весь вьюпорт, а живём в родителе
            zIndex: 0,
        },
        detectRetina: true,
        fpsLimit: 60,

        interactivity: {
            detectsOn: "window",
            events: {
                resize: { enable: true, delay: 0.5 },
                onClick: { enable: false, mode: [] },
                onHover: { enable: false, mode: [] },
            },
        },

        particles: {
            number: {
                value: count,
                density: { enable: false },
            },

            // цвет обязателен по схеме, но на image не влияет
            color: { value: "#ffffff" },

            shape: {
                type: "image",
                options: {
                    image: [
                        { src: "/img/heart.png",  width: 32, height: 32 },
                        { src: "/img/flower.png", width: 32, height: 32 },
                        { src: "/img/axoltl.png", width: 32, height: 32 },
                    ],
                },
            },

            opacity: {
                value: 1,
                random: { enable: true, minimumValue: 0.6 },
            },

            size: {
                value: isMobile ? 20 : 24,
                random: { enable: true, minimumValue: 12 },
            },

            move: {
                enable: true,
                direction: "bottom",
                speed,
                straight: false,
                random: false,
                gravity: { enable: false },
                drift: 0,
                outModes: {
                    default: "out",
                    bottom: "out",
                    top: "out",
                    left: "out",
                    right: "out",
                },
                wobble: {
                    enable: true,
                    distance: 10,
                    speed: {
                        angle: 10,
                        move: 5,
                    },
                },
            },

            links: { enable: false },
            collisions: { enable: false },
            shadow: { enable: false },
            stroke: { width: 0 },

            zIndex: {
                value: { min: 0, max: 0 },
            },
        },

        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
    };
}

export default function HeartParticles() {
    const [ready, setReady] = useState(false);
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 640 : false
    );

    // Инициализация движка один раз
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine); // хочешь облегчить размер — скажи, сделаем slim+image
        }).then(() => {
            setReady(true);
        });
    }, []);

    // Следим за ресайзом (переворот телефона / изменение ширины)
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    const particlesLoaded = useCallback((container) => {
        console.log("Particles loaded:", container);
    }, []);

    // Пересчитываем options при смене isMobile
    const options = useMemo(() => makeOptions(isMobile), [isMobile]);

    if (!ready) return null;

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
