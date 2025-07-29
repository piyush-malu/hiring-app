// Your App.js is correct, but let's debug the CSS issues

import React from 'react';
import { HiringProvider } from './contexts/HiringContext';

// Component imports
import Header from './components/Layout/Header';
import WelcomeBanner from './components/Dashboard/WelcomeBanner';
import Dashboard from './components/Dashboard/Dashboard';
import FileUpload from './components/Upload/FileUpload';
import SearchAndFilters from './components/Search/SearchAndFilters';
import CandidateList from './components/Candidates/CandidateList';
import SelectedCandidatesPanel from './components/Selection/SelectedCandidatesPanel';

// Make sure this import is here
import './index.css';

function App() {
  return (
    <HiringProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <WelcomeBanner />
          <Dashboard />
          <FileUpload />
          <SearchAndFilters />
          <CandidateList />
        </main>
        <SelectedCandidatesPanel />
      </div>
    </HiringProvider>
  );
}

export default App;