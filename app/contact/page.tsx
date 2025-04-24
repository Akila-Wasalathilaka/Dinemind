'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormState((prev: FormState) => ({
      ...prev,
      [name]: value
    }));
  };

  interface SubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-red-500" />,
      title: "Email",
      content: "support@dinemind.com",
      link: "mailto:support@dinemind.com"
    },
    {
      icon: <FaPhone className="text-red-500" />,
      title: "Phone",
      content: "(123) 456-7890",
      link: "tel:+11234567890"
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      title: "Address",
      content: "123 Flavor Street, Food City, FC 12345",
      link: "https://maps.google.com/?q=123+Flavor+Street,+Food+City"
    },
    {
      icon: <FaClock className="text-red-500" />,
      title: "Hours",
      content: "Monday - Friday: 9AM - 5PM",
      link: null
    }
  ];

  return (
    <main className="md:ml-[200px] bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white relative py-20 px-12 md:px-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Have questions or feedback? We&apos;d love to hear from you! Reach out to our team, and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-12 md:px-24 bg-white">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start"
                >
                  <div className="bg-red-50 p-3 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        target={item.link.startsWith('http') ? "_blank" : ""}
                        rel={item.link.startsWith('http') ? "noopener noreferrer" : ""}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-600">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social}.com/dinemind`} // Replace with actual links
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-100 p-3 rounded-full hover:bg-red-100 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-red-500 rounded-full"></div> {/* Replace with actual social icons */}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6"
                >
                  Thank you for your message! We&apos;ll get back to you soon.
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-white ${
                    isSubmitting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                  } transition-colors shadow-md flex justify-center items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Sending...</span>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-12 md:px-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about DineMind.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How does DineMind make food recommendations?",
                answer: "DineMind uses advanced AI algorithms to analyze your taste preferences, dietary restrictions, previous choices, and seasonal availability to suggest dishes you're likely to enjoy."
              },
              {
                question: "Can I filter recommendations based on dietary needs?",
                answer: "Absolutely! You can set dietary preferences such as vegetarian, vegan, gluten-free, kosher, halal, and many more to ensure all recommendations align with your needs."
              },
              {
                question: "Is DineMind available on mobile devices?",
                answer: "Yes, DineMind is available as both a web application and mobile app for iOS and Android devices."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">
              Didn&apos;t find what you&apos;re looking for? We&apos;re here to help!
            </p>
            <Link href="#top">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-md"
              >
                Contact Our Support Team
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-12 md:px-24 bg-white">
        <div className="bg-gray-200 h-96 w-full rounded-lg">
          {/* This would be replaced with an actual map component */}
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500 text-lg">Interactive Map Would Display Here</p>
          </div>
        </div>
      </section>
    </main>
  );
}