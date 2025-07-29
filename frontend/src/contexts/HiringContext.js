import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { loadCandidates, filterCandidates, sortCandidates, processCandidateData } from '../data/candidatesData';

const HiringContext = createContext();

// Action types
const ACTIONS = {
  SET_CANDIDATES: 'SET_CANDIDATES',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTERS: 'SET_FILTERS',
  SET_SORT: 'SET_SORT',
  SET_VIEW: 'SET_VIEW',
  SELECT_CANDIDATE: 'SELECT_CANDIDATE',
  DESELECT_CANDIDATE: 'DESELECT_CANDIDATE',
  CLEAR_SELECTIONS: 'CLEAR_SELECTIONS',
  LOAD_FROM_FILE: 'LOAD_FROM_FILE'
};

// Initial state
const initialState = {
  allCandidates: [],
  selectedCandidates: [],
  searchTerm: '',
  filters: {
    location: '',
    minScore: 0,
    skills: [],
    experienceLevel: ''
  },
  sortBy: 'score',
  sortOrder: 'desc',
  view: 'cards', // 'cards' or 'table'
  isLoading: false,
  error: null
};

// Reducer
const hiringReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CANDIDATES:
      return {
        ...state,
        allCandidates: action.payload,
        isLoading: false,
        error: null
      };
    
    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder || state.sortOrder
      };
    
    case ACTIONS.SET_VIEW:
      return {
        ...state,
        view: action.payload
      };
    
    case ACTIONS.SELECT_CANDIDATE:
      if (state.selectedCandidates.length >= 5) return state;
      if (state.selectedCandidates.some(c => c.id === action.payload.id)) return state;
      return {
        ...state,
        selectedCandidates: [...state.selectedCandidates, action.payload]
      };
    
    case ACTIONS.DESELECT_CANDIDATE:
      return {
        ...state,
        selectedCandidates: state.selectedCandidates.filter(c => c.id !== action.payload)
      };
    
    case ACTIONS.CLEAR_SELECTIONS:
      return {
        ...state,
        selectedCandidates: []
      };
    
    case ACTIONS.LOAD_FROM_FILE:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    default:
      return state;
  }
};


export const HiringProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hiringReducer, initialState);
  
  React.useEffect(() => {
    const candidates = loadCandidates();
    dispatch({ type: ACTIONS.SET_CANDIDATES, payload: candidates });
  }, []);
  

  const processedCandidates = useMemo(() => {
    const filtered = filterCandidates(state.allCandidates, {
      searchTerm: state.searchTerm,
      ...state.filters
    });
    
    return sortCandidates(filtered, state.sortBy, state.sortOrder);
  }, [state.allCandidates, state.searchTerm, state.filters, state.sortBy, state.sortOrder]);
  
  // Actions
  const actions = {
    setSearchTerm: (term) => dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term }),
    setFilters: (filters) => dispatch({ type: ACTIONS.SET_FILTERS, payload: filters }),
    setSort: (sortBy, sortOrder) => dispatch({ type: ACTIONS.SET_SORT, payload: { sortBy, sortOrder } }),
    setView: (view) => dispatch({ type: ACTIONS.SET_VIEW, payload: view }),
    selectCandidate: (candidate) => dispatch({ type: ACTIONS.SELECT_CANDIDATE, payload: candidate }),
    deselectCandidate: (candidateId) => dispatch({ type: ACTIONS.DESELECT_CANDIDATE, payload: candidateId }),
    clearSelections: () => dispatch({ type: ACTIONS.CLEAR_SELECTIONS }),
    loadFromJSON: (jsonData) => {
      try {
        const processed = jsonData.map(processCandidateData);
        dispatch({ type: ACTIONS.SET_CANDIDATES, payload: processed });
      } catch (error) {
        console.error('Error processing JSON:', error);
      }
    }
  };
  
  const value = {
    ...state,
    candidates: processedCandidates,
    ...actions
  };
  
  return (
    <HiringContext.Provider value={value}>
      {children}
    </HiringContext.Provider>
  );
};

// Hook for using context
export const useHiring = () => {
  const context = useContext(HiringContext);
  if (!context) {
    throw new Error('useHiring must be used within a HiringProvider');
  }
  return context;
};

export { ACTIONS };