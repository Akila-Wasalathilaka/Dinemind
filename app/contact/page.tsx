export default function ContactPage() {
  return (
    <main className="relative min-h-screen ml-[200px] w-[calc(100%-200px)] p-6">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Have questions or feedback? Reach out to us, and we'll get back to you as soon as possible!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> support@dinemind.com</p>
            <p className="text-gray-600 mb-2"><strong>Phone:</strong> (123) 456-7890</p>
            <p className="text-gray-600"><strong>Address:</strong> 123 Flavor Street, Food City, FC 12345</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-lg">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}