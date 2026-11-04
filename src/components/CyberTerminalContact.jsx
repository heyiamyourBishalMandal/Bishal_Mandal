import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

export default function CyberTerminalContact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bishalmondal.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 sm:px-8 transition-colors duration-500 relative z-10 bg-white dark:bg-[#080c10]/95 border-t border-gray-200 dark:border-gray-800/60 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/30 text-cybergreen text-xs font-mono font-bold uppercase tracking-widest mb-4">
          <Terminal className="w-3.5 h-3.5 text-cybergreen" />
          <span>DIRECT ENCRYPTED CHANNEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          Let's Build Something <span className="text-cybergreen">Extraordinary.</span>
        </h2>
        <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
          Have an ambitious project, systems engineering inquiry, or research collaboration in mind? Drop a message below.
        </p>

        {/* Cyber Executive Terminal Form Card */}
        <div className="max-w-2xl mx-auto bg-gray-50/90 dark:bg-[#0b0f15]/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/[0.08] overflow-hidden text-left hover:border-cybergreen/40 transition-all duration-500">
          {/* Terminal Title Bar */}
          <div className="px-6 py-4 bg-gray-100/90 dark:bg-black/60 border-b border-gray-200 dark:border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-xs text-gray-400 font-semibold hidden sm:inline-block">
                contact@bishalmondal.sys // v2.6
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cybergreen animate-pulse"></span>
              <span className="text-[10px] font-mono text-cybergreen uppercase tracking-wider font-bold">
                ENCRYPTED PORT
              </span>
            </div>
          </div>

          {/* Form Body */}
          <form
            action="https://formspree.io/f/xlgyapop"
            method="POST"
            className="p-6 sm:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Sender Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-cybergreen focus:ring-1 focus:ring-cybergreen/50 transition-colors placeholder-gray-500 text-sm"
                  placeholder="e.g. Bishal Mondal"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-cybergreen focus:ring-1 focus:ring-cybergreen/50 transition-colors placeholder-gray-500 text-sm"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Project Scope / Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-cybergreen focus:ring-1 focus:ring-cybergreen/50 transition-colors resize-none placeholder-gray-500 text-sm leading-relaxed"
                placeholder="Hello Bishal, I'd like to collaborate on..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cybergreen via-emerald-400 to-cybergreen hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] text-black font-extrabold py-3.5 px-8 rounded-xl shadow-lg shadow-cybergreen/25 transform transition duration-300 hover:scale-[1.01] cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <span>Transmit Message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Info Footer Bar */}
          <div className="px-6 sm:px-10 py-4 bg-gray-100/60 dark:bg-black/30 border-t border-gray-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 hover:text-cybergreen transition-colors cursor-pointer group"
              title="Click to copy email address"
            >
              <Mail className="w-3.5 h-3.5 text-cybergreen" />
              <span>bishalmondal.dev@gmail.com</span>
              {copied ? (
                <span className="text-[10px] text-cybergreen font-bold">COPIED!</span>
              ) : (
                <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">(copy)</span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cybergreen" />
              <span>Kolkata, WB, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
