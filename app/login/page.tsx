"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="relative min-h-screen ml-[200px] w-[calc(100%-200px)] p-6">
      <section className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {isLogin ? "Welcome back! Please log in to your account." : "Create a new account to get started with DineMind."}
        </p>
        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Your Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-lg w-full">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p className="text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-red-600 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}