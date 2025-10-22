import React, { useState, useEffect, Fragment } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import StatsCard from '../../components/shared/StatsCard';
import { FiUserPlus, FiBriefcase, FiCalendar, FiEdit, FiTrash2, FiSend, FiSearch, FiDownload, FiFilter, FiPlus, FiX, FiEye, FiCheckSquare, FiBell, FiBarChart2, FiUpload, FiShare2, FiUserCheck, FiRefreshCw, FiMail, FiFileText, FiStar } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import JobRecommendationCard from './JobRecommendationCard';

const API_BASE_URL = 'http://localhost:8080/api/job-requisitions';

function Recruitment({ sidebarItems }) {
  const { user, isLoading: authLoading, logout } = useAuthContext();
  const navigate = useNavigate();

  const [jobRequisitions, setJobRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [currentJobRequisition, setCurrentJobRequisition] = useState(null);
  const [selectedRequisitions, setSelectedRequisitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [formData, setFormData] = useState({
    requisitionCode: '',
    jobTitle: '',
    department: '',
    description: '',
    status: 'OPEN',
    numberOfPositions: 1,
    postedDate: new Date().toISOString().split('T')[0],
    closingDate: '',
    hiringManager: '',
    location: '',
    priority: 'MEDIUM',
    salaryRange: '',
    jobType: 'FULL_TIME',
    applicationStatus: 'APPLIED',
    interviewStatus: 'NOT_SCHEDULED',
    onboardingStatus: 'PENDING',
  });
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    interviewer: '',
    notes: '',
  });
  const [dateFilter, setDateFilter] = useState('');

  const [recommendedCandidates, setRecommendedCandidates] = useState([]);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [recommendationError, setRecommendationError] = useState(null);


const fetchJobRequisitions = async () => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in.');
    }

    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to fetch job requisitions: ${response.status} ${response.statusText}`;
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
        setError('You do not have permission to view job requisitions.');
        navigate('/');
        return;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    setJobRequisitions(data);
    // Fetch recommended candidates for the first open job requisition
    if (data.length > 0) {
      const openJob = data.find(req => req.status === 'OPEN') || data[0];
      fetchRecommendedCandidates(openJob.id);
    }
  } catch (err) {
    console.error("Error fetching job requisitions:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const fetchRecommendedCandidates = async (jobId) => {
  setRecommendationLoading(true);
  setRecommendationError(null);
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token not found. Please log in.');

    const response = await fetch(`http://localhost:8080/api/recommendations/candidates-for-job/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch recommendations: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched recommended candidates:", data); // Debug log
    // Map backend data to expected frontend structure
    const mappedData = data.map(candidate => ({
      id: candidate.id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      jobTitle: candidate.jobTitle || 'N/A',
      email: candidate.email,
      applicationDate: candidate.applicationDate || new Date().toISOString().split('T')[0],
      status: candidate.status || 'NEW',
      resumePath: candidate.resumePath || null,
      skills: candidate.skills || [], // Ensure skills is an array
      matchScore: candidate.matchScore || null, // Include matchScore if provided
    }));
    setRecommendedCandidates(mappedData);
  } catch (err) {
    setRecommendationError(err.message);
    console.error('Error fetching recommended candidates:', err);
  } finally {
    setRecommendationLoading(false);
  }
};


  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setError('Please log in to access recruitment management.');
      navigate('/login');
      return;
    }
    if (user.role !== 'HR') {
      setError('You do not have permission to access recruitment management.');
      navigate('/');
      return;
    }

    fetchJobRequisitions();
  }, [authLoading, user, logout, navigate]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleCreateEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const method = currentJobRequisition ? 'PUT' : 'POST';
    const url = currentJobRequisition ? `${API_BASE_URL}/${currentJobRequisition.id}` : API_BASE_URL;
    const payload = {
      ...formData,
      postedDate: formData.postedDate || new Date().toISOString().split('T')[0],
      closingDate: formData.closingDate || null,
      numberOfPositions: parseInt(formData.numberOfPositions, 10),
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`);
      }
      closeModal();
      await fetchJobRequisitions();
    } catch (err) {
      setError(`Failed to ${currentJobRequisition ? 'update' : 'create'} job requisition: ${err.message}`);
      console.error(`Error ${currentJobRequisition ? 'updating' : 'creating'} job requisition:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJobRequisition = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');
      const response = await fetch(`${API_BASE_URL}/${currentJobRequisition.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      closeModal();
      await fetchJobRequisitions();
    } catch (err) {
      setError(`Failed to delete job requisition: ${err.message}`);
      console.error('Error deleting job requisition:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');
      await Promise.all(
        selectedRequisitions.map((id) =>
          fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
          }).then((response) => {
            if (!response.ok) throw new Error(`Failed to delete requisition ${id}`);
          })
        )
      );
      setSelectedRequisitions([]);
      await fetchJobRequisitions();
    } catch (err) {
      setError(`Failed to delete selected requisitions: ${err.message}`);
      console.error('Error deleting requisitions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostToExternalPlatform = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');
      const response = await fetch(`${API_BASE_URL}/${id}/post-external`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      console.log('Job posted to external platform successfully!');
      await fetchJobRequisitions();
    } catch (err) {
      setError(`Failed to post job to external platform: ${err.message}`);
      console.error('Error posting job:', err);
    } finally {
      setLoading(false);
    }
  };

const handleViewApplicants = (id) => {
  fetchRecommendedCandidates(id); // Fetch recommended candidates for the selected job
  navigate(`/job/${id}/applicants`);
};

const handleScheduleInterview = (id) => {
  setCurrentJobRequisition(jobRequisitions.find(req => req.id === id));
  setScheduleData({ candidateId: null, date: '', time: '', interviewer: '', notes: '' });
  setIsScheduleModalOpen(true);
};

const handleSaveSchedule = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token not found.');
    if (!scheduleData.candidateId) throw new Error('Please select a candidate.');

    const response = await fetch(`${SCHEDULE_API}/${scheduleData.candidateId}/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: scheduleData.date,
        time: scheduleData.time,
        interviewer: scheduleData.interviewer,
        notes: scheduleData.notes,
        jobId: currentJobRequisition.id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to schedule interview: ${errorData.message || response.statusText}`);
    }

    setIsScheduleModalOpen(false);
    setScheduleData({ candidateId: null, date: '', time: '', interviewer: '', notes: '' });
    fetchJobRequisitions();
  } catch (err) {
    setError(`Failed to schedule interview: ${err.message}`);
    console.error('Error scheduling interview:', err);
  } finally {
    setLoading(false);
  }
};

  const handleResumeManagement = (id) => {
    console.log(`Manage resumes for requisition ID ${id} (to be implemented later).`);
  };

  const handlePromoteOnSocialMedia = (id) => {
    console.log(`Promote job ID ${id} on social media (to be implemented later).`);
  };

  const handleSendEmail = (id) => {
    console.log(`Sending email to candidates for requisition ID ${id} (to be implemented later).`);
  };

  const handleOnboarding = (id) => {
    console.log(`Initiate onboarding for requisition ID ${id} (to be implemented later).`);
  };

  const handleApproveRequisition = (id) => {
    console.log(`Approve requisition ID ${id} (to be implemented later).`);
  };

  const handleNotifyCandidates = (id) => {
    console.log(`Notify candidates for requisition ID ${id} (to be implemented later).`);
  };

  const handleGenerateReport = () => {
    console.log('Generate hiring report (to be implemented later).');
  };

  const handleExportCSV = () => {
    console.log('Export to CSV (to be implemented later).');
  };

  const handleExportPDF = () => {
    console.log('Export to PDF (to be implemented later).');
  };

  const handleRefreshData = () => {
    fetchJobRequisitions();
  };

  const openCreateModal = () => {
    setCurrentJobRequisition(null);
    setFormData({
      requisitionCode: '',
      jobTitle: '',
      department: '',
      description: '',
      status: 'OPEN',
      numberOfPositions: 1,
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: '',
      hiringManager: '',
      location: '',
      priority: 'MEDIUM',
      salaryRange: '',
      jobType: 'FULL_TIME',
      applicationStatus: 'APPLIED',
      interviewStatus: 'NOT_SCHEDULED',
      onboardingStatus: 'PENDING',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (jobRequisition) => {
    setCurrentJobRequisition(jobRequisition);
    setFormData({
      requisitionCode: jobRequisition.requisitionCode,
      jobTitle: jobRequisition.jobTitle,
      department: jobRequisition.department,
      description: jobRequisition.description,
      status: jobRequisition.status,
      numberOfPositions: jobRequisition.numberOfPositions,
      postedDate: jobRequisition.postedDate,
      closingDate: jobRequisition.closingDate,
      hiringManager: jobRequisition.hiringManager,
      location: jobRequisition.location,
      priority: jobRequisition.priority || 'MEDIUM',
      salaryRange: jobRequisition.salaryRange || '',
      jobType: jobRequisition.jobType || 'FULL_TIME',
      applicationStatus: jobRequisition.applicationStatus || 'APPLIED',
      interviewStatus: jobRequisition.interviewStatus || 'NOT_SCHEDULED',
      onboardingStatus: jobRequisition.onboardingStatus || 'PENDING',
    });
    setIsModalOpen(true);
  };

  const openConfirmDeleteModal = (jobRequisition) => {
    setCurrentJobRequisition(jobRequisition);
    setIsConfirmDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsConfirmDeleteModalOpen(false);
    setIsScheduleModalOpen(false);
    setCurrentJobRequisition(null);
    setError(null);
  };

  const handleSelectRequisition = (id) => {
    setSelectedRequisitions((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequisitions.length === filteredRequisitions.length && filteredRequisitions.length > 0) {
      setSelectedRequisitions([]);
    } else {
      setSelectedRequisitions(filteredRequisitions.map((req) => req.id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-red-100 text-red-800';
      case 'FILLED': return 'bg-blue-100 text-blue-800';
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'PENDING_APPROVAL': return 'bg-yellow-100 text-yellow-800';
      case 'ON_HOLD': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequisitions = jobRequisitions.filter((req) =>
    (statusFilter === 'ALL' || req.status === statusFilter) &&
    (req.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
     req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
     req.requisitionCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!dateFilter || new Date(req.postedDate).toISOString().split('T')[0] === dateFilter)
  );

  const handleRecommendedCandidateClick = (candidate) => {
    // console.log("Viewing recommended candidate profile:", candidate);
    navigate(`/candidates/${candidate.id}`);
    // Here you would typically navigate to a candidate's full profile page
    // or open a modal with more candidate details.
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Recruitment Management"
      gradient="from-blue-600 to-blue-400"
      className="min-h-screen"
    >
      <div className="hr-dashboard-container p-4">
        {/* Welcome Banner */}
        <div className="welcome-banner mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="welcome-text mb-2 md:mb-0">
            <h1 className="welcome-title text-2xl font-semibold text-surface">Recruitment Management</h1>
            <p className="welcome-subtitle text-white">Manage job requisitions and hiring pipeline.</p>
          </div>
          <div className="welcome-actions">
            <button
              onClick={openCreateModal}
              className="dashboard-button primary flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-surface hover:bg-secondary"
            >
              <FiPlus size={18} className="mr-2" /> Create New Job Requisition
            </button>
          </div>
        </div>

        {/* Overview Stats - Using StatsCard for consistent sizing */}
        <div className="overview-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Open Positions"
            value={filteredRequisitions.filter(req => req.status === 'OPEN').length}
            color="border-blue-600"
            icon={FiBriefcase}
          />
          <StatsCard
            label="New Applicants Today"
            value={8}
            color="border-blue-600"
            icon={FiUserPlus}
          />
          <StatsCard
            label="Interviews Scheduled"
            value={12}
            color="border-blue-600"
            icon={FiCalendar}
          />
          <StatsCard
            label="Offers Extended"
            value={5}
            color="border-blue-600"
            icon={FiSend}
          />
        </div>

        {/* Main Content: Current Job Openings followed by Recommendations */}
        <div className="flex flex-col gap-6"> {/* Changed from grid to flex-col for stacking */}
          {/* Current Job Openings Card */}
<DashboardCard title="Current Job Openings" icon={FiBriefcase} headerColorClass="header-blue-gradient" className="rounded-lg shadow-sm bg-white"> {/* Removed h-full for better stacking */}
  <div className="card-body p-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={selectedRequisitions.length === filteredRequisitions.length && filteredRequisitions.length > 0}
          onChange={handleSelectAll}
          className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <span className="text-sm text-gray-600">Select All</span>
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="text"
            placeholder="Search by title, dept, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="FILLED">Filled</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
        </div>
        <div className="relative">
          <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          />
        </div>
      </div>
    </div>
    {loading && (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="ml-3 text-primary text-base">Loading job requisitions...</p>
      </div>
    )}
    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-base">
        <strong className="font-medium">Error!</strong> {error}
      </div>
    )}
    {!loading && !error && filteredRequisitions.length === 0 && (
      <div className="text-center text-gray-600 p-4">
        <p className="text-base font-medium">No job requisitions found.</p>
        <p className="mt-2 text-sm">Click "Create New Job Requisition" to add your first opening.</p>
      </div>
    )}
    {!loading && !error && filteredRequisitions.length > 0 && (
      <div className="overflow-y-auto max-h-[500px]"> {/* Fixed height with scroll */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Req. Code</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dept</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positions</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App. Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interview Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequisitions.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRequisitions.includes(req.id)}
                    onChange={() => handleSelectRequisition(req.id)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{req.requisitionCode}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.jobTitle}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.department}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.numberOfPositions}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.applicantCount || 0}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.applicationStatus || 'APPLIED'}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.interviewStatus || 'NOT_SCHEDULED'}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.onboardingStatus || 'PENDING'}</td>
                <td className="px-2 py-2 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusBadgeClass(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">{req.postedDate}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm font-medium flex flex-wrap justify-center items-center gap-0.5">
                  <button
                    onClick={() => openEditModal(req)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Edit"
                  >
                    <FiEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleViewApplicants(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="View Applicants"
                  >
                    <FiEye size={14} />
                  </button>
                  <button
                    onClick={() => handleScheduleInterview(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Schedule Interview"
                  >
                    <FiCalendar size={14} />
                  </button>
                  <button
                    onClick={() => handleResumeManagement(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Manage Resumes"
                  >
                    <FiUpload size={14} />
                  </button>
                  <button
                    onClick={() => handlePromoteOnSocialMedia(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Post on Social Media"
                  >
                    <FiShare2 size={14} />
                  </button>
                  <button
                    onClick={() => handleSendEmail(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Send Email"
                  >
                    <FiMail size={14} />
                  </button>
                  <button
                    onClick={() => handleOnboarding(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Manage Onboarding"
                  >
                    <FiUserCheck size={14} />
                  </button>
                  <button
                    onClick={() => handleApproveRequisition(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Approve"
                  >
                    <FiCheckSquare size={14} />
                  </button>
                  <button
                    onClick={() => handleNotifyCandidates(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Notify Candidates"
                  >
                    <FiBell size={14} />
                  </button>
                  <button
                    onClick={() => openConfirmDeleteModal(req)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={14} />
                  </button>
                  <button
                    onClick={() => handlePostToExternalPlatform(req.id)}
                    className="text-primary hover:text-secondary p-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Post Externally"
                  >
                    <FiSend size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  <div className="card-footer flex flex-wrap justify-end space-x-2 p-4 border-t border-gray-200">
    {selectedRequisitions.length > 0 && (
      <button
        onClick={handleBulkDelete}
        className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
      >
        <FiTrash2 size={16} className="mr-2" /> Delete Selected
      </button>
    )}
    <button
      onClick={handleRefreshData}
      className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-surface hover:bg-secondary"
    >
      <FiRefreshCw size={16} className="mr-2" /> Refresh Data
    </button>
    <button
      onClick={handleExportCSV}
      className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-surface hover:bg-secondary"
    >
      <FiDownload size={16} className="mr-2" /> Export CSV
    </button>
    <button
      onClick={handleExportPDF}
      className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-surface hover:bg-secondary"
    >
      <FiFileText size={16} className="mr-2" /> Export PDF
    </button>
    <button
      onClick={handleGenerateReport}
      className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-surface hover:bg-secondary"
    >
      <FiBarChart2 size={16} className="mr-2" /> Generate Report
    </button>
  </div>
</DashboardCard>

          {/* Recommended Candidates Card (now below Current Job Openings) */}
          <JobRecommendationCard
            recommendedCandidates={recommendedCandidates}
            loading={recommendationLoading}
            error={recommendationError}
            onCandidateClick={handleRecommendedCandidateClick}
          />
        </div>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1001]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
                  <Dialog.Title as="h3" className="text-xl font-bold text-primary mb-4 flex items-center border-b pb-2">
                    <FiPlus className="mr-2 text-primary" size={20} />
                    {currentJobRequisition ? 'Edit Job Requisition' : 'Create New Job Requisition'}
                  </Dialog.Title>
                  <form onSubmit={handleCreateEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="requisitionCode" className="block text-sm font-medium text-gray-700 mb-1">Req. Code</label>
                      <input
                        type="text"
                        name="requisitionCode"
                        id="requisitionCode"
                        value={formData.requisitionCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="numberOfPositions" className="block text-sm font-medium text-gray-700 mb-1">Positions</label>
                      <input
                        type="number"
                        name="numberOfPositions"
                        id="numberOfPositions"
                        value={formData.numberOfPositions}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        name="priority"
                        id="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                      <select
                        name="jobType"
                        id="jobType"
                        value={formData.jobType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      >
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="INTERNSHIP">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                      <input
                        type="text"
                        name="salaryRange"
                        id="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        placeholder="e.g., $50,000 - $70,000"
                      />
                    </div>
                    <div>
                      <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
                      <input
                        type="date"
                        name="postedDate"
                        id="postedDate"
                        value={formData.postedDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-1">Closing Date</label>
                      <input
                        type="date"
                        name="closingDate"
                        id="closingDate"
                        value={formData.closingDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
                      <input
                        type="text"
                        name="hiringManager"
                        id="hiringManager"
                        value={formData.hiringManager}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="applicationStatus" className="block text-sm font-medium text-gray-700 mb-1">App. Status</label>
                      <select
                        name="applicationStatus"
                        id="applicationStatus"
                        value={formData.applicationStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEWING">Interviewing</option>
                        <option value="OFFERED">Offered</option>
                        <option value="HIRED">Hired</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="interviewStatus" className="block text-sm font-medium text-gray-700 mb-1">Interview Status</label>
                      <select
                        name="interviewStatus"
                        id="interviewStatus"
                        value={formData.interviewStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      >
                        <option value="NOT_SCHEDULED">Not Scheduled</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="onboardingStatus" className="block text-sm font-medium text-gray-700 mb-1">Onboarding Status</label>
                      <select
                        name="onboardingStatus"
                        id="onboardingStatus"
                        value={formData.onboardingStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      ></textarea>
                    </div>
                    {error && (
                      <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
                        <strong className="font-medium">Error:</strong> {error}
                      </div>
                    )}
                    <div className="col-span-2 flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-primary"
                      >
                        <FiX className="mr-2" size={16} /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-primary text-surface rounded-md hover:bg-secondary focus:ring-primary text-sm"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-surface mr-2"></div>
                        ) : currentJobRequisition ? (
                          <FiEdit className="mr-2" size={16} />
                        ) : (
                          <FiPlus className="mr-2" size={16} />
                        )}
                        {currentJobRequisition ? 'Update Job' : 'Create Job'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isConfirmDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1001]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm bg-white p-6 rounded-lg shadow-xl">
                  <Dialog.Title as="h3" className="text-xl font-bold text-primary flex items-center border-b pb-2">
                    <FiTrash2 className="mr-2 text-red-600" size={20} /> Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      Are you sure you want to delete "<strong className="font-semibold">{currentJobRequisition?.jobTitle}</strong>"?
                      This action cannot be undone.
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-primary"
                      onClick={closeModal}
                    >
                      <FiX className="mr-2" size={16} /> Cancel
                    </button>
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-red-500 text-sm"
                      onClick={handleDeleteJobRequisition}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <FiTrash2 className="mr-2" size={16} />
                      )}
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isScheduleModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1001]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
                  <Dialog.Title as="h3" className="text-xl font-bold text-primary mb-4 flex items-center border-b pb-2">
                    <FiCalendar className="mr-2 text-primary" size={20} /> Schedule Interview
                  </Dialog.Title>
                  <form onSubmit={(e) => { e.preventDefault(); handleSaveSchedule(); }} className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={scheduleData.date}
                        onChange={handleScheduleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={scheduleData.time}
                        onChange={handleScheduleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                      <input
                        type="text"
                        name="interviewer"
                        id="interviewer"
                        value={scheduleData.interviewer}
                        onChange={handleScheduleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        name="notes"
                        id="notes"
                        value={scheduleData.notes}
                        onChange={handleScheduleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-primary"
                      >
                        <FiX className="mr-2" size={16} /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-primary text-surface rounded-md hover:bg-secondary focus:ring-primary text-sm"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-surface mr-2"></div>
                        ) : (
                          <FiCalendar className="mr-2" size={16} />
                        )}
                        Save Schedule
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </DashboardLayout>
  );
}

export default Recruitment;