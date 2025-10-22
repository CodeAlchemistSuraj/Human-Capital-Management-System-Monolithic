// pages/recruitment/ApplicantsList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiCalendar, FiMail, FiFileText, FiBell } from 'react-icons/fi';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { useAuthContext } from '../../context/AuthContext';

const API_BASE_URL = 'http://localhost:8080/api/ats/candidates/job';

function ApplicantsList({ sidebarItems }) {
  const { id } = useParams(); // Job ID
  const { user, isLoading: authLoading, logout } = useAuthContext();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicants = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        logout();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to fetch applicants: ${response.status} ${response.statusText}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          logout();
          return;
        } else if (response.status === 403) {
          setError('You do not have permission to view applicants.');
          navigate('/recruitment');
          return;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Fetched applicants:", data); // Debug log
      // Map backend data to ensure skills is an array
      const mappedData = data.map(applicant => ({
        ...applicant,
        skills: applicant.skills || [], // Ensure skills is an array
      }));
      setApplicants(mappedData);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setError('Please log in to access applicants.');
      navigate('/login');
      return;
    }
    if (user.role !== 'HR') {
      setError('You do not have permission to access applicants.');
      navigate('/recruitment');
      return;
    }

    fetchApplicants();
  }, [authLoading, user, logout, navigate, id]);

  const handleViewProfile = (candidateId) => {
    navigate(`/candidates/${candidateId}`);
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Applicants List"
      gradient="from-blue-600 to-blue-400"
      className="min-h-screen"
    >
      <div className="hr-dashboard-container p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <FiArrowLeft size={16} className="mr-2" /> Back to Recruitment
        </button>

        <DashboardCard
          title={`Applicants for Job ID ${id}`}
          icon={FiFileText}
          headerColorClass="header-blue-gradient"
          className="rounded-lg shadow-sm bg-white"
        >
          <div className="card-body p-4">
            {loading && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#60a5fa]"></div>
                <p className="ml-3 text-[#1e3b61] text-base">Loading applicants...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-base">
                <strong className="font-medium">Error!</strong> {error}
              </div>
            )}
            {!loading && !error && applicants.length === 0 && (
              <div className="text-center text-gray-600 p-4">
                <p className="text-base font-medium">No applicants found for this job.</p>
              </div>
            )}
            {!loading && !error && applicants.length > 0 && (
              <div className="overflow-y-auto max-h-[500px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applicants.map((applicant) => (
                      <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {applicant.firstName} {applicant.lastName}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{applicant.email}</td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{applicant.jobTitle}</td>
                        <td className="px-2 py-2 text-sm text-gray-700">{applicant.skills.join(', ') || 'N/A'}</td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{applicant.applicationDate}</td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full 
                              ${applicant.status === 'NEW' ? 'bg-green-100 text-green-800' : 
                                applicant.status === 'INTERVIEWING' ? 'bg-blue-100 text-blue-800' : 
                                applicant.status === 'OFFERED' ? 'bg-yellow-100 text-yellow-800' : 
                                applicant.status === 'HIRED' ? 'bg-purple-100 text-purple-800' : 
                                'bg-red-100 text-red-800'}`}
                          >
                            {applicant.status}
                          </span>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm font-medium flex gap-1">
                          <button
                            onClick={() => handleViewProfile(applicant.id)}
                            className="text-[#60a5fa] hover:text-[#2a4b8c] p-1 rounded-md hover:bg-[#93c5fd]/20 transition-colors"
                            title="View Profile"
                          >
                            <FiEye size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}

export default ApplicantsList;