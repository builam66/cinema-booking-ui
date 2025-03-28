import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const SeatLegend = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="flex flex-wrap gap-4 justify-center mt-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="flex items-center" variants={item}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-green-500/50 mr-2"></div>
        <span className="text-sm">Standard</span>
      </motion.div>
      <motion.div className="flex items-center" variants={item}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-orange-500/50 mr-2"></div>
        <span className="text-sm">Premium</span>
      </motion.div>
      <motion.div className="flex items-center" variants={item}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-purple-500/50 mr-2"></div>
        <span className="text-sm">VIP</span>
      </motion.div>
      <motion.div className="flex items-center" variants={item}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-primary text-white mr-2">
          <Check size={14} />
        </div>
        <span className="text-sm">Selected</span>
      </motion.div>
      <motion.div className="flex items-center" variants={item}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-muted mr-2">
          <X size={14} />
        </div>
        <span className="text-sm">Unavailable</span>
      </motion.div>
    </motion.div>
  );
};

export default SeatLegend;
