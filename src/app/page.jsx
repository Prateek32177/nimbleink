"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Twitter, Play, Pause } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const artworks = [
  {
    title: "Digital Art",
    description: "Creating unique digital experiences",
    image: "https://pbs.twimg.com/media/GcfGtWQbIAAkNni?format=jpg&name=small",
    price: 2499,
  },
  {
    title: "Illustrations",
    description: "Hand-crafted digital illustrations",
    image:
      "https://i.pinimg.com/736x/1d/32/89/1d3289838d81c8e5021418cf91b5ffd0.jpg",
    price: 1999,
  },
  {
    title: "3D Models",
    description: "Immersive 3D artwork",
    image:
      "https://i.pinimg.com/736x/fb/1d/23/fb1d232becd917b6aa4a7ff81d87ce46.jpg",
    price: 2799,
  },
  {
    title: "Animations",
    description: "Dynamic motion graphics",
    image:
      "https://i.pinimg.com/736x/3a/7e/32/3a7e32800780ccda1529a64a257f6787.jpg",
    price: 3299,
  },
];

const AnimatedNotes = ({ isPlaying }) => {
  return (
    <motion.div
      initial="hidden"
      animate={isPlaying ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      className="absolute bottom-full right-0 mb-2"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 right-0"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: -50 - i * 20,
            opacity: 0,
            transition: { duration: 2, delay: i * 0.5, repeat: Infinity },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-rose-300"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="fixed top-6 left-6 z-50"
  >
    <motion.div
      className="relative bg-black/30 backdrop-blur-sm rounded-full p-3 shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h1 className="text-xl tracking-tight font-serif font-extralight">
        Nimble
      </h1>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
);
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const calculateSlideStyles = (index) => {
    const position = (index - currentIndex + artworks.length) % artworks.length;
    const totalSlides = artworks.length;
    const activeWidth = 70; // Active slide width in percentage
    const inactiveWidth = (100 - activeWidth) / 3; // Show 3 slits on large screens

    const isActive = position === 0;
    let order = position;
    if (position > totalSlides / 2) {
      order = position - totalSlides;
    }

    const leftPosition = isActive
      ? "0%"
      : `${activeWidth + (position - 1) * inactiveWidth}%`;

    return {
      width: isActive ? `${activeWidth}%` : `${inactiveWidth}%`,
      left: leftPosition,
      order: order,
      zIndex: isActive ? totalSlides : totalSlides - Math.abs(order),
    };
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden w-full">
      <audio ref={audioRef} loop>
        <source src="/calm.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <Logo />
      <div className="min-h-screen md:min-h-screen h-[100svh] md:h-screen flex flex-col">
        {/* Main Slider Section */}
        <div className="relative flex-1 overflow-hidden">
          <div className="fixed md:absolute inset-0 flex">
            {artworks.map((artwork, index) => {
              const styles = calculateSlideStyles(index);
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={index}
                  className="absolute top-0 bottom-0"
                  initial={false}
                  animate={{
                    width: styles.width,
                    left: styles.left,
                    zIndex: styles.zIndex,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                >
                  <div className="relative h-full overflow-hidden">
                    {/* Image with unified filter */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${artwork.image})`,
                      }}
                    >
                      <div
                        className={`absolute inset-0 ${
                          isActive ? "bg-black/30" : "bg-black/70"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-4 md:p-8 mt-16 md:mt-12">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: 0.3 }}
                          className="max-w-xl"
                        >
                          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4">
                            {artwork.title.split("").map((letter, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="inline-block"
                              >
                                {letter}
                              </motion.span>
                            ))}
                          </h1>
                        </motion.div>
                      )}

                      {/* Info Panel for inactive slides */}
                      {!isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className={`backdrop-brightness-50 bg-white/10 rounded-lg p-4 ${
                            isActive
                              ? "w-full"
                              : "w-[300px] rotate-90 origin-left"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-light opacity-60">
                              0{index + 1}
                            </span>
                            <div
                              className={isActive ? "" : "whitespace-nowrap"}
                            >
                              <h3 className="text-lg font-medium mb-1">
                                {artwork.title}
                              </h3>
                              <p className="text-sm text-white/70 hidden md:block">
                                {artwork.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-black/60 border-t border-white/10 bottom-0 absolute   z-20 backdrop-blur-sm w-full ">
            <div className="max-w-7xl mx-auto px-4">
              <div className="py-4 md:py-6 flex items-center justify-between">
                <div className="flex-1 grid grid-cols-4 gap-4 md:gap-8">
                  {artworks.map((artwork, index) => (
                    <motion.button
                      key={index}
                      onClick={() => !isTransitioning && setCurrentIndex(index)}
                      className={`text-left group ${
                        index === currentIndex ? "text-white" : "text-white/40"
                      }`}
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-xs md:text-sm font-medium mb-1 md:mb-2">{`0${
                        index + 1
                      }`}</p>
                      <h3 className="text-sm md:text-lg font-semibold truncate">
                        {artwork.title}
                      </h3>
                      <p className="text-xs md:text-sm opacity-60 truncate hidden md:block">
                        {artwork.description}
                      </p>
                      {index === currentIndex && (
                        <motion.div
                          className="h-px bg-white mt-2"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="relative z-10 bg-black/40 backdrop-blur-lg py-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <span className="text-violet-400 text-sm tracking-widest">
              GALLERY
            </span>
            <h2 className="text-6xl font-light text-white mt-2">
              Featured Art Pieces
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artworks.map((artwork, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`group relative ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-2xl font-bold mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-sm mb-4">{artwork.description}</p>
                      <span className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                        ${artwork.price}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Artist Section */}
      <section className="relative z-10 bg-zinc-800/30 py-20 backdrop-brightness-[0.3] ">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-rose-400 text-sm tracking-widest">ABOUT</span>
            <h2 className="text-4xl font-light text-white mt-2 mb-6">
              The Artist
            </h2>
            <p className="text-lg text-white/80 mb-8">
              As a visionary digital artist, I blend cutting-edge technology
              with timeless artistic principles. My work explores the
              intersection of reality and the digital realm, inviting viewers to
              question the boundaries of what's possible in art.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-sm bg-white text-black rounded-full hover:bg-rose-100 transition-colors duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 relative overflow-hidden backdrop-brightness-50"
      >
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 0% 100%, rgba(244, 63, 94, 0.1) 0%, rgba(0, 0, 0, 1) 70%)",
              "radial-gradient(circle at 100% 0%, rgba(244, 63, 94, 0.1) 0%, rgba(0, 0, 0, 1) 70%)",
              "radial-gradient(circle at 0% 100%, rgba(244, 63, 94, 0.1) 0%, rgba(0, 0, 0, 1) 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        <div className="container mx-auto px-4 relative max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-rose-400 text-sm tracking-widest">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl font-light text-white mt-2 mb-6">
              Let's Create Together
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Interested in purchasing a piece or commissioning custom artwork?
              Drop your art ID, and we'll discuss the details to bring your
              vision to life.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-sm text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 z-40 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-light tracking-wider mb-2">
                NIMBLE
              </h3>
              <p className="text-white/60 font-light">
                Redefining digital art since 2024
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Audio Control Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={toggleAudio}
          className="relative bg-white bg-opacity-10 hover:bg-opacity-20 text-rose-300 rounded-full p-4 shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </motion.button>
        <AnimatedNotes isPlaying={isPlaying} />
      </div>
    </div>
  );
}
