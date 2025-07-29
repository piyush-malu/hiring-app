import React from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';
import CandidateCard from './CandidateCard';
import CandidateTable from './CandidateTable';

const CandidateList = () => {
  const { candidates, view, sortBy } = useHiring();

  if (candidates.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative mx-auto mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Users className="w-16 h-16 text-gray-400" />
          </div>
          {/* Floating search icons */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Search className="w-4 h-4 text-blue-500" />
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
            <Filter className="w-4 h-4 text-purple-500" />
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">No candidates found</h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Try adjusting your search terms or filters to discover amazing talent
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl font-bold text-lg transition-all duration-300 hover:scale-105">
            Clear All Filters
          </button>
        </div>
      </div>
    );
  }

  if (view === 'table') {
    return <CandidateTable candidates={candidates} />;
  }

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {candidates.length} Exceptional Candidate{candidates.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-gray-600">
            Sorted by {sortBy === 'score' ? 'highest score' : sortBy} • Ready to hire
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live results</span>
        </div>
      </div>
      
      {/* Candidates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {candidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

export default CandidateList;