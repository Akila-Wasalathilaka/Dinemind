'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for dropdown animation
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import { FaHeart, FaTrash, FaSort } from 'react-icons/fa';

export default function FavoritesPage() {
  interface Favorite {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
    savedAt: Date;
  }

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Favorite[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [emptySaved, setEmptySaved] = useState(true);

  // Categories for filtering
  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'healthy', 'comfort food'];

  // Mock data - in a real app, this would come from an API or local storage
  useEffect(() => {
    const savedFavorites = [
      {
        id: 1,
        name: 'Mediterranean Bowl',
        description: 'Fresh veggies, hummus, falafel, and tahini dressing',
        image: '/food1.jpg',
        category: 'Healthy',
        tags: ['Vegetarian', 'High Protein'],
        savedAt: new Date('2025-04-20T12:00:00'),
      },
      {
        id: 4,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        image: '/dessert.jpg',
        category: 'Dessert',
        tags: ['Sweet', 'Indulgent'],
        savedAt: new Date('2025-04-22T16:30:00'),
      },
      {
        id: 2,
        name: 'Spicy Ramen',
        description: 'Rich broth with noodles, egg, and seasonal vegetables',
        image: '/food2.jpg',
        category: 'Comfort Food',
        tags: ['Spicy', 'Japanese'],
        savedAt: new Date('2025-04-18T19:45:00'),
      },
    ];

    setFavorites(savedFavorites);
    setFilteredFavorites(savedFavorites);
    setEmptySaved(savedFavorites.length === 0);
  }, []);

  // Filter favorites based on category
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredFavorites(favorites);
    } else {
      const filtered = favorites.filter(
        (dish) =>
          dish.category.toLowerCase() === activeFilter ||
          dish.tags.some((tag) => tag.toLowerCase() === activeFilter)
      );
      setFilteredFavorites(filtered);
    }
  }, [activeFilter, favorites]);

  // Sort favorites based on selected option
  useEffect(() => {
    const sorted = [...filteredFavorites];

    switch (sortOption) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime());
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredFavorites(sorted);
  }, [sortOption, activeFilter]);

  // Remove from favorites function
  interface RemoveFavoriteFunction {
    (id: number): void;
  }

  const removeFavorite: RemoveFavoriteFunction = (id) => {
    const updatedFavorites = favorites.filter((dish: Favorite) => dish.id !== id);
    setFavorites(updatedFavorites);
    setEmptySaved(updatedFavorites.length === 0);
  };

  return (
    <main className="md:ml-[200px] bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-20 px-12 md:px-24 text-white relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Saved Favorites
              </h1>
              <p className="text-xl text-gray-100">
                All your culinary discoveries in one place
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Sort Controls */}
      <section className="bg-white py-8 px-12 md:px-24 sticky top-0 z-20 border-b shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Categories */}
          <div className="flex overflow-x-auto py-2 mb-4 sm:mb-0 w-full sm:w-auto">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap px-4 py-2 rounded-full mr-2 capitalize transition ${
                  activeFilter === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center relative">
            <motion.button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
            >
              <FaSort /> Sort By: <span className="font-medium capitalize">{sortOption}</span>
            </motion.button>

            <AnimatePresence>
              {isFilterMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-30 w-48"
                >
                  {['recent', 'oldest', 'name'].map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                        setIsFilterMenuOpen(false);
                      }}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 capitalize ${
                        sortOption === option ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="py-20 px-12 md:px-24 bg-gray-50">
        {emptySaved ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-24"
          >
            <div className="bg-white p-6 rounded-full inline-block mb-8 shadow-sm">
              <FaHeart className="text-gray-300 h-16 w-16" />
            </div>
            <h2 className="text-3xl font-bold mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Start exploring and save dishes you love to build your personal collection.
            </p>
            <Link href="/recommendations">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-md"
              >
                Explore Recommendations
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFavorites.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(dish.id)}
                      className="bg-white p-2 rounded-full text-red-600 shadow-md hover:bg-red-50 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <FaTrash size={16} />
                    </motion.button>
                  </div>
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <FoodCard dish={dish} />
                  </motion.div>
                  <div className="mt-3 text-sm text-gray-500">
                    Saved on {dish.savedAt.toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Collections Section */}
      {!emptySaved && (
        <section className="py-20 px-12 md:px-24 bg-white">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Create Collections</h2>
            <p className="text-gray-600">
              Organize your favorites into themed collections for easier access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-red-300 transition-colors"
            >
              <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                <FaHeart className="text-red-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create New Collection</h3>
              <p className="text-gray-600">
                Group your favorite dishes by occasion, cuisine, or mood.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 shadow-sm cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">Weekend Brunch</h3>
              <p className="text-gray-600 mb-4">Perfect dishes for lazy weekend mornings.</p>
              <div className="text-sm text-gray-500">3 items</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-sm cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">Healthy Options</h3>
              <p className="text-gray-600 mb-4">Nutritious meals for fitness goals.</p>
              <div className="text-sm text-gray-500">5 items</div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-12 md:px-24 text-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Discover More Culinary Delights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Explore our AI-powered recommendations to find your next favorite dish.
        </p>

        <Link href="/recommendations">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-lg font-bold transition-all duration-300 shadow-md"
          >
            Browse Recommendations
          </motion.button>
        </Link>
      </section>
    </main>
  );
}