import React from "react";

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: `When you contact us through our website, book a session, or interact with our services, we may collect personal information such as your name, email address, phone number, and any details you provide in your message or booking request.`,
        },
        {
            title: "2. How We Use Your Information",
            content: `We use the information you provide to respond to inquiries, process bookings, deliver photography/videography services, and communicate updates related to your session or event. We do not sell, rent, or trade your personal information to third parties.`,
        },
        {
            title: "3. Photos & Videos",
            content: `Media captured during a session may be stored securely in our cloud storage systems for editing and delivery purposes. Delivered media becomes the client's property for personal use, while Panjab Studio retains usage rights as outlined in our Terms & Conditions.`,
        },
        {
            title: "4. Cookies & Website Analytics",
            content: `Our website may use basic analytics tools to understand visitor behavior, such as page views and traffic sources. This data is anonymized and used solely to improve our website experience. We do not use this data for targeted advertising.`,
        },
        {
            title: "5. Data Storage & Security",
            content: `Your personal information and submitted messages are stored securely using industry-standard cloud infrastructure. We take reasonable measures to protect your data from unauthorized access, alteration, or disclosure.`,
        },
        {
            title: "6. Third-Party Services",
            content: `We may use trusted third-party services (such as cloud storage and hosting providers) to operate our website and deliver our services. These providers only have access to information necessary to perform their functions and are obligated to maintain its confidentiality.`,
        },
        {
            title: "7. Your Rights",
            content: `You have the right to request access to, correction of, or deletion of your personal information that we hold. To make such a request, please contact us using the details below.`,
        },
        {
            title: "8. Children's Privacy",
            content: `Our services are not directed toward children under the age of 13, and we do not knowingly collect personal information from children.`,
        },
        {
            title: "9. Changes to This Policy",
            content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. Continued use of our website and services after changes are made constitutes acceptance of the revised policy.`,
        },
        {
            title: "10. Contact Us",
            content: `If you have any questions or concerns about this Privacy Policy or how your information is handled, please reach out to us via the Contact page or email us directly at panjabstudio@gmail.com.`,
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
                        Privacy Policy
                    </h1>
                    <p className="mt-2 sm:mt-3 md:mt-4 text-gray-300 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
                        Your privacy matters to us. Here's how we collect, use, and protect your information.
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
                            By using our website and services, you agree to the practices described in this Privacy Policy.
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