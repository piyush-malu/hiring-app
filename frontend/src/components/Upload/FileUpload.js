import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useHiring } from '../../contexts/HiringContext';

const FileUpload = () => {
  const { loadFromJSON } = useHiring();
  
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/json') {
      alert('Please upload a JSON file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        if (Array.isArray(jsonData)) {
          loadFromJSON(jsonData);
        } else {
          alert('JSON file should contain an array of candidates');
        }
      } catch (error) {
        alert('Invalid JSON file format');
        console.error('JSON parsing error:', error);
      }
    };
    
    reader.readAsText(file);
  }, [loadFromJSON]);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="mb-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="block text-lg font-medium text-gray-900 mb-2">
              Upload Candidates JSON File
            </span>
            <span className="block text-sm text-gray-500 mb-4">
              Select a JSON file containing candidate data
            </span>
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept=".json"
            onChange={handleFileUpload}
          />
        </div>
        <button
          onClick={() => document.getElementById('file-upload').click()}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all duration-200"
        >
          <FileText className="mr-2 h-5 w-5" />
          Choose File
        </button>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div className="text-left">
              <h3 className="text-sm font-medium text-blue-800 mb-1">
                Expected JSON Format
              </h3>
              <div className="text-sm text-blue-700">
                <p>Upload a JSON file with an array of candidate objects.</p>
                <p className="mt-1">Each candidate should have: name, email, location, work_experiences, education, skills, etc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;