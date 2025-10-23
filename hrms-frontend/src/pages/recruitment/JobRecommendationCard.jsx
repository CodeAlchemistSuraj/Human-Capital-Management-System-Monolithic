import React from 'react';
import { FiStar, FiEye } from 'react-icons/fi';
import DashboardCard from '../../components/shared/DashboardCard';

function JobRecommendationCard({ recommendedCandidates, loading, error, onCandidateClick }) {
  return (
    <DashboardCard
      title="Recommended Candidates"
      icon={FiStar}
      className="professional-card h-full"
    >
      <div className="p-4">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p className="ml-2 text-text text-sm">Loading recommendations...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg mb-4">
            <strong className="font-medium">Error:</strong> {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recommendedCandidates.length === 0 && (
          <div className="text-center py-6">
            <FiStar className="mx-auto text-3xl text-text-light mb-2" />
            <p className="text-text font-medium text-sm">No candidate recommendations available</p>
            <p className="text-text-light text-xs mt-1">Ensure job descriptions are detailed for better matches</p>
          </div>
        )}

        {/* Candidate List */}
        {!loading && !error && recommendedCandidates.length > 0 && (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {recommendedCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-light/50 transition-colors cursor-pointer"
                onClick={() => onCandidateClick(candidate)}
              >
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold text-text">
                    {candidate.firstName} {candidate.lastName}
                  </h4>
                  <p className="text-xs text-text-light">{candidate.jobTitle || 'N/A'}</p>
                  <p className="text-xs text-text-light mt-1">
                    Skills: {candidate.skills?.join(', ') || 'N/A'}
                  </p>
                  {candidate.matchScore && (
                    <p className="text-xs text-text-light mt-1">
                      Match Score: {Math.round(candidate.matchScore * 100)}%
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {candidate.matchScore && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                      {Math.round(candidate.matchScore * 100)}%
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCandidateClick(candidate);
                    }}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/10 transition-colors"
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