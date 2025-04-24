'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaHeart, FaGlobeAmericas } from 'react-icons/fa';

export default function AboutPage() {
  const values = [
    {
      icon: () => <FaLeaf className="text-green-500 h-8 w-8" />,
      title: "Dietary Conscious",
      description: "We cater to all dietary preferences and restrictions, ensuring everyone finds their perfect meal."
    },
    {
      icon: () => <FaHeart className="text-red-500 h-8 w-8" />,
      title: "Passion for Food",
      description: "Our team of culinary experts and AI specialists are united by a love for exceptional dining experiences."
    },
    {
      icon: () => <FaGlobeAmericas className="text-blue-500 h-8 w-8" />,
      title: "Global Inspiration",
      description: "We curate dishes from around the world to expand your palate and culinary horizons."
    }
  ];

  return (
    <main className="flex-1 w-full ml-[200px] max-w-[calc(100%-200px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white relative py-20 px-12 md:px-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">About DineMind</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Discover your next culinary obsession with our AI-powered recommendation platform that understands your unique taste profile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-12 md:px-24 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              DineMind is an AI-powered food recommendation system designed to help you discover the perfect meal based on your preferences. Whether you&apos;re looking for a quick bite or a meal for a special occasion, our system analyzes your tastes, dietary needs, and more to suggest the best dishes from our curated menu.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to make dining decisions effortless and enjoyable, bringing you personalized recommendations that cater to your unique palate. Explore our recommendations, learn more about our offerings, and let DineMind guide you to your next delicious meal!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="/api/placeholder/600/400"
              alt="DineMind team"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-12 md:px-24 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At DineMind, we&apos;re guided by these core principles that shape everything we do.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-gray-50 p-4 rounded-full inline-block mb-4">
                {value.icon()}
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-12 md:px-24 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Next Favorite Dish?</h2>
            <p className="text-xl mb-8">
              Get personalized recommendations based on your unique taste profile and dietary preferences.
            </p>
            <Link href="/recommendations">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-10 py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}