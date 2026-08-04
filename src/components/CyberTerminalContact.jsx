import React from 'react';

export default function CyberTerminalContact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-8 transition-colors duration-300 relative z-10 bg-white dark:bg-[#080c10]/95 border-t border-gray-200 dark:border-gray-800/60 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-10 leading-relaxed">
          Have a question or want to work together? Drop me a message below!
        </p>

        <form
          action="https://formspree.io/f/xlgyapop"
          method="POST"
          className="max-w-xl mx-auto space-y-6 text-left bg-white/60 dark:bg-[#11161d]/60 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/80"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cybergreen transition-colors placeholder-gray-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cybergreen transition-colors placeholder-gray-400"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cybergreen transition-colors resize-none placeholder-gray-400"
              placeholder="Hello Bishal, I'd like to talk about..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cybergreen hover:bg-emerald-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg shadow-cybergreen/20 transform transition duration-300 hover:scale-[1.02] cursor-pointer text-base"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
