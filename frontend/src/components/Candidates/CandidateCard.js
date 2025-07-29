import React, { useState } from 'react';
import { 
  MapPin, Briefcase, Award, DollarSign, Calendar, CheckCircle, Plus,  Mail, Eye, Phone, Star, Clock, Diamond, GraduationCap, Building2
} from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';

const CandidateCard = ({ candidate }) => {
  const { selectedCandidates, selectCandidate, deselectCandidate } = useHiring();
  const [isHovered, setIsHovered] = useState(false);
  
  const isSelected = selectedCandidates.some(c => c.id === candidate.id);
  const canSelect = selectedCandidates.length < 5;

  const handleSelect = () => {
    if (isSelected) {
      deselectCandidate(candidate.id);
    } else if (canSelect) {
      selectCandidate(candidate);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 95) return { 
      bg: 'from-emerald-500 to-green-600', 
      text: 'text-white', 
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      glow: 'shadow-emerald-500/25'
    };
    if (score >= 90) return { 
      bg: 'from-blue-500 to-indigo-600', 
      text: 'text-white', 
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      glow: 'shadow-blue-500/25'
    };
    if (score >= 80) return { 
      bg: 'from-purple-500 to-purple-600', 
      text: 'text-white', 
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      glow: 'shadow-purple-500/25'
    };
    return { 
      bg: 'from-gray-500 to-gray-600', 
      text: 'text-white', 
      badge: 'bg-gray-100 text-gray-800 border-gray-200',
      glow: 'shadow-gray-500/25'
    };
  };

  const getEducationInfo = () => {
    if (!candidate.education || !candidate.education.degrees || candidate.education.degrees.length === 0) {
      return { degree: 'Education not specified', school: '', isTop50: false };
    }
    
    const degree = candidate.education.degrees[0];
    return {
      degree: degree.degree || 'Degree',
      subject: degree.subject || '',
      school: degree.originalSchool || degree.school || '',
      isTop50: degree.isTop50 || false
    };
  };

  const scoreColor = getScoreColor(candidate.score);
  const education = getEducationInfo();

  return (
    <div 
      className={`group relative bg-white rounded-2xl border-2 transition-all duration-500 hover:-translate-y-3 hover:rotate-1 ${
        isSelected 
          ? 'border-blue-500 ring-4 ring-blue-200 shadow-2xl shadow-blue-500/20 scale-105' 
          : 'border-gray-100 shadow-lg hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-500/10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl"></div>
      )}

      {candidate.isTopTier && (
        <div className="absolute -top-4 left-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 shadow-xl animate-pulse">
          <Diamond className="w-4 h-4" />
          <span>TOP TALENT</span>
          <Star className="w-3 h-3 fill-current" />
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${scoreColor.bg} ${scoreColor.text} font-bold text-lg shadow-xl ${scoreColor.glow} transform hover:scale-110 transition-transform duration-300`}>
          {candidate.score}
          <span className="text-sm opacity-90">%</span>
        </div>
      </div>

      <div className="relative p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                {candidate.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {candidate.name}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {candidate.location}
              </div>
              <div className="flex items-center text-gray-500 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Available for immediate start
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Current Role</span>
          </div>
          <p className="text-sm text-gray-900 font-medium">
            {candidate.latestRole?.roleName || 'Role not specified'}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <Building2 className="w-3 h-3 mr-1" />
            {candidate.latestRole?.company || 'Company not specified'}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Education</span>
            {education.isTop50 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-bold">
                TOP 50
              </span>
            )}
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-sm text-blue-900 font-medium">
              {education.degree}
              {education.subject && ` in ${education.subject}`}
            </p>
            <p className="text-xs text-blue-700">
              {education.school}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Key Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.skillsArray?.slice(0, 4).map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200 hover:bg-blue-200 transition-colors">
                {skill}
              </span>
            ))}
            {candidate.skillsArray?.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium border border-gray-200">
                +{candidate.skillsArray.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-bold text-green-900">{candidate.formattedSalary}</div>
            <div className="text-xs text-green-600">Expected Salary</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-bold text-purple-900">{candidate.yearsExperience}+ years</div>
            <div className="text-xs text-purple-600">Experience</div>
          </div>
        </div>

        <button
          onClick={handleSelect}
          disabled={!isSelected && !canSelect}
          className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
            isSelected 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl' 
              : canSelect
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-dashed border-gray-300 hover:border-blue-300 hover:text-blue-700'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSelected ? (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Selected for Team</span>
            </div>
          ) : canSelect ? (
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add to Team</span>
            </div>
          ) : (
            'Team Complete'
          )}
        </button>

        {isHovered && (
          <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-110 group">
              <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
            </button>
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-110 group">
              <Eye className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
            </button>
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-110 group">
              <Phone className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;