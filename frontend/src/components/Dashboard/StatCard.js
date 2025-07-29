import React from 'react';

const StatCard = ({ title, value, icon, color, trend }) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      shadow: 'shadow-blue-500/20'
    },
    yellow: {
      gradient: 'from-yellow-500 to-orange-500',
      text: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      shadow: 'shadow-orange-500/20'
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/20'
    },
    green: {
      gradient: 'from-green-500 to-green-600',
      text: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      shadow: 'shadow-green-500/20'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`group relative bg-white rounded-3xl shadow-lg border-2 ${colors.border} p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:${colors.shadow} overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`}></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          
          {/* Trend indicator */}
          <div className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border ${colors.border}`}>
            {trend}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-black text-gray-900 group-hover:scale-105 transition-transform duration-300">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;