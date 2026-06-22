
const Gemini = () => {
    return (
        <div className="min-h-screen  font-sans text-darkText">
            {/* Hero Section */}
            <main className="relative max-w-[1460px] mx-auto px-4 sm:px-8 pb-20">
                <div className="flex flex-col lg:flex-row items-center">

                    {/* Overlapping Circle Content */}
                    <div className="z-10 lg:absolute lg:left-8 bg-[#EEE9D0] rounded-full border-[1px] border-gold p-8 md:p-16 w-[350px] h-[350px] md:w-[550px] md:h-[550px] flex flex-col justify-center items-center text-center shadow-sm mb-[-50px] lg:mb-0">

                        {/* Wavy Border decoration (Simulated with pseudo-elements or an SVG) */}
                        <div className="absolute inset-4 rounded-full border border-gold opacity-30 border-dashed"></div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">

                            <span className="text-gold italic font-light" >Crafting Timeless Visual Stories</span>
                        </h1>
                        <p className=" text-xs md:text-sm leading-relaxed mb-8">
                            Welcome to Panjab Studio—your premier photography & cinematography team based in Birmingham. We specialize in bringing to life the vibrant emotions and authentic moments of weddings across the UK and around the world.
                        </p>
                        <a href="">
                            <button>
                                <u>
                                    Read More About Us →
                                </u>
                            </button>
                        </a>
                    </div>

                    {/* Hero Image Container */}
                    <div className="w-full lg:w-4/5 lg:ml-auto">
                        <div className="relative rounded-[40px] md:rounded-[80px] overflow-hidden border-[1px] border-gold ">

                            {/* Outer decorative border frame */}
                            <div className="absolute inset-4 md:inset-8 border border-gold rounded-[30px] md:rounded-[60px] pointer-events-none"></div>

                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-[400px] md:h-[700px] object-cover rounded-[30px] md:rounded-[60px]"
                            >
                                <source src="/videos/hero_vdo.mp4" type="video/mp4" />
                            </video>

                            {/* <img
                                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000"
                                alt="Mark and Jenny"
                                className="w-full h-[400px] md:h-[700px] object-cover rounded-[30px] md:rounded-[60px]"
                            /> */}
                        </div>
                        
                    </div>
                    

                </div>
                
            </main>
            
        </div>
    );
};

export default Gemini;