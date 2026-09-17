import React from "react";
import Button from "./Button";
import SectionGlow from "./SectionGlow";
import { useDepthReveal, useParallax } from "../hooks/useScrollAnimation";

// One "story block" of the About page (About / Mission / Connect): the text
// column comes forward from depth while the image column drifts at its own,
// slightly faster parallax speed and settles in with a gentle rotation —
// the "cinematic storytelling" 3D treatment rather than a static card.
function StoryBlock({ heading, paragraphs, button, image, alt, imageFirst = false }) {
  const [textRef, textStyle] = useDepthReveal({ depth: 0.5 });
  const [imgRef, imgY] = useParallax(0.14, { max: 34 });
  const [imgRevealRef, imgRevealStyle] = useDepthReveal({ depth: 0.45, delay: 80 });

  const textCol = (
    <div ref={textRef} className="depth-el space-y-6" style={textStyle}>
      <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold">
        {heading}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-gray-200 leading-relaxed">
          {p}
        </p>
      ))}
      {button}
    </div>
  );

  const imageCol = (
    <div
      ref={(el) => {
        imgRef.current = el;
        imgRevealRef.current = el;
      }}
      className="depth-el parallax-el relative group overflow-hidden rounded-3xl"
      style={{
        ...imgRevealStyle,
        transform: `${imgRevealStyle.transform || ""} translate3d(0, ${imgY}px, 0)`,
      }}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );

  return (
    <div
      className="scroll-3d-scene relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center mt-16
        bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:border-[#C8A45D]/30"
    >
      {imageFirst ? (
        <>
          {imageCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section className="relative w-full min-h-screen bg-[url('https://i.pinimg.com/1200x/96/7d/db/967ddb68db475eec28ccb46fb152c3f6.jpg')] bg-cover bg-center bg-fixed">

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔹 Content Wrapper */}
      <div className="relative w-full flex flex-col items-center px-4 md:px-10 py-20 text-white overflow-hidden">
        <SectionGlow variant="dark" />

        <StoryBlock
          heading="About Panjab Studio"
          paragraphs={[
            <>
              At <span className="font-semibold text-white">Panjab Studio</span>,
              we don't just capture moments—we tell stories.
            </>,
            "From vibrant weddings to destination shoots, we blend cinematic visuals with real emotions.",
            "Our goal is to create timeless memories you'll cherish forever.",
          ]}
          button={
            <Button to="/contact" variant="white" size="responsive">
              Contact Us →
            </Button>
          }
          image="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
          alt="about"
        />

        <StoryBlock
          heading="Our Mission"
          paragraphs={[
            "Our mission is to turn your moments into timeless stories.",
            "We create visuals that are both emotional and cinematic.",
            "Every frame is crafted to feel alive—even years later.",
          ]}
          button={
            <Button to="/our-mission" variant="white" size="responsive">
              Learn More →
            </Button>
          }
          image="https://i.pinimg.com/vwebp/1200x/14/d6/39/14d639f490597e4f176d6762f3ab9864.webp"
          alt="mission"
          imageFirst
        />

        <StoryBlock
          heading="Let's Connect"
          paragraphs={[
            "Every story is unique—and we're here to capture yours.",
            "Whether it's a wedding or creative shoot, we bring your vision to life.",
            "Reach out—we'd love to connect.",
          ]}
          button={
            <Button to="/contact" variant="white" size="responsive">
              Contact Us →
            </Button>
          }
          image="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
          alt="connect"
        />

      </div>
    </section>
  );
}
