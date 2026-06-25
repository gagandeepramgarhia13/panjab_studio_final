import React from "react";

export default function TermsAndConditions() {
    const sections = [
        {
            title: "1. Booking & Payment",
            content: `A non-refundable deposit is required to secure your booking date. The remaining balance must be paid in full no later than 7 days before the scheduled session/event. Bookings are only confirmed once the deposit is received.`,
        },
        {
            title: "2. Cancellations & Rescheduling",
            content: `Cancellations made less than 30 days before the event date will forfeit the deposit. Rescheduling requests must be made at least 14 days in advance and are subject to availability. Panjab Studio reserves the right to charge a rescheduling fee.`,
        },
        {
            title: "3. Copyright & Usage Rights",
            content: `All photographs and videos captured by Panjab Studio remain the intellectual property of Panjab Studio. Clients are granted a personal-use license to print, share, and display their delivered media. Commercial use, resale, or redistribution requires prior written consent.`,
        },
        {
            title: "4. Delivery Timeline",
            content: `Edited photos and videos are typically delivered within 2–6 weeks from the event date, depending on the package selected. Rush delivery may be available at an additional cost, subject to availability.`,
        },
        {
            title: "5. Portfolio & Marketing Use",
            content: `Panjab Studio reserves the right to use captured images and videos for portfolio, marketing, social media, and promotional purposes, unless the client explicitly requests otherwise in writing prior to the event.`,
        },
        {
            title: "6. Liability",
            content: `While every effort is made to capture and deliver high-quality media, Panjab Studio is not liable for unforeseen circumstances such as equipment failure, venue restrictions, weather conditions, or other events beyond our reasonable control that may affect the final output.`,
        },
        {
            title: "7. Client Responsibilities",
            content: `Clients are responsible for providing accurate event details, timelines, and venue access information in advance. Any delays caused by incorrect or incomplete information provided by the client are not the responsibility of Panjab Studio.`,
        },
        {
            title: "8. Third-Party Vendors",
            content: `Panjab Studio is not responsible for the actions, delays, or conduct of third-party vendors (such as venues, caterers, or other service providers) involved in the client's event.`,
        },
        {
            title: "9. Changes to Terms",
            content: `Panjab Studio reserves the right to update or modify these Terms & Conditions at any time. Continued use of our services after changes are made constitutes acceptance of the revised terms.`,
        },
        {
            title: "10. Contact",
            content: `For any questions regarding these Terms & Conditions, please reach out to us via the Contact page or email us directly at panjabstudio@gmail.com.`,
        },
    ];

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">

            {/* Animated gradient background */}
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    backgroundImage:
                        "linear-gradient(120deg, #E5E5E5, #3a2e1f, #E5E5E5, #B27B52, #2a1f15)",
                    backgroundSize: "400% 400%",
                    animation: "gradientMove 18s ease infinite",
                }}
            >
            </div>

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 w-full px-3 sm:px-6 md:px-10 pt-[90px] sm:pt-[120px] md:pt-[140px] pb-16 sm:pb-20 flex flex-col items-center text-white">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold">
                        Terms & Conditions
                    </h1>
                    <p className="mt-2 sm:mt-3 md:mt-4 text-gray-300 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
                        Please read these terms carefully before booking a session with Panjab Studio.
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                        Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>

                {/* Glass Card */}
                <div className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-2 sm:space-y-3">
                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                                {section.title}
                            </h2>
                            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}

                    {/* Closing note */}
                    <div className="pt-6 sm:pt-8 border-t border-white/20 text-center">
                        <p className="text-gray-400 text-xs sm:text-sm">
                            By booking with Panjab Studio, you agree to the terms outlined above.
                        </p>
                    </div>
                </div>

            </div>

            {/* Keyframes for the gradient animation */}
            <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </section>
    );
}