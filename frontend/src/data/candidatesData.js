import candidatesJson from './candidate.json';

/**
 * Calculate candidate score based on various factors
 */
const calculateScore = (candidate) => {
  let score = 60; // Base score
  
  if (candidate.education?.highest_level === 'PhD') score += 20;
  else if (candidate.education?.highest_level === "Master's Degree") score += 15;
  else if (candidate.education?.highest_level === "Bachelor's Degree") score += 10;
  
  const hasTop50 = candidate.education?.degrees?.some(degree => degree.isTop50);
  if (hasTop50) score += 10;

  const highestGPA = candidate.education?.degrees?.reduce((max, degree) => {
    const gpaScore = degree.gpa === 'GPA 3.8-4.0' ? 4 : 
                   degree.gpa === 'GPA 3.5-3.9' ? 3.7 : 
                   degree.gpa === 'GPA 3.0-3.4' ? 3.2 : 2.5;
    return Math.max(max, gpaScore);
  }, 0);
  if (highestGPA >= 3.7) score += 10;
  else if (highestGPA >= 3.5) score += 5;
  
  const experienceCount = candidate.work_experiences?.length || 0;
  if (experienceCount >= 4) score += 10;
  else if (experienceCount >= 2) score += 5;
  
  const skillsCount = candidate.skills?.length || 0;
  if (skillsCount >= 10) score += 5;
  else if (skillsCount >= 5) score += 3;
  
  return Math.min(100, Math.max(0, score));
};


const formatSalary = (salaryObj) => {
  if (!salaryObj || !salaryObj['full-time']) return 'Not specified';
  const salary = salaryObj['full-time'].replace(/[$,]/g, '');
  return `$${parseInt(salary).toLocaleString()}`;
};

const extractPrimaryLocation = (location) => {
  if (!location) return 'Remote';
  return location.split(',')[0].trim();
};

const getLatestRole = (experiences) => {
  if (!experiences || experiences.length === 0) return null;
  return experiences[0]; // Assuming first is most recent
};

const getEducationSummary = (education) => {
  if (!education || !education.degrees || education.degrees.length === 0) {
    return 'Education not specified';
  }
  const degree = education.degrees[0];
  return `${degree.degree} in ${degree.subject || 'General Studies'}`;
};

const generateAvatar = (name) => {
  const names = name.split(' ');
  return names.map(n => n.charAt(0)).join('').toUpperCase();
};

const calculateExperience = (workExperiences) => {

  const roleCount = workExperiences?.length || 0;
  return Math.max(1, roleCount * 1.5); // Rough estimation
};

export const processCandidateData = (rawCandidate) => {
  const score = calculateScore(rawCandidate);
  
  return {
    ...rawCandidate,
    id: Math.random().toString(36).substr(2, 9),
    score,
    formattedSalary: formatSalary(rawCandidate.annual_salary_expectation),
    primaryLocation: extractPrimaryLocation(rawCandidate.location),
    latestRole: getLatestRole(rawCandidate.work_experiences),
    skillsArray: rawCandidate.skills || [],
    submittedDate: new Date(rawCandidate.submitted_at),
    educationSummary: getEducationSummary(rawCandidate.education),
    avatar: generateAvatar(rawCandidate.name),
    isTopTier: score >= 90,
    yearsExperience: calculateExperience(rawCandidate.work_experiences)
  };
};

export const loadCandidates = () => {
  try {
    return candidatesJson.map(processCandidateData);
  } catch (error) {
    console.error('Error loading candidates:', error);
    return [];
  }
};

export const filterCandidates = (candidates, filters) => {
  const { searchTerm, location, minScore, experienceLevel } = filters;
  
  return candidates.filter(candidate => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesName = candidate.name.toLowerCase().includes(searchLower);
      const matchesSkills = candidate.skillsArray.some(skill => 
        skill.toLowerCase().includes(searchLower)
      );
      const matchesCompany = candidate.work_experiences?.some(exp => 
        exp.company.toLowerCase().includes(searchLower)
      );
      
      if (!matchesName && !matchesSkills && !matchesCompany) return false;
    }
    
    if (location && !candidate.primaryLocation.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Score filter
    if (minScore && candidate.score < minScore) {
      return false;
    }
    
    // Experience level filter
    if (experienceLevel) {
      const years = candidate.yearsExperience;
      if (experienceLevel === 'senior' && years < 5) return false;
      if (experienceLevel === 'mid' && (years < 2 || years > 5)) return false;
      if (experienceLevel === 'junior' && years > 2) return false;
    }
    
    return true;
  });
};


export const sortCandidates = (candidates, sortBy, sortOrder = 'desc') => {
  const sorted = [...candidates].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'score':
        aValue = a.score;
        bValue = b.score;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'submitted_at':
        aValue = a.submittedDate;
        bValue = b.submittedDate;
        break;
      case 'salary':
        aValue = parseInt(a.formattedSalary.replace(/[$,]/g, '')) || 0;
        bValue = parseInt(b.formattedSalary.replace(/[$,]/g, '')) || 0;
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
  
  return sorted;
};