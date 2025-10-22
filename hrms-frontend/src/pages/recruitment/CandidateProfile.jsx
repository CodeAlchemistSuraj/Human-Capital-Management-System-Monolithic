// pages/recruitment/CandidateProfile.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiMail, FiCalendar, FiFileText, FiEdit, FiBell, FiLink,
  FiBriefcase, FiBookOpen, FiDollarSign, FiClock, FiMapPin, FiAward, FiInfo,
  FiUser, FiGlobe, FiPhone, FiHeart, FiGift, FiStar, FiClipboard
} from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { useAuthContext } from '../../context/AuthContext';

// Corrected API_BASE_URL based on user's input
const API_BASE_URL = 'http://localhost:8080/api/ats/candidates';

function CandidateProfile({ sidebarItems }) {
  const { id } = useParams();
  const { user, isLoading: authLoading, logout } = useAuthContext();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    interviewer: '',
    notes: '',
  });
  const [statusData, setStatusData] = useState('');
  const [interviewNotes, setInterviewNotes] = useState('');

  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        logout();
        return;
      }

      // Updated API call to use the corrected base URL
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to fetch candidate: ${response.status} ${response.statusText}`;
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
          setError('You do not have permission to view this candidate.');
          navigate('/recruitment');
          return;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Fetched candidate:", data);
      setCandidate({
        ...data,
        skills: data.skills || [],
        phoneNumber: data.phoneNumber || 'N/A',
        address: data.address || 'N/A',
        dateOfBirth: data.dateOfBirth || 'N/A',
        gender: data.gender || 'N/A',
        maritalStatus: data.maritalStatus || 'N/A',
        nationality: data.nationality || 'N/A',
        emergencyContactName: data.emergencyContactName || 'N/A',
        emergencyContactPhone: data.emergencyContactPhone || 'N/A',

        // Extended fields for a complete profile (assume these would be in DTO/backend)
        linkedinProfile: data.linkedinProfile || '',
        personalWebsite: data.personalWebsite || '',
        professionalSummary: data.professionalSummary || 'No summary provided.',
        education: data.education || [],
        workExperience: data.workExperience || [],
        languageProficiencies: data.languageProficiencies || [],
        certifications: data.certifications || [],
        projects: data.projects || [],
        salaryExpectations: data.salaryExpectations || { current: 'N/A', expected: 'N/A' },
        availability: data.availability || { noticePeriod: 'N/A', preferredStartDate: 'N/A' },
        references: data.references || 'Not provided',
        portfolio: data.portfolio || '',
        candidatePreferences: data.candidatePreferences || { location: 'N/A', remote: 'N/A', travel: 'N/A' },
        interviewNotes: data.interviewNotes || 'No notes yet.',
      });
      setStatusData(data.status || '');
      setInterviewNotes(data.interviewNotes || 'No notes yet.');
    } catch (err) {
      console.error('Error fetching candidate:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setError('Please log in to access candidate profiles.');
      navigate('/login');
      return;
    }
    if (user.role !== 'HR') {
      setError('You do not have permission to access candidate profiles.');
      navigate('/recruitment');
      return;
    }

    fetchCandidate();
  }, [authLoading, user, logout, navigate, id]);

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleStatusChange = (e) => {
    setStatusData(e.target.value);
  };

  const handleNotesChange = (e) => {
    setInterviewNotes(e.target.value);
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_BASE_URL}/${id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(scheduleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to schedule interview: ${errorData.message || response.statusText}`);
      }

      setIsScheduleModalOpen(false);
      setScheduleData({ date: '', time: '', interviewer: '', notes: '' });
      fetchCandidate();
    } catch (err) {
      setError(`Failed to schedule interview: ${err.message}`);
      console.error('Error scheduling interview:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...candidate, status: statusData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update status: ${errorData.message || response.statusText}`);
      }

      setIsStatusModalOpen(false);
      fetchCandidate();
    } catch (err) {
      setError(`Failed to update status: ${err.message}`);
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_BASE_URL}/${id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ interviewNotes: interviewNotes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update notes: ${errorData.message || response.statusText}`);
      }

      setIsNotesModalOpen(false);
      fetchCandidate();
    } catch (err) {
      setError(`Failed to update notes: ${err.message}`);
      console.error('Error updating notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const emailData = {
        recipientEmail: candidate.email,
        subject: `Update Regarding Your Application for ${candidate.jobTitle}`,
        body: `Dear ${candidate.firstName} ${candidate.lastName},\n\nWe have an update regarding your application for the ${candidate.jobTitle} position. Your current status is: ${candidate.status}.\n\nThank you for your patience.\n\nSincerely,\n[Your Company Name] HR Team`,
      };

      const response = await fetch(`${API_BASE_URL}/${id}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send email: ${errorData.message || response.statusText}`);
      }

      console.log(`Email sent to candidate ${id}`);
    } catch (err) {
      setError(`Failed to send email: ${err.message}`);
      console.error('Error sending email:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = () => {
    if (candidate?.resumePath) {
      window.open(candidate.resumePath, '_blank');
    } else {
      setError('No resume available for this candidate.');
    }
  };

  const handleNotifyCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_BASE_URL}/${id}/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: `Notification for ${candidate.firstName} ${candidate.lastName} regarding ${candidate.jobTitle}: Your application status is ${candidate.status}.` }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to notify candidate: ${errorData.message || response.statusText}`);
      }

      console.log(`Notification sent to candidate ${id}`);
    } catch (err) {
      setError(`Failed to notify candidate: ${err.message}`);
      console.error('Error notifying candidate:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsScheduleModalOpen(false);
    setIsStatusModalOpen(false);
    setIsNotesModalOpen(false);
    setError(null);
  };

  const calculateProfileCompleteness = () => {
    if (!candidate) return 0;
    let completedFields = 0;
    const totalFields = 16;

    if (candidate.firstName && candidate.lastName) completedFields++;
    if (candidate.email !== 'N/A') completedFields++;
    if (candidate.phoneNumber !== 'N/A') completedFields++;
    if (candidate.address !== 'N/A') completedFields++;
    if (candidate.professionalSummary && candidate.professionalSummary !== 'No summary provided.') completedFields++;
    if (candidate.skills.length > 0) completedFields++;
    if (candidate.workExperience.length > 0) completedFields++;
    if (candidate.education.length > 0) completedFields++;
    if (candidate.languageProficiencies.length > 0) completedFields++;
    if (candidate.certifications.length > 0) completedFields++;
    if (candidate.projects.length > 0) completedFields++;
    if (candidate.salaryExpectations.current !== 'N/A' || candidate.salaryExpectations.expected !== 'N/A') completedFields++;
    if (candidate.availability.noticePeriod !== 'N/A' || candidate.availability.preferredStartDate !== 'N/A') completedFields++;
    if (candidate.linkedinProfile) completedFields++;
    if (candidate.portfolio) completedFields++;
    if (candidate.interviewNotes !== 'No notes yet.') completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const profileCompleteness = candidate ? calculateProfileCompleteness() : 0;


  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Candidate Profile"
      gradient="from-blue-600 to-blue-400"
      className="min-h-screen"
    >
      <div className="hr-dashboard-container p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <FiArrowLeft size={16} className="mr-2" /> Back to Candidates
        </button>

        <DashboardCard
          title="Candidate Profile"
          icon={FiFileText}
          headerColorClass="header-blue-gradient"
          className="rounded-lg shadow-sm bg-white"
        >
          <div className="card-body p-4">
            {loading && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#60a5fa]"></div>
                <p className="ml-3 text-[#1e3b61] text-base">Loading candidate details...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-base">
                <strong className="font-medium">Error!</strong> {error}
              </div>
            )}
            {!loading && !error && candidate && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    {candidate.firstName} {candidate.lastName}
                    {candidate.jobTitle && (
                      <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        {candidate.jobTitle}
                      </span>
                    )}
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                      <FiInfo size={16} className="mr-2 text-gray-600" />Profile Completeness
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${profileCompleteness}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{profileCompleteness}% Complete</p>
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 mb-6">
                    <p className="text-sm flex items-center">
                      <FiMail size={14} className="mr-2 text-gray-500" />
                      <strong>Email:</strong> <span className="ml-1 text-blue-600 hover:underline">{candidate.email}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiPhone size={14} className="mr-2 text-gray-500" />
                      <strong>Phone:</strong> <span className="ml-1">{candidate.phoneNumber}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiMapPin size={14} className="mr-2 text-gray-500" />
                      <strong>Address:</strong> <span className="ml-1">{candidate.address}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiCalendar size={14} className="mr-2 text-gray-500" />
                      <strong>Application Date:</strong> <span className="ml-1">{candidate.applicationDate}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiEdit size={14} className="mr-2 text-gray-500" />
                      <strong>Status:</strong>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full
                        ${candidate.status === 'NEW' ? 'bg-green-100 text-green-800' :
                            candidate.status === 'INTERVIEWING' ? 'bg-blue-100 text-blue-800' :
                              candidate.status === 'OFFERED' ? 'bg-yellow-100 text-yellow-800' :
                                candidate.status === 'HIRED' ? 'bg-purple-100 text-purple-800' :
                                  'bg-red-100 text-red-800'}`}
                      >
                        {candidate.status}
                      </span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiGlobe size={14} className="mr-2 text-gray-500" />
                      <strong>Nationality:</strong> <span className="ml-1">{candidate.nationality}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiUser size={14} className="mr-2 text-gray-500" />
                      <strong>Gender:</strong> <span className="ml-1">{candidate.gender}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiHeart size={14} className="mr-2 text-gray-500" />
                      <strong>Marital Status:</strong> <span className="ml-1">{candidate.maritalStatus}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiCalendar size={14} className="mr-2 text-gray-500" />
                      <strong>Date of Birth:</strong> <span className="ml-1">{candidate.dateOfBirth}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <FiBell size={14} className="mr-2 text-gray-500" />
                      <strong>Emergency Contact:</strong> <span className="ml-1">{candidate.emergencyContactName} ({candidate.emergencyContactPhone})</span>
                    </p>
                    {candidate.linkedinProfile && (
                      <p className="text-sm flex items-center">
                        <FiLink size={14} className="mr-2 text-gray-500" />
                        <strong>LinkedIn:</strong> <a href={candidate.linkedinProfile} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">Profile</a>
                      </p>
                    )}
                    {candidate.personalWebsite && (
                      <p className="text-sm flex items-center">
                        <FiLink size={14} className="mr-2 text-gray-500" />
                        <strong>Website:</strong> <a href={candidate.personalWebsite} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">Website</a>
                      </p>
                    )}
                  </div>

                  {candidate.professionalSummary && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                        <FiFileText size={16} className="mr-2 text-gray-600" />Professional Summary
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{candidate.professionalSummary}</p>
                    </div>
                  )}

                  {candidate.skills.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                        <FiAward size={16} className="mr-2 text-gray-600" />Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {candidate.languageProficiencies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                        <FiGlobe size={16} className="mr-2 text-gray-600" />Language Proficiencies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.languageProficiencies.map((lang, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {candidate.workExperience.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                        <FiBriefcase size={16} className="mr-2 text-gray-600" />Work Experience
                      </h4>
                      <div className="space-y-4">
                        {candidate.workExperience.map((job, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-3">
                            <p className="font-semibold text-gray-800 text-sm">{job.jobTitle} at {job.companyName}</p>
                            <p className="text-xs text-gray-600 mb-1">{job.startDate} - {job.endDate || 'Present'}</p>
                            {job.responsibilities && job.responsibilities.length > 0 && (
                              <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                                {job.responsibilities.map((resp, i) => (
                                  <li key={i}>{resp}</li>
                                ))}
                              </ul>
                            )}
                            {job.achievements && job.achievements.length > 0 && (
                              <p className="text-xs text-gray-600 mt-1">Achievements: {job.achievements.join(', ')}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {candidate.education.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                        <FiBookOpen size={16} className="mr-2 text-gray-600" />Educational Details
                      </h4>
                      <div className="space-y-4">
                        {candidate.education.map((edu, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-3">
                            <p className="font-semibold text-gray-800 text-sm">{edu.degree} from {edu.institution}</p>
                            <p className="text-xs text-gray-600">{edu.graduationYear}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {candidate.certifications.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                        <FiAward size={16} className="mr-2 text-gray-600" />Certifications & Courses
                      </h4>
                      <div className="space-y-2">
                        {candidate.certifications.map((cert, index) => (
                          <p key={index} className="text-sm text-gray-700 flex items-center">
                            <FiStar size={14} className="mr-2 text-gray-500" />{cert.name} ({cert.issuingBody}, {cert.year})
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {candidate.projects.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                        <FiClipboard size={16} className="mr-2 text-gray-600" />Projects
                      </h4>
                      <div className="space-y-4">
                        {candidate.projects.map((project, index) => (
                          <div key={index} className="border-l-4 border-yellow-500 pl-3">
                            <p className="font-semibold text-gray-800 text-sm">{project.name}</p>
                            <p className="text-xs text-gray-600 mb-1">Technologies: {project.technologies.join(', ')}</p>
                            <p className="text-xs text-gray-700">{project.description}</p>
                            <p className="text-xs text-gray-600 mt-1">Outcome: {project.outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                      <FiEdit size={16} className="mr-2 text-gray-600" />Interview Notes
                    </h4>
                    <div className="relative p-3 bg-gray-50 rounded-md border border-gray-200 min-h-[80px]">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{candidate.interviewNotes}</p>
                      <button
                        onClick={() => setIsNotesModalOpen(true)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600"
                        title="Edit Notes"
                      >
                        <FiEdit size={16} />
                      </button>
                    </div>
                  </div>

                </div>

                <div className="lg:col-span-1 space-y-6">
                  <DashboardCard title="HR Actions" icon={FiBell} headerColorClass="header-blue-gradient">
                    <div className="p-4 space-y-3">
                      <button
                        onClick={() => setIsStatusModalOpen(true)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiEdit size={16} className="mr-2" /> Update Status
                      </button>
                      <button
                        onClick={() => setIsScheduleModalOpen(true)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FiCalendar size={16} className="mr-2" /> Schedule Interview
                      </button>
                      <button
                        onClick={handleSendEmail}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiMail size={16} className="mr-2" /> Send Email
                      </button>
                      <button
                        onClick={handleViewResume}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiFileText size={16} className="mr-2" /> View Resume
                      </button>
                      <button
                        onClick={handleNotifyCandidate}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiBell size={16} className="mr-2" /> Notify Candidate
                      </button>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Salary & Availability" icon={FiDollarSign} headerColorClass="header-blue-gradient">
                    <div className="p-4 space-y-3 text-sm text-gray-700">
                      <p className="flex items-center">
                        <FiDollarSign size={14} className="mr-2 text-gray-500" />
                        <strong>Current/Last Salary:</strong> {candidate.salaryExpectations.current}
                      </p>
                      <p className="flex items-center">
                        <FiDollarSign size={14} className="mr-2 text-gray-500" />
                        <strong>Expected Salary:</strong> {candidate.salaryExpectations.expected}
                      </p>
                      <p className="flex items-center">
                        <FiClock size={14} className="mr-2 text-gray-500" />
                        <strong>Notice Period:</strong> {candidate.availability.noticePeriod}
                      </p>
                      <p className="flex items-center">
                        <FiCalendar size={14} className="mr-2 text-gray-500" />
                        <strong>Preferred Start Date:</strong> {candidate.availability.preferredStartDate}
                      </p>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Additional Information" icon={FiInfo} headerColorClass="header-blue-gradient">
                    <div className="p-4 space-y-3 text-sm text-gray-700">
                      <p className="flex items-start">
                        <FiUser size={14} className="mr-2 text-gray-500 mt-1" />
                        <strong>References:</strong> {candidate.references}
                      </p>
                      {candidate.portfolio && (
                        <p className="flex items-center">
                          <FiLink size={14} className="mr-2 text-gray-500" />
                          <strong>Portfolio/Samples:</strong> <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">View Portfolio</a>
                        </p>
                      )}
                      <p className="flex items-start">
                        <FiMapPin size={14} className="mr-2 text-gray-500 mt-1" />
                        <strong>Preferences:</strong>
                        <span className="ml-1">
                          Location: {candidate.candidatePreferences.location}, Remote: {candidate.candidatePreferences.remote}, Travel: {candidate.candidatePreferences.travel}
                        </span>
                      </p>
                    </div>
                  </DashboardCard>

                </div>
              </div>
            )}
          </div>
        </DashboardCard>

        <Transition appear show={isScheduleModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                    >
                      <FiCalendar className="mr-2" /> Schedule Interview
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Set up a new interview for {candidate?.firstName} {candidate?.lastName}.
                      </p>
                    </div>

                    <form onSubmit={handleSaveSchedule} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={scheduleData.date}
                          onChange={handleScheduleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          value={scheduleData.time}
                          onChange={handleScheduleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="e.g., John Doe (Hiring Manager)"
                        />
                      </div>
                      <div>
                        <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700">Interviewer</label>
                        <input
                          type="text"
                          name="interviewer"
                          id="interviewer"
                          value={scheduleData.interviewer}
                          onChange={handleScheduleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          name="notes"
                          id="notes"
                          value={scheduleData.notes}
                          onChange={handleScheduleInputChange}
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Any specific instructions or agenda points for the interview."
                        ></textarea>
                      </div>

                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
                          <strong className="font-medium">Error:</strong> {error}
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex items-center px-4 py-2 bg-[#1e3b61] text-white rounded-md hover:bg-[#2a4b8c] text-sm"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <FiCalendar className="mr-2" size={16} />
                          )}
                          Schedule
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={isStatusModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                    >
                      <FiEdit className="mr-2" /> Update Candidate Status
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Change the application status for {candidate?.firstName} {candidate?.lastName}.
                      </p>
                    </div>

                    <form onSubmit={handleUpdateStatus} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          id="status"
                          name="status"
                          value={statusData}
                          onChange={handleStatusChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a status</option>
                          <option value="NEW">New</option>
                          <option value="INTERVIEWING">Interviewing</option>
                          <option value="OFFERED">Offered</option>
                          <option value="HIRED">Hired</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </div>

                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
                          <strong className="font-medium">Error:</strong> {error}
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex items-center px-4 py-2 bg-[#1e3b61] text-white rounded-md hover:bg-[#2a4b8c] text-sm"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <FiEdit className="mr-2" size={16} />
                          )}
                          Update
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={isNotesModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                    >
                      <FiEdit className="mr-2" /> Edit Interview Notes
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Add or update internal notes for {candidate?.firstName} {candidate?.lastName}.
                      </p>
                    </div>

                    <form onSubmit={handleSaveNotes} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="interviewNotes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          name="interviewNotes"
                          id="interviewNotes"
                          value={interviewNotes}
                          onChange={handleNotesChange}
                          rows="6"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Add your interview notes here..."
                        ></textarea>
                      </div>

                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
                          <strong className="font-medium">Error:</strong> {error}
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex items-center px-4 py-2 bg-[#1e3b61] text-white rounded-md hover:bg-[#2a4b8c] text-sm"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <FiEdit className="mr-2" size={16} />
                          )}
                          Save Notes
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

      </div>
    </DashboardLayout>
  );
}

export default CandidateProfile;