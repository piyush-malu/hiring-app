import React from 'react';
import { Sparkles, Users, Target, Crown } from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';
import '../../index.css';

const WelcomeBanner = () => {
  const { selectedCandidates, allCandidates } = useHiring();
  const progress = (selectedCandidates.length / 5) * 100;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative px-8 py-16 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-xl">
              <Crown className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white font-bold text-sm">Premium Talent Marketplace</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                Build Your
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Dream Team
                </span>
              </h1>
              <p className="text-blue-100 text-xl leading-relaxed">
                You've raised $100M to revolutionize the industry. Now let's find the exceptional talent 
                who will help you achieve that ambitious vision.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg">{allCandidates.length}</div>
                  <div className="text-blue-200 text-sm">Premium Candidates</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg">{selectedCandidates.length}/5</div>
                  <div className="text-blue-200 text-sm">Team Selected</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg">AI-Powered</div>
                  <div className="text-blue-200 text-sm">Smart Matching</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-48 h-48 bg-white/10 backdrop-blur-lg rounded-full border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center">
                <div className="text-6xl font-black text-white">{selectedCandidates.length}</div>
                <div className="text-white/80 text-sm font-medium">of 5</div>
                <div className="text-yellow-300 text-xs font-bold">TEAM MEMBERS</div>
              </div>
              
              <svg className="absolute top-0 left-0 w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>

              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 bg-yellow-300 rounded-full animate-ping`}
                  style={{
                    top: `${20 + i * 30}%`,
                    right: `${-10 + i * 5}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;