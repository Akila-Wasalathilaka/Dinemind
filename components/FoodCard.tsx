import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaInfoCircle } from 'react-icons/fa';

interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

interface FoodCardProps {
  dish: Dish;
}

export default function FoodCard({ dish }: FoodCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
    >
      <div className="relative aspect-[4/3]">
        <Image 
          src="/api/placeholder/400/300"
          alt={dish.name} 
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all hover:bg-white/40"
        >
          {isLiked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </button>
        
        <div className="absolute bottom-4 left-4">
          <span className="bg-red-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {dish.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
        <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {dish.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <button className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors">
          <FaInfoCircle />
          View Details
        </button>
      </div>
    </motion.div>
  );
}