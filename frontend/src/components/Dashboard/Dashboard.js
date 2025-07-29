import React, { useMemo } from 'react';
import { Users, Star, Trophy, Target, Zap } from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';
import StatCard from './StatCard';

const Dashboard = () => {
  const { allCandidates, selectedCandidates } = useHiring();
  
  const stats = useMemo(() => {
    if (allCandidates.length === 0) {
      return {
        total: 0,
        avgScore: 0,
        topTalent: 0,
        locations: 0,
        selected: selectedCandidates.length,
        totalSalary: 0
      };
    }
    
    const avgScore = allCandidates.reduce((sum, c) => sum + c.score, 0) / allCandidates.length;
    const topTalent = allCandidates.filter(c => c.score >= 90).length;
    const locations = new Set(allCandidates.map(c => c.primaryLocation)).size;
    const totalSalary = selectedCandidates.reduce((sum, c) => {
      return sum + parseInt(c.formattedSalary.replace(/[$,]/g, ''));
    }, 0);
    
    return {
      total: allCandidates.length,
      avgScore: Math.round(avgScore),
      topTalent,
      locations,
      selected: selectedCandidates.length,
      totalSalary
    };
  }, [allCandidates, selectedCandidates]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
          <Zap className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-bold text-sm">Real-time Analytics</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900">
          Hiring Dashboard
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Track your recruitment progress and team building metrics in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Total Candidates" 
          value={stats.total} 
          icon={<Users className="w-8 h-8" />}
          color="blue"
          trend="+12 this week"
        />
        <StatCard 
          title="Average Score" 
          value={`${stats.avgScore}/100`} 
          icon={<Star className="w-8 h-8" />}
          color="yellow"
          trend="↑ 5.2 points"
        />
        <StatCard 
          title="Top Talent" 
          value={`${stats.topTalent} found`} 
          icon={<Trophy className="w-8 h-8" />}
          color="purple"
          trend="90+ score"
        />
        <StatCard 
          title="Team Progress" 
          value={stats.selected > 0 ? `$${(stats.totalSalary/1000).toFixed(0)}k` : 'Start hiring'} 
          icon={<Target className="w-8 h-8" />}
          color="green"
          trend={`${stats.selected}/5 hired`}
        />
      </div>
    </div>
  );
};

export default Dashboard;