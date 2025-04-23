'use client'

import { useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import { FaArrowRight, FaUtensils, FaLeaf, FaHeart } from 'react-icons/fa';

const featuredDishes = [
  {
    id: 1, 
    name: 'Mediterranean Bowl',
    description: 'Fresh veggies, hummus, falafel, and tahini dressing',
    image: '/food1.jpg',
    category: 'Healthy',
    tags: ['Vegetarian', 'High Protein']
  },
  {
    id: 2, 
    name: 'Spicy Ramen',
    description: 'Rich broth with noodles, egg, and seasonal vegetables',
    image: '/food2.jpg',
    category: 'Comfort Food',
    tags: ['Spicy', 'Japanese']
  },
  {
    id: 3, 
    name: 'Berry Smoothie Bowl',
    description: 'Acai, mixed berries, banana, and granola topping',
    image: '/food3.jpg',
    category: 'Breakfast',
    tags: ['Vegan', 'Antioxidants']
  }
];

const features = [
  {
    icon: () => <FaUtensils className="text-red-500 h-10 w-10" />,
    title: 'Personalized Recommendations',
    description: 'Our AI analyzes your preferences to suggest dishes you\'ll love'
  },
  {
    icon: () => <FaLeaf className="text-green-500 h-10 w-10" />,
    title: 'Dietary Conscious',
    description: 'Filter by allergies, dietary restrictions or nutrition goals'
  },
  {
    icon: () => <FaHeart className="text-pink-500 h-10 w-10" />,
    title: 'Culinary Discovery',
    description: 'Expand your palate with cuisine recommendations from around the world'
  }
];

export default function HomePage() {
  // Removed unused 'scrolled' state
  const [activeTab, setActiveTab] = useState('trending');

  // Removed unused scroll detection logic

  return (
    <main className="flex-1 w-full ml-[200px] max-w-[calc(100%-200px)]">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/api/placeholder/1440/800"
              alt="Culinary experience"
              fill
              className="object-cover brightness-75"
              priority
            />
          </motion.div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Your Next Culinary <span className="text-red-500">Obsession</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Personalized recommendations that understand your unique taste profile, dietary preferences, and flavor adventures you&#39;ve yet to explore.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/recommendations">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-lg"
                >
                  Get Started <FaArrowRight />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
  className="absolute bottom-8 left-0 right-0"
>
  <div className="w-full max-w-2xl mx-auto px-6">
    <SearchBar />
  </div>
</motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-12 md:px-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How DineMind Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our AI adapts and evolves with every interaction, continuously improving your food recommendations</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                {feature.icon()}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Featured Recommendations */}
      <section className="py-20 px-12 md:px-24 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-3">Curated For You</h2>
            <p className="text-gray-600">Discover trending dishes and personalized recommendations</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex bg-gray-100 rounded-lg p-1">
            {['trending', 'new', 'recommended'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  activeTab === tab 
                    ? 'bg-white shadow-sm font-medium' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FoodCard dish={dish} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/recommendations">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-all duration-300"
            >
              View All Recommendations <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </section>
      
      {/* Testimonials / AI Technology Section */}
      <section className="py-20 px-12 md:px-24 bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8">Powered by Advanced AI</h2>
          <p className="text-xl mb-12">
            Our recommendation engine uses machine learning to analyze thousands of flavor profiles, ingredients, and user preferences to create a truly personalized culinary experience.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl"
          >
            <div className="text-2xl italic mb-6">
              &quot;DineMind recommended a dish I would have never tried on my own, and it&apos;s now my absolute favorite. It&apos;s like having a personal chef who knows your taste better than you do.&quot;
            </div>
            <div className="font-medium">
              — Sarah Johnson, Food Enthusiast
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-12 md:px-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Dining Experience?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Create your profile now and get personalized recommendations based on your unique taste profile.
        </p>
        
        <Link href="/signup">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-xl"
          >
            Start Your Flavor Journey
          </motion.button>
        </Link>
      </section>
    </main>
  );
}