const HomePage = () => {
    return (
        <section className="flex flex-col items-center">
            <div className="max-w-[1080px]  flex gap-[20px] flex-col items-center py-10">
                <h1 className="text-[50px] font-bold">
                    Crafting Timeless Visual Stories
                </h1>
                <p className="text-center">
                    Welcome to Panjab Studio—your premier photography & cinematography team based in Birmingham. We specialize in bringing to life the vibrant emotions and authentic moments of weddings across the UK and around the world.
                </p>
                <p className="text-center">
                    From intimate ceremonies to grand celebrations, Panjab Studio blends cultural understanding with creative excellence. With roots firmly planted in Birmingham we offer full-service photographic and cinematic experiences, with décor and design solutions to match.
                </p>
                <a href="">
                    <button>
                        <u>
                            Read More About Us →
                        </u>
                    </button>
                </a>
            </div>
        </section>
    );
};

export default HomePage;