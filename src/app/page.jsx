"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Instagram,
  Twitter,
  Play,
  Pause,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Macondo_Swash_Caps, Cherry_Bomb_One } from "next/font/google";

const artFont = Macondo_Swash_Caps({
  weight: "400",
  subsets: ["latin"],
});

const cherryFont = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
});

const artworks = [
  {
    title: "StarDust Ballet",
    description:
      "A Cosmic ballet, where stardust twirls and dreams take flight.",
    image:
      "https://res.cloudinary.com/dsxmpanyt/image/upload/v1732209315/backupPreview_qztimt.png",
    price: 399,
    id: "DA001",
  },
  {
    title: "Glowing Serenity",
    description: "Pixelated serenity in neon hues.",
    image:
      "https://res.cloudinary.com/dsxmpanyt/image/upload/v1732212284/1000039370_1_gr5bcr.jpg",
    price: 299,
    id: "IL002",
  },
  {
    title: "The Saiyan's Strength",
    description: "Fierce Saiyan warrior ready for battle.",
    image:
      "https://res.cloudinary.com/dsxmpanyt/image/upload/t_Grayscale/v1732212964/IMG_20241117_200032_d8j0fg.jpg",
    price: 149,
    id: "3D003",
  },
  {
    title: "Mesmerizing Beauties",
    description: "Handdrawn in eyes beauty.",
    image:
      "https://res.cloudinary.com/dsxmpanyt/image/upload/v1732212961/IMG_20191118_195412-02_yepqre.jpg",
    price: 199,
    id: "AN004",
  },
];

const ArtId = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <motion.button
        onClick={copyToClipboard}
        className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-mono">{id}</span>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </motion.button>
    </div>
  );
};

