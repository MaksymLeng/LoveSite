import HeartParticles from "../components/HeartParticles";

export default function Proposal() {
    return (
        <div className="relative w-full min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#70139f] via-[#79156b] to-[#340575]">
            <HeartParticles />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h1 className="text-white drop-shadow-xl text-5xl md:text-7xl italic font-bold text-center">
                    Ты будешь Моей девушкой?
                </h1>
            </div>
        </div>
    );
}
