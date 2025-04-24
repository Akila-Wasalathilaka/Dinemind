"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations

// Extended menu items with all the properties used in filtering
const menuItems = [
  {
    id: 1,
    title: "Chicken Fried Rice",
    category: "Rice",
    description: "Delicious chicken fried rice with vegetables.",
    price: 8.99,
    priceDisplay: "$8.99",
    image: "/images/chicken-fried-rice.jpg",
    cuisine: "Asian",
    dietary: "Non-vegetarian",
    spice: 2,
    type: "Lunch",
    flavor: "Savory",
    portion: "Regular",
    occasion: "Casual",
    time: "Day",
    customer: "Adults",
    weather: "Any",
  },
  {
    id: 2,
    title: "Egg Noodles",
    category: "Noodles",
    description: "Spicy egg noodles with a touch of soy sauce.",
    price: 7.49,
    priceDisplay: "$7.49",
    image: "/images/egg-noodles.jpg",
    cuisine: "Chinese",
    dietary: "Vegetarian",
    spice: 3,
    type: "Dinner",
    flavor: "Spicy",
    portion: "Regular",
    occasion: "Casual",
    time: "Evening",
    customer: "Adults",
    weather: "Any",
  },
  {
    id: 3,
    title: "Vegetable Kottu",
    category: "Kottu",
    description: "A mix of vegetables in Sri Lankan style Kottu.",
    price: 6.99,
    priceDisplay: "$6.99",
    image: "/images/veg-kottu.jpg",
    cuisine: "Sri Lankan",
    dietary: "Vegetarian",
    spice: 2,
    type: "Dinner",
    flavor: "Savory",
    portion: "Large",
    occasion: "Casual",
    time: "Evening",
    customer: "Anyone",
    weather: "Any",
  },
  {
    id: 4,
    title: "Cheese Burger",
    category: "Burger",
    description: "Juicy beef patty with cheese and pickles.",
    price: 9.49,
    priceDisplay: "$9.49",
    image: "/images/cheese-burger.jpg",
    cuisine: "American",
    dietary: "Non-vegetarian",
    spice: 1,
    type: "Lunch",
    flavor: "Savory",
    portion: "Regular",
    occasion: "Casual",
    time: "Day",
    customer: "Anyone",
    weather: "Any",
  },
  {
    id: 5,
    title: "Chicken Submarine",
    category: "Submarine",
    description: "Grilled chicken with salad in submarine bun.",
    price: 7.99,
    priceDisplay: "$7.99",
    image: "/images/chicken-sub.jpg",
    cuisine: "American",
    dietary: "Non-vegetarian",
    spice: 1,
    type: "Lunch",
    flavor: "Mild",
    portion: "Regular",
    occasion: "Casual",
    time: "Day",
    customer: "Anyone",
    weather: "Any",
  },
  {
    id: 6,
    title: "Seafood Rice",
    category: "Rice",
    description: "Fried rice mixed with shrimp and fish.",
    price: 10.99,
    priceDisplay: "$10.99",
    image: "/images/seafood-rice.jpg",
    cuisine: "Asian",
    dietary: "Seafood",
    spice: 2,
    type: "Dinner",
    flavor: "Savory",
    portion: "Large",
    occasion: "Special",
    time: "Evening",
    customer: "Adults",
    weather: "Any",
  },
  {
    id: 7,
    title: "Beef Kottu",
    category: "Kottu",
    description: "Sri Lankan beef kottu roti with egg and spices.",
    price: 9.29,
    priceDisplay: "$9.29",
    image: "/images/beef-kottu.jpg",
    cuisine: "Sri Lankan",
    dietary: "Non-vegetarian",
    spice: 4,
    type: "Dinner",
    flavor: "Spicy",
    portion: "Large",
    occasion: "Casual",
    time: "Evening",
    customer: "Adults",
    weather: "Any",
  },
  {
    id: 8,
    title: "Veg Submarine",
    category: "Submarine",
    description: "Healthy veggie submarine with lettuce and cheese.",
    price: 6.79,
    priceDisplay: "$6.79",
    image: "/images/veg-sub.jpg",
    cuisine: "American",
    dietary: "Vegetarian",
    spice: 1,
    type: "Lunch",
    flavor: "Mild",
    portion: "Regular",
    occasion: "Casual",
    time: "Day",
    customer: "Anyone",
    weather: "Any",
  },
];

