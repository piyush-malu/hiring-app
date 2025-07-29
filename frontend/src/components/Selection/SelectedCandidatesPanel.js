import React, { useState } from 'react';
import { Users, ArrowRight, X, Crown, Star, Zap, Trophy } from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';

const SelectedCandidatesPanel = () => {
  const { selectedCandidates, deselectCandidate, clearSelections } = useHiring();
  const [isExpanded, setIsExpanded] = useState(false);

  if (selectedCandidates.length === 0) {
    return null;
  }

  const totalSalary = selectedCandidates.reduce((sum, candidate) => {
    return sum + parseInt(candidate.formattedSalary.replace(/[$,]/g, ''));
  }, 0);

  const avgScore = selectedCandidates.length > 0 
    ? Math.round(selectedCandidates.reduce((sum, c) => sum + c.score, 0) / selectedCandidates.length)
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-gray-200 shadow-2xl z-50">
      {/* Animated top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                {/* Notification badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs font-bold">{selectedCandidates.length}</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-black text-gray-900">
                    Your Dream Team
                  </h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
                    <span className="text-blue-700 font-bold text-sm">{selectedCandidates.length}/5</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600">Avg Score: <span className="font-bold text-gray-900">{avgScore}%</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">Budget: <span className="font-bold text-gray-900">${totalSalary.toLocaleString()}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">Premium talent selected</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold transition-colors hover:bg-gray-100 rounded-xl"
              >
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </button>
              <button
                onClick={clearSelections}
                className="px-6 py-3 text-red-600 hover:text-red-700 font-semibold transition-colors hover:bg-red-50 rounded-xl"
              >
                Clear All
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white rounded-2xl hover:shadow-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3 group">
                <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Hire Dream Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Team Preview - Compact */}
          {!isExpanded && (
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {selectedCandidates.map((candidate, index) => (
                <div 
                  key={candidate.id} 
                  className="flex-shrink-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 flex items-center space-x-4 min-w-0 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {candidate.avatar}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{candidate.name}</p>
                    <p className="text-xs text-gray-600 truncate">{candidate.latestRole?.roleName}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      candidate.score >= 95 ? 'bg-emerald-100 text-emerald-800' : 
                      candidate.score >= 90 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {candidate.score}%
                    </span>
                    <button
                      onClick={() => deselectCandidate(candidate.id)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors group"
                    >
                      <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
              {selectedCandidates.map((candidate, index) => (
                <div key={candidate.id} className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Position number */}
                  <div className="absolute -top-3 left-6 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{candidate.name}</h4>
                        <p className="text-sm text-gray-600">{candidate.primaryLocation}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deselectCandidate(candidate.id)}
                      className="p-2 hover:bg-red-100 rounded-full transition-colors group"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-700 font-bold">{candidate.latestRole?.roleName}</p>
                      <p className="text-xs text-blue-600 font-medium">{candidate.latestRole?.company}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className={`px-3 py-1 rounded-xl text-sm font-bold ${
                        candidate.score >= 95 ? 'bg-emerald-100 text-emerald-800' : 
                        candidate.score >= 90 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {candidate.score}%
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {candidate.formattedSalary}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedCandidatesPanel;