"use client";

import { useState, useEffect } from "react";

const menuItems = [
  {
    id: 1,
    title: "Chicken Fried Rice",
    category: "Rice",
    description: "Delicious chicken fried rice with vegetables.",
    price: "$8.99",
    image: "/images/chicken-fried-rice.jpg",
  },
  {
    id: 2,
    title: "Egg Noodles",
    category: "Noodles",
    description: "Spicy egg noodles with a touch of soy sauce.",
    price: "$7.49",
    image: "/images/egg-noodles.jpg",
  },
  {
    id: 3,
    title: "Vegetable Kottu",
    category: "Kottu",
    description: "A mix of vegetables in Sri Lankan style Kottu.",
    price: "$6.99",
    image: "/images/veg-kottu.jpg",
  },
  {
    id: 4,
    title: "Cheese Burger",
    category: "Burger",
    description: "Juicy beef patty with cheese and pickles.",
    price: "$9.49",
    image: "/images/cheese-burger.jpg",
  },
  {
    id: 5,
    title: "Chicken Submarine",
    category: "Submarine",
    description: "Grilled chicken with salad in submarine bun.",
    price: "$7.99",
    image: "/images/chicken-sub.jpg",
  },
  {
    id: 6,
    title: "Seafood Rice",
    category: "Rice",
    description: "Fried rice mixed with shrimp and fish.",
    price: "$10.99",
    image: "/images/seafood-rice.jpg",
  },
  {
    id: 7,
    title: "Beef Kottu",
    category: "Kottu",
    description: "Sri Lankan beef kottu roti with egg and spices.",
    price: "$9.29",
    image: "/images/beef-kottu.jpg",
  },
  {
    id: 8,
    title: "Veg Submarine",
    category: "Submarine",
    description: "Healthy veggie submarine with lettuce and cheese.",
    price: "$6.79",
    image: "/images/veg-sub.jpg",
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
  });

  const [suggestions, setSuggestions] = useState(menuItems);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

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
  }

  interface MenuItem {
    id: number;
    title: string;
    category: string;
    description: string;
    price: string;
    image: string;
    cuisine?: string;
    dietary?: string;
    spice?: number;
    type?: string;
    flavor?: string;
    portion?: string;
    occasion?: string;
    time?: string;
    customer?: string;
    weather?: string;
  }

  const getSuggestions = (prefs: Preferences): MenuItem[] => {
    return menuItems.filter((item) => {
      return (
        (!prefs.cuisine || item.cuisine === prefs.cuisine) &&
        (!prefs.dietary ||
          item.dietary === prefs.dietary ||
          item.dietary === "") &&
        (!prefs.spice || item.spice! <= prefs.spice) &&
        (!prefs.mealType || item.type === prefs.mealType) &&
        (!prefs.flavor || item.flavor === prefs.flavor) &&
        (!prefs.portion || item.portion === prefs.portion) &&
        (!prefs.occasion || item.occasion === prefs.occasion) &&
        (!prefs.time || item.time === prefs.time) &&
        (!prefs.customerType || item.customer === prefs.customerType) &&
        (!prefs.weather || item.weather === prefs.weather)
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions(getSuggestions(preferences));
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
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
      <div
        key={item.id}
        className="bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <p className="text-gray-600">{item.category}</p>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-gray-600">{item.price}</p>
          <button className="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-lg">
            Order Now
          </button>
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(suggestions.length / perPage);
    const maxButtons = Math.min(totalPages, 10);
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        className={`px-6 py-3 rounded text-lg ${
          currentPage === 1 ? "bg-gray-300" : "bg-red-600 text-white"
        }`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
    );

    for (let i = 1; i <= maxButtons; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-4 py-3 rounded text-lg ${
            i === currentPage
              ? "bg-red-700 text-white"
              : "bg-red-600 text-white"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`px-6 py-3 rounded text-lg ${
          currentPage === totalPages ? "bg-gray-300" : "bg-red-600 text-white"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    );

    return buttons;
  };

  useEffect(() => {
    setSuggestions(menuItems);
  }, []);

  return (
    <main className="relative min-h-screen ml-[200px] w-[calc(100%-200px)] p-6">
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Personalize Your Meal
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Form fields can be added here if needed */}
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderSuggestions()}
      </section>

      <div className="mt-10 flex justify-center gap-2 flex-wrap">
        {renderPagination()}
      </div>
    </main>
  );
}