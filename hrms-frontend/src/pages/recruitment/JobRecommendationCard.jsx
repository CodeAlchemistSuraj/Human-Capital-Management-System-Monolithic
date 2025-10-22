// components/recruitment/JobRecommendationCard.jsx
import React from 'react';
import { FiStar, FiEye } from 'react-icons/fi';
import DashboardCard from '../../components/shared/DashboardCard';

function JobRecommendationCard({ recommendedCandidates, loading, error, onCandidateClick }) {
  return (
    <DashboardCard
      title="Recommended Candidates"
      icon={FiStar}
      headerColorClass="header-green-gradient"
      className="rounded-lg shadow-sm bg-white h-full"
    >
      <div className="card-body p-4">
        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
            <p className="ml-2 text-gray-600 text-sm">Loading recommendations...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
            <strong className="font-medium">Error:</strong> {error}
          </div>
        )}
        {!loading && !error && recommendedCandidates.length === 0 && (
          <div className="text-center text-gray-600 p-4">
            <p className="text-sm font-medium">No candidate recommendations available.</p>
            <p className="mt-1 text-xs">Ensure job descriptions are detailed for better matches.</p>
          </div>
        )}
        {!loading && !error && recommendedCandidates.length > 0 && (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {recommendedCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {candidate.firstName} {candidate.lastName}
                  </h4>
                  <p className="text-xs text-gray-600">{candidate.jobTitle || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Skills: {candidate.skills?.join(', ') || 'N/A'}
                  </p>
                  {candidate.matchScore && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Match Score: {Math.round(candidate.matchScore * 100)}%
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {candidate.matchScore && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {Math.round(candidate.matchScore * 100)}% Match
                    </span>
                  )}
                  <button
                    onClick={() => onCandidateClick(candidate)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors"
                    title="View Profile"
                  >
                    <FiEye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default JobRecommendationCard;