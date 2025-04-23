export default function AboutPage() {
  return (
    <main className="relative min-h-screen ml-[200px] w-[calc(100%-200px)] p-6">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About DineMind</h1>
        <p className="text-lg text-gray-600 mb-4">
          DineMind is an AI-powered food recommendation system designed to help you discover the perfect meal based on your preferences. Whether you're looking for a quick bite or a meal for a special occasion, our system analyzes your tastes, dietary needs, and more to suggest the best dishes from our curated menu.
        </p>
        <p className="text-lg text-gray-600">
          Our mission is to make dining decisions effortless and enjoyable, bringing you personalized recommendations that cater to your unique palate. Explore our recommendations, learn more about our offerings, and let DineMind guide you to your next delicious meal!
        </p>
      </section>
    </main>
  );
}