import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "How do I book a session with Panjab Studio?",
            answer:
                "You can book a session by reaching out through our Contact page, WhatsApp, or by calling us directly. We'll discuss your event details, available dates, and packages before confirming your booking with a deposit.",
        },
        {
            question: "What areas do you cover?",
            answer:
                "We are based in Bangalore, India, but we are available worldwide for destination weddings and shoots. Travel charges may apply depending on the location.",
        },
        {
            question: "How far in advance should I book?",
            answer:
                "We recommend booking at least 2–3 months in advance, especially during wedding season, as our calendar fills up quickly. For destination shoots, earlier booking is preferred.",
        },
        {
            question: "Do you offer both photography and videography?",
            answer:
                "Yes, we offer both photography and cinematography services, either individually or as a combined package, depending on your event needs.",
        },
        {
            question: "How long does it take to receive our photos and videos?",
            answer:
                "Edited photos and videos are typically delivered within 2–6 weeks from the event date, depending on the package selected. Rush delivery may be available at an additional cost.",
        },
        {
            question: "Can we customize our package?",
            answer:
                "Absolutely. We understand every event is unique, so we offer flexible packages that can be tailored to your specific requirements and budget.",
        },
        {
            question: "What happens if we need to reschedule or cancel?",
            answer:
                "Rescheduling requests must be made at least 14 days in advance and are subject to availability. Cancellations made less than 30 days before the event will forfeit the deposit. Please refer to our Terms & Conditions for full details.",
        },
        {
            question: "Do you provide raw, unedited footage?",
            answer:
                "We do not provide raw or unedited footage as part of our standard packages. All delivered media is professionally edited and color-graded to maintain our studio's quality standard.",
        },
        {
            question: "Can we use the photos/videos on social media?",
            answer:
                "Yes, once delivered, you're welcome to share your photos and videos on social media and for personal use. We'd love it if you tagged us — @panjabstudiosuk!",
        },
        {
            question: "How do we make payment?",
            answer:
                "We accept bank transfers and other digital payment methods. A non-refundable deposit secures your date, with the remaining balance due before the event or as agreed in your contract.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-2 sm:mt-3 md:mt-4 text-gray-300 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
                        Got questions? We've got answers. Here's everything you need to know before booking with us.
                    </p>
                </div>

                {/* Glass Card */}
                <div className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-6 md:p-10">
                    <div className="divide-y divide-white/15">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="py-4 sm:py-5">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between gap-4 text-left"
                                    >
                                        <span className="text-sm sm:text-base md:text-lg font-medium text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={20}
                                            className={`flex-shrink-0 text-gray-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed pr-6">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Closing note */}
                <p className="text-gray-400 text-xs sm:text-sm mt-8 text-center">
                    Still have questions? Feel free to{" "}
                    <a href="/contact" className="underline hover:text-white transition">
                        reach out to us
                    </a>
                    .
                </p>

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