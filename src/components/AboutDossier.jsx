import React from 'react';
import { Target, Cpu, Sparkles, Award } from 'lucide-react';

export default function AboutDossier() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-8 relative z-10 border-t border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#080c10]/95 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/30 text-cybergreen text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-cybergreen animate-ping" />
            Developer Dossier
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            About <span className="text-cybergreen">Bishal Mandal.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-light text-base sm:text-lg lg:text-xl leading-relaxed">
            Software Developer & Systems Engineer based in Kolkata, with research experience at <strong className="text-cybergreen font-semibold">IIT Kharagpur</strong>.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Profile Card */}
          <div className="lg:col-span-5 bg-gray-50/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl border border-gray-200 dark:border-gray-800/80 hover:border-cybergreen/50 p-6 sm:p-8 rounded-3xl shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,230,118,0.12)] flex flex-col justify-between space-y-6 transition-all duration-500 group">
            <div>
              <div className="flex items-center gap-4 sm:gap-5 mb-6">
                {/* Beautifully Framed Circular Profile Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-cybergreen shadow-[0_0_25px_rgba(0,230,118,0.4)] shrink-0 group-hover:scale-105 transition-transform duration-500 bg-black/90">
                  <img
                    src="assets/img/About_Me.jpg"
                    alt="Bishal Mandal"
                    className="w-full h-full object-cover object-top filter contrast-[105%] brightness-[102%]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'img/About_Me.jpg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">Bishal Mandal</h3>
                  <p className="text-[10px] sm:text-xs font-mono text-cybergreen uppercase tracking-widest font-bold mt-1">
                    IIT KGP Research Intern & BCA Graduate
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                Based in Kolkata, my engineering foundation is built on mathematical precision, system algorithms, frontend web engineering, and Python desktop automation.
              </p>
            </div>

            {/* Stat Pills Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-gray-200 dark:border-gray-800/80 pt-6">
              <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl text-center shadow-sm hover:border-cybergreen/40 transition-colors">
                <span className="block text-lg sm:text-xl font-black text-cybergreen">IIT KGP</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">Research Intern</span>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl text-center shadow-sm hover:border-cybergreen/40 transition-colors">
                <span className="block text-xl sm:text-2xl font-black text-cybergreen">2025</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">BCA Graduate</span>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl text-center shadow-sm hover:border-cybergreen/40 transition-colors">
                <span className="block text-lg sm:text-xl font-black text-cybergreen">J.E.R.V.I.S</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">PyQt6 Assistant</span>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl text-center shadow-sm hover:border-cybergreen/40 transition-colors">
                <span className="block text-xl sm:text-2xl font-black text-cybergreen">Google</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">Career Goal</span>
              </div>
            </div>
          </div>

          {/* Right Narrative Card */}
          <div className="lg:col-span-7 bg-gray-50/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl border border-gray-200 dark:border-gray-800/80 hover:border-cybergreen/40 p-6 sm:p-10 rounded-3xl shadow-2xl flex flex-col justify-center space-y-6 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-500">
            
            {/* Featured IIT Kharagpur Experience Card */}
            <div className="bg-cybergreen/10 border border-cybergreen/30 p-5 sm:p-6 rounded-2xl relative overflow-hidden backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Award className="w-5 h-5 text-cybergreen shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Research Internship — <span className="text-cybergreen">IIT Kharagpur</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 font-normal">
                Successfully completed a research internship in <strong className="text-gray-900 dark:text-white font-semibold">Web Development & Frontend Engineering</strong> to showcase <strong className="text-cybergreen font-semibold">Indoor Air Pollution (IAP) Frameworks</strong> under the guidance of <strong className="text-gray-900 dark:text-white font-semibold">Prof. Sandip Chakraborty</strong>, Department of Computer Science & Engineering (CSE), IIT Kharagpur.
              </p>
              <div className="inline-flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-cybergreen bg-cybergreen/10 px-3.5 py-1.5 rounded-full border border-cybergreen/30">
                <span>Dept. of CSE, IIT Kharagpur</span>
                <span>•</span>
                <span>Prof. Sandip Chakraborty</span>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="border-t border-gray-200 dark:border-gray-800/80 pt-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cybergreen shrink-0" />
                <span>Core Technical Competencies</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                I specialize in architecting responsive full-stack applications, environmental data visualization dashboards, and powerful desktop tooling utilizing <strong className="text-gray-900 dark:text-white font-semibold">Python, C++, and modern JavaScript ecosystems</strong>—most notably engineering <span className="text-cybergreen font-mono font-bold bg-cybergreen/20 px-2.5 py-0.5 rounded-md border border-cybergreen/40">J.E.R.V.I.S.</span>, a custom desktop voice assistant built for automation.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800/80 pt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-cybergreen shrink-0 animate-pulse" />
              <span>When away from the keyboard, I explore new audio landscapes and experiment with creative culinary recipes.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
