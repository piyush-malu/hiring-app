import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';

const SearchAndFilters = () => {
  const { 
    searchTerm, 
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSort,
    view,
    setView,
    allCandidates 
  } = useHiring();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const locations = useMemo(() => {
    return [...new Set(allCandidates.map(c => c.primaryLocation))].sort();
  }, [allCandidates]);

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, company, or skills..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              isFilterOpen ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            value={sortBy}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="score">Highest Score</option>
            <option value="name">Name A-Z</option>
            <option value="submitted_at">Most Recent</option>
          </select>

          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('cards')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Table
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {isFilterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Score</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.minScore}
                onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value))}
              >
                <option value={0}>Any Score</option>
                <option value={90}>90+ (Exceptional)</option>
                <option value={80}>80+ (Strong)</option>
                <option value={70}>70+ (Good)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.experienceLevel}
                onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              >
                <option value="">Any Experience</option>
                <option value="senior">Senior (5+ years)</option>
                <option value="mid">Mid-level (2-5 years)</option>
                <option value="junior">Junior (0-2 years)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;