export default function RecommendationPage() {
  const [preferences, setPreferences] = useState({
    cuisine: "",
    dietary: "",
    spice: 1,
    mealType: "",
    flavor: "",
    portion: "",
    occasion: "",
    time: "",
    customerType: "",
    weather: "",
    priceRange: { min: 0, max: 15 },
    category: "",
    sortBy: "default",
  });

  const [suggestions, setSuggestions] = useState(menuItems);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const [showAdvanced, setShowAdvanced] = useState(false);

  interface Preferences {
    cuisine: string;
    dietary: string;
    spice: number;
    mealType: string;
    flavor: string;
    portion: string;
    occasion: string;
    time: string;
    customerType: string;
    weather: string;
    priceRange: { min: number; max: number };
    category: string;
    sortBy: string;
  }

  interface MenuItem {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
    priceDisplay: string;
    image: string;
    cuisine: string;
    dietary: string;
    spice: number;
    type: string;
    flavor: string;
    portion: string;
    occasion: string;
    time: string;
    customer: string;
    weather: string;
  }

  const getSuggestions = (prefs: Preferences): MenuItem[] => {
    const filtered = menuItems.filter((item) => {
      return (
        (!prefs.cuisine || item.cuisine === prefs.cuisine) &&
        (!prefs.dietary || item.dietary === prefs.dietary || item.dietary === "") &&
        (!prefs.spice || item.spice <= prefs.spice) &&
        (!prefs.mealType || item.type === prefs.mealType) &&
        (!prefs.flavor || item.flavor === prefs.flavor) &&
        (!prefs.portion || item.portion === prefs.portion) &&
        (!prefs.occasion || item.occasion === prefs.occasion) &&
        (!prefs.time || item.time === prefs.time) &&
        (!prefs.customerType || item.customer === prefs.customerType) &&
        (!prefs.weather || item.weather === prefs.weather) &&
        (!prefs.category || item.category === prefs.category) &&
        (item.price >= prefs.priceRange.min && item.price <= prefs.priceRange.max)
      );
    });

    // Sort the filtered items
    switch (prefs.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "spice-low":
        filtered.sort((a, b) => a.spice - b.spice);
        break;
      case "spice-high":
        filtered.sort((a, b) => b.spice - a.spice);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions(getSuggestions(preferences));
    setCurrentPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "priceMin" || name === "priceMax") {
      const priceValue = parseFloat(value);
      setPreferences((prev) => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name === "priceMin" ? "min" : "max"]: priceValue,
        },
      }));
    } else {
      setPreferences((prev) => ({ ...prev, [name]: value }));
    }
  };

  const renderSuggestions = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedSuggestions = suggestions.slice(start, end);

    if (paginatedSuggestions.length === 0) {
      return (
        <p className="text-center text-gray-600 col-span-3 text-xl">
          No items match your preferences.
        </p>
      );
    }

    return paginatedSuggestions.map((item) => (
      <motion.div
        key={item.id}
        className="bg-white rounded-lg shadow-md"
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <span className="font-bold text-red-600">{item.priceDisplay}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">{item.category}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">{item.cuisine}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">{item.dietary}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
              Spice: {Array(item.spice).fill('🌶️').join('')}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-lg w-full"
          >
            Order Now
          </motion.button>
        </div>
      </motion.div>
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(suggestions.length / perPage);
    const maxButtons = Math.min(totalPages, 10);
    const buttons = [];

    buttons.push(
      <motion.button
        key="prev"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded text-lg ${
          currentPage === 1 ? "bg-gray-300" : "bg-red-600 text-white"
        }`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </motion.button>
    );

    for (let i = 1; i <= maxButtons; i++) {
      buttons.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-3 rounded text-lg ${
            i === currentPage
              ? "bg-red-700 text-white"
              : "bg-red-600 text-white"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </motion.button>
      );
    }

    buttons.push(
      <motion.button
        key="next"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded text-lg ${
          currentPage === totalPages ? "bg-gray-300" : "bg-red-600 text-white"
        }`}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </motion.button>
    );

    return buttons;
  };

  useEffect(() => {
    setSuggestions(menuItems);
  }, []);

  return (
    <main className="md:ml-[200px] py-20 px-12 md:px-24 bg-gray-50 min-h-screen">
      <section className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Personalize Your Meal
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Basic Filters Row */}
          <div className="mb-4">
            <label htmlFor="cuisine" className="block text-gray-700 font-medium mb-2">
              Cuisine Type
            </label>
            <select
              id="cuisine"
              name="cuisine"
              value={preferences.cuisine}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Any Cuisine</option>
              <option value="Asian">Asian</option>
              <option value="American">American</option>
              <option value="Chinese">Chinese</option>
              <option value="Sri Lankan">Sri Lankan</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dietary" className="block text-gray-700 font-medium mb-2">
              Dietary Preference
            </label>
            <select
              id="dietary"
              name="dietary"
              value={preferences.dietary}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Any Dietary Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-vegetarian">Non-vegetarian</option>
              <option value="Seafood">Seafood</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Food Category
            </label>
            <select
              id="category"
              name="category"
              value={preferences.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Any Category</option>
              <option value="Rice">Rice</option>
              <option value="Noodles">Noodles</option>
              <option value="Kottu">Kottu</option>
              <option value="Burger">Burger</option>
              <option value="Submarine">Submarine</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="mealType" className="block text-gray-700 font-medium mb-2">
              Meal Type
            </label>
            <select
              id="mealType"
              name="mealType"
              value={preferences.mealType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Any Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price Range (${preferences.priceRange.min} - ${preferences.priceRange.max})
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  name="priceMin"
                  min="0"
                  max="15"
                  step="0.01"
                  value={preferences.priceRange.min}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Min"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="priceMax"
                  min="0"
                  max="15"
                  step="0.01"
                  value={preferences.priceRange.max}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Spice Level */}
          <div className="mb-4">
            <label htmlFor="spice" className="block text-gray-700 font-medium mb-2">
              Max Spice Level (1-5): {preferences.spice}
            </label>
            <input
              type="range"
              id="spice"
              name="spice"
              min="1"
              max="5"
              value={preferences.spice}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Mild</span>
              <span>Medium</span>
              <span>Spicy</span>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="mb-4 md:col-span-2">
            <motion.button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-red-600 font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAdvanced ? '− Hide Advanced Filters' : '+ Show Advanced Filters'}
            </motion.button>
          </div>

          {/* Advanced Filters with Animation */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2"
              >
                <div className="mb-4">
                  <label htmlFor="flavor" className="block text-gray-700 font-medium mb-2">
                    Flavor Profile
                  </label>
                  <select
                    id="flavor"
                    name="flavor"
                    value={preferences.flavor}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Any Flavor</option>
                    <option value="Savory">Savory</option>
                    <option value="Sweet">Sweet</option>
                    <option value="Spicy">Spicy</option>
                    <option value="Mild">Mild</option>
                    <option value="Tangy">Tangy</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="portion" className="block text-gray-700 font-medium mb-2">
                    Portion Size
                  </label>
                  <select
                    id="portion"
                    name="portion"
                    value={preferences.portion}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Any Size</option>
                    <option value="Small">Small</option>
                    <option value="Regular">Regular</option>
                    <option value="Large">Large</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="occasion" className="block text-gray-700 font-medium mb-2">
                    Occasion
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={preferences.occasion}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Any Occasion</option>
                    <option value="Casual">Casual</option>
                    <option value="Special">Special</option>
                    <option value="Party">Party</option>
                    <option value="Quick Bite">Quick Bite</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                    Time of Day
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={preferences.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Any Time</option>
                    <option value="Morning">Morning</option>
                    <option value="Day">Day</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="customerType" className="block text-gray-700 font-medium mb-2">
                    Customer Type
                  </label>
                  <select
                    id="customerType"
                    name="customerType"
                    value={preferences.customerType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Anyone</option>
                    <option value="Kids">Kids</option>
                    <option value="Adults">Adults</option>
                    <option value="Families">Families</option>
                    <option value="Seniors">Seniors</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="weather" className="block text-gray-700 font-medium mb-2">
                    Weather Suitability
                  </label>
                  <select
                    id="weather"
                    name="weather"
                    value={preferences.weather}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Any Weather</option>
                    <option value="Hot">Hot Day</option>
                    <option value="Cold">Cold Day</option>
                    <option value="Rainy">Rainy Day</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="sortBy" className="block text-gray-700 font-medium mb-2">
                    Sort Results By
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={preferences.sortBy}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="spice-low">Spice Level: Low to High</option>
                    <option value="spice-high">Spice Level: High to Low</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-colors text-lg font-bold"
            >
              Find My Meal
            </motion.button>
          </div>
        </form>
      </section>

      {/* Results Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Menu Recommendations ({suggestions.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderSuggestions()}
        </div>
      </section>

      <div className="py-12 flex justify-center gap-3 flex-wrap">
        {renderPagination()}
      </div>
    </main>
  );
}