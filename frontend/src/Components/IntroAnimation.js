import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

// Generate orbit animation keyframes using sine/cosine
const generateOrbit = (radius, offset) => {
  const frames = 60;
  return Array.from({ length: frames }, (_, i) => {
    const angle = ((2 * Math.PI) / frames) * i + offset;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  });
};

export default function AnimatedIntro() {
  const [flags, setFlags] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const selectedFlags = data
          .filter((country) => country.flags?.svg)
          .slice(0, 15) // Fetch more flags (16 instead of 8)
          .map((country) => country.flags.svg);
        setFlags(selectedFlags);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchFlags();
  }, []);

  const handleClick = () => {
    setShowButton(false);
    navigate('/'); // Navigate to the home page when the button is clicked
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-screen px-6 text-white bg-gradient-to-r from-primary to-secondary"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Orbiting Flags */}
      {flags.map((flag, index) => {
        const offset = (index / flags.length) * 2 * Math.PI;
        const path = generateOrbit(330, offset);  // Increased radius to make more space for larger flags
        const xPath = path.map((p) => p.x);
        const yPath = path.map((p) => p.y);

        return (
          <motion.img
            key={index}
            src={flag}
            alt={`flag-${index}`}
            className="w-20 h-20 absolute z-0"  // Increased flag size
            animate={{
              x: xPath,
              y: yPath,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ top: '50%', left: '50%', marginTop: '-40px', marginLeft: '-40px' }} // Adjust for larger size
          />
        );
      })}

      {/* Centered Content */}
      <div className="relative z-10 text-center">
      <motion.h1 className="text-6xl font-bold mb-4 text-[#f4a261] font-serif tracking-widest"  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} variants={itemVariants}>
  GEONOVA
</motion.h1>


<motion.h3 className="text-4xl font-semibold mb-4" variants={itemVariants}>
Your Interactive World Atlas
<br></br> Starts Here
</motion.h3>

<motion.p className="text-lg text-gray-300 mb-2" variants={itemVariants}>
  Instantly explore countries around the world.
</motion.p>

<motion.p className="text-lg text-gray-300 mb-6" variants={itemVariants}>
  Search by name, language, or continent—all in one place.
</motion.p>


        {showButton && (
          <motion.button
            variants={itemVariants}
            className="bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition cursor-pointer"
            onClick={handleClick}
          >
            Start Exploring
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
