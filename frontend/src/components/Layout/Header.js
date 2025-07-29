import React from 'react';
import { Globe, Rocket, Zap, Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="p-3 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Rocket className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                TalentFlow
              </h1>
              <p className="text-sm text-gray-600 font-medium flex items-center">
                <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                AI-Powered Hiring Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              <div className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="absolute inset-0 bg-white/20 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative text-white font-bold text-sm flex items-center">
                  <Crown className="h-4 w-4 mr-2" />
                  $100M Raised
                </span>
              </div>
              
              <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200 rounded-full hover:shadow-lg transition-all duration-300">
                <span className="text-blue-700 font-bold text-sm">Series A</span>
              </div>
            </div>
            
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 group">
              <Globe className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;