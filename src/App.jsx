import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "100vh",
            x: Math.random() * 100 + "vw",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          className="absolute text-pink-300 text-4xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
    });
    // Fire more confetti
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen selection:bg-rose-600 selection:text-white text-zinc-900 overflow-hidden relative">
      <FloatingHearts />
      
      <div className="z-10 flex flex-col items-center max-w-md w-full p-4">
        {yesPressed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              alt="bears kissing"
              className="h-[200px] rounded-lg shadow-lg mb-6"
            />
            <div className="text-5xl font-bold text-center text-rose-600 title leading-tight">
              Yay!!! I love you ❤️ Ummmmaaaaaaaa..!! ❤️
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full"
          >
            <motion.img
              className="h-[200px] rounded-lg shadow-xl mb-8"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              alt="cute bear with roses"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="text-5xl mb-8 text-center text-rose-600 font-bold title leading-tight drop-shadow-sm">
              Will you be my Valentine, Ammucutieee..?
            </h1>
            <div className="flex flex-wrap justify-center gap-4 items-center w-full">
              <motion.button
                className={`bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 ease-in-out`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Yes
              </motion.button>
              <motion.button
                onClick={handleNoClick}
                className="bg-rose-100 hover:bg-rose-200 text-rose-500 font-bold py-3 px-6 rounded-full shadow-md transition-colors duration-200 ease-in-out"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                whileTap={{ scale: 0.9 }}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
