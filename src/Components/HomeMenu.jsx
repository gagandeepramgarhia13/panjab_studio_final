export default function HomeMenu() {
    const buttons = [
        "Photography",
        "Cinematography",
        "About",
        "Get in Touch",
    ];

    return (
        <div className="w-full flex justify-center py-10">

            {/* Button Container */}
            <div className="flex flex-wrap justify-center gap-4">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        className="px-6 py-2 bg-[#EEE9D0] text-[#5A4B38]  border-[#5A4B38] rounded-full hover:bg-[#5A4B38] hover:text-white transition duration-300"
                    >
                        {btn}
                    </button>
                ))}
            </div>

        </div>
    );
}