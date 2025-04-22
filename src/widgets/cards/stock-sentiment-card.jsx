import { motion } from "framer-motion";

export function StockSentimentCard ({sentiment}) {
  return (
    <section className="bg-neutral-900 px-4 py-12">
      <div className="mx-auto w-fit">
        <Card sentiment={sentiment}/>
      </div>
    </section>
  );
};

const Card = ({sentiment}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-indigo-400 p-8"
    >
      <div className="relative z-10 text-black">
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]">
            {sentiment}
        </motion.span>
      </div>
      <Background sentiment={sentiment} />
    </motion.div>
  );
};

const Background = ({ sentiment }) => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      {sentiment === 'Bearish' ? (
        <img src="../../../public/img/bear.png" alt="Bear"style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        <img src="../../../public/img/bull.png" alt="Bull" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
      )}
    </motion.div>
  );
};

export default StockSentimentCard;