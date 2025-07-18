import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BackgroundVideo from '../components/BackgroundVideo';

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/proposal');
    };

    useEffect(() => {
        const video = document.querySelector('video');
        if (video) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("✅ Video autoplayed successfully");
                    })
                    .catch((error) => {
                        console.warn("⚠️ Autoplay blocked:", error);
                    });
            }
        }
    }, []);

    return (
        <div className="relative w-full h-screen">
            <BackgroundVideo />
            <div
                onClick={handleClick}
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            >
            </div>
        </div>
    );
}