const PriceTag = ({ price }) => (
  <div className="absolute top-4 right-4 z-10">
    <div className="relative">
      <div className="bg-rose-600 text-white px-3 py-1 rounded-full shadow-lg transform -rotate-12">
        <span className="font-bold">${price}</span>
      </div>
      <div className="absolute top-0 left-1/2 w-px h-6 bg-rose-600 transform -translate-x-1/2 -translate-y-full"></div>
    </div>
  </div>
);

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
      <h1
        className={`${artFont.className} text-xl tracking-tight font-serif font-extralight`}
      >
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

  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const storyAudioRef = useRef(null);

  const toggleStoryAudio = () => {
    if (storyAudioRef.current) {
      if (isStoryPlaying) {
        storyAudioRef.current.pause();
      } else {
        storyAudioRef.current.play();
      }
      setIsStoryPlaying(!isStoryPlaying);
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
      <div className="min-h-screen flex flex-col">
        {/* Hero Section with Image Slider and Bottom Navigation */}
        <section className="h-screen relative flex-1 flex flex-col">
          {/* Image Slider */}
          <div className="relative flex-1 overflow-hidden">
            <div className="fixed inset-0 flex">
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
                        className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-transform duration-500"
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
                            <h1
                              className={`text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 ${cherryFont.className}`}
                            >
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
          </div>

          {/* Bottom Navigation */}
          {/* <div className="bg-black/60 border-t border-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
              <div className="py-4 md:py-6 flex items-center justify-between overflow-x-auto">
                <div className="flex-1 grid grid-cols-4 gap-4 md:gap-8 min-w-max">
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
          </div> */}

          <div className="absolute bottom-0 left-0 right-0 bg-black/60 border-t border-white/10 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="py-4 flex items-center justify-between overflow-x-auto">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 min-w-max">
                  {artworks.map((artwork, index) => (
                    <motion.button
                      key={index}
                      onClick={() => !isTransitioning && setCurrentIndex(index)}
                      className={`text-left group ${
                        index === currentIndex ? "text-white" : "text-white/40"
                      }`}
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-xs sm:text-sm font-medium mb-1">{`0${
                        index + 1
                      }`}</p>
                      <h3 className="text-sm sm:text-base font-semibold truncate">
                        {artwork.title}
                      </h3>
                      <p className="text-xs opacity-60 truncate hidden sm:block">
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
        </section>
      </div>

      {/* Gallery Section */}
      <section className="relative z-10 bg-black/40 backdrop-blur-lg py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className=" max-w-3xl mx-auto text-center"
          >
            <span className="text-rose-400 text-sm tracking-widest">
              Art Gallery
            </span>
            <h2
              className={`text-4xl font-light text-white mt-2 mb-6 ${artFont.className}`}
            >
              Featured Art Pieces
            </h2>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    className="transition-transform duration-300 group-hover:scale-110 object-fill"
                  />
                  <PriceTag price={artwork.price} />
                  <ArtId id={artwork.id} />

                  <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3
                      className={`text-xl font-bold mb-1 text-white ${artFont.className}`}
                    >
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-white/80">
                      {artwork.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Artist Section */}
      <section className="relative z-10 bg-zinc-800/30 py-20 backdrop-brightness-[0.3]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <span className="text-rose-400 text-sm tracking-widest">ABOUT</span>
            <h2
              className={`text-4xl font-light text-white mt-2 mb-6 ${artFont.className}`}
            >
              The Artist
            </h2>
            <p className="text-sm md:text-lg text-white/80 mb-8 font-serif">
              <strong className="font-semibold">
                Light Weaver: Digital Alchemy of Imagination :{" "}
              </strong>
              <br />I am an illumination artist who transforms the ephemeral—raw
              sketches, fleeting doodles—into luminous narratives of
              possibility. My digital canvas is a realm where shadows dance with
              light, where dormant lines awaken and breathe with ethereal
              energy. Each piece is a journey of revelation: I don't merely
              create art, I excavate hidden stories buried within seemingly
              mundane strokes. My work transcends traditional boundaries,
              bridging the delicate space between the physical and digital
              worlds. Through intricate light manipulation and digital
              craftsmanship, I breathe life into silent drawings, revealing
              their unspoken potential. My artistic philosophy is rooted in
              metamorphosis—seeing beyond the initial sketch to the vibrant
              universe waiting to emerge. I view every doodle as a seed of
              infinite possibility, waiting to be nurtured by creative vision
              and technological innovation. More than an artist, I am a visual
              alchemist—transforming the ordinary into the extraordinary, one
              illuminated line at a time.
            </p>
            <span className="block font-serif font-italic mb-6">
              - Prateek Jain
            </span>
            <motion.button
              onClick={toggleStoryAudio}
              className="inline-flex align-middle items-center px-6 py-3 text-sm bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isStoryPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Story
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Hear My Story
                </>
              )}
            </motion.button>
            <audio ref={storyAudioRef} src="/artist_story.mp3" />
            <Link
              href="mailto:prateek56489@gmail.com"
              className="ml-4 inline-flex items-center px-6 py-3 text-sm bg-white text-black rounded-full hover:bg-rose-100 transition-colors duration-300"
            >
              Let's Connect
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
        <div className="container mx-auto px-4 relative max-w-3xl">
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
            <h2
              className={`text-4xl font-light text-white mt-2 mb-6 ${artFont.className}`}
            >
              Let's Create Together
            </h2>
            <p className="text-sm md:text-lg text-white/80 mb-8 font-serif">
              If a particular artwork has captured your imagination, we invite
              you to connect with our curatorial team. Simply Copy & Share the
              artwork's unique ID and your vision by clicking "Acquire Artwork",
              and we'll guide you through a personalized acquisition experience.
              From detailed shipping logistics to seamless payment processing,
              we're committed to illuminating your artistic dreams. Let us
              collaborate to bring your aesthetic aspirations to life,
              transforming not just an artwork, but the very atmosphere of your
              space.
            </p>
            <Link
              href="mailto:prateek56489@gmail.com"
              className="inline-flex items-center px-6 py-3 text-sm text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
            >
              Acquire Artwork
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
              <h3
                className={`text-2xl font-light tracking-wider mb-2 ${artFont.className}`}
              >
                NIMBLE
              </h3>
              <p className="text-white/60 font-light font-sans">
                Redefining digital art since 2018
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
