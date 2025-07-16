import { useNavigate } from 'react-router-dom';
import BackgroundVideo from '../components/BackgroundVideo';

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/proposal');
    };

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
