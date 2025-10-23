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
const SCHEDULE_API = 'http://localhost:8080/api/interviews';

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
      console.log("Fetched recommended candidates:", data);
      const mappedData = data.map(candidate => ({
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        jobTitle: candidate.jobTitle || 'N/A',
        email: candidate.email,
        applicationDate: candidate.applicationDate || new Date().toISOString().split('T')[0],
        status: candidate.status || 'NEW',
        resumePath: candidate.resumePath || null,
        skills: candidate.skills || [],
        matchScore: candidate.matchScore || null,
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
    fetchRecommendedCandidates(id);
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
    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Recruitment Management"
      gradient="from-blue-600 to-blue-400"
      className="min-h-screen"
    >
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="professional-card glass-card p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text">Recruitment Management</h1>
              <p className="text-text-light mt-1">Manage job requisitions and hiring pipeline</p>
            </div>
            <button
              onClick={openCreateModal}
              className="dashboard-button primary flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-surface hover:bg-secondary transition-colors"
            >
              <FiPlus size={18} className="mr-2" />
              Create New Job Requisition
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Open Positions"
            value={filteredRequisitions.filter(req => req.status === 'OPEN').length}
            color="border-primary"
            icon={FiBriefcase}
          />
          <StatsCard
            label="New Applicants Today"
            value={8}
            color="border-secondary"
            icon={FiUserPlus}
          />
          <StatsCard
            label="Interviews Scheduled"
            value={12}
            color="border-accent"
            icon={FiCalendar}
          />
          <StatsCard
            label="Offers Extended"
            value={5}
            color="border-success"
            icon={FiSend}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Job Openings - Takes 2/3 on large screens */}
          <div className="xl:col-span-2">
            {/* Current Job Openings Card */}
            {/* Current Job Openings Card */}
            <DashboardCard
              title="Current Job Openings"
              icon={FiBriefcase}
              className="professional-card h-full"
            >
              <div className="p-4 space-y-4">
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRequisitions.length === filteredRequisitions.length && filteredRequisitions.length > 0}
                      onChange={handleSelectAll}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <span className="text-sm text-text-light">Select All</span>
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                      />
                    </div>
                    <div className="relative flex-1">
                      <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                      >
                        <option value="ALL">All Status</option>
                        <option value="OPEN">Open</option>
                        <option value="CLOSED">Closed</option>
                        <option value="FILLED">Filled</option>
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING_APPROVAL">Pending Approval</option>
                        <option value="ON_HOLD">On Hold</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="ml-3 text-text">Loading job requisitions...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg">
                    <strong className="font-medium">Error!</strong> {error}
                  </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredRequisitions.length === 0 && (
                  <div className="text-center py-8">
                    <FiBriefcase className="mx-auto text-4xl text-text-light mb-3" />
                    <p className="text-text font-medium">No job openings found</p>
                    <p className="text-text-light text-sm mt-1">Create your first job opening to get started</p>
                  </div>
                )}

                {/* Job Cards Grid */}
                {!loading && !error && filteredRequisitions.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                    {filteredRequisitions.map((req) => (
                      <div
                        key={req.id}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-surface"
                      >
                        {/* Header Row */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3 flex-1">
                            <input
                              type="checkbox"
                              checked={selectedRequisitions.includes(req.id)}
                              onChange={() => handleSelectRequisition(req.id)}
                              className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="border border-border bg-light rounded-md px-3 py-1">
                                  <h3 className="font-semibold text-text text-sm">{req.jobTitle}</h3>
                                </div>
                                <div className={`border rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(req.status)} border-current`}>
                                  {req.status}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <div className="border border-border rounded-md px-2 py-1 bg-surface">
                                  <span className="flex items-center gap-1 text-xs text-text-light">
                                    <FiBriefcase size={12} />
                                    {req.department}
                                  </span>
                                </div>
                                <div className="border border-border rounded-md px-2 py-1 bg-surface">
                                  <span className="flex items-center gap-1 text-xs text-text-light">
                                    <FiUserPlus size={12} />
                                    {req.numberOfPositions} position{req.numberOfPositions > 1 ? 's' : ''}
                                  </span>
                                </div>
                                <div className="border border-border rounded-md px-2 py-1 bg-surface">
                                  <span className="flex items-center gap-1 text-xs text-text-light">
                                    <FiCalendar size={12} />
                                    {req.postedDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => openEditModal(req)}
                              className="text-primary hover:text-secondary p-1 rounded border border-transparent hover:border-primary/20 transition-colors"
                              title="Edit"
                            >
                              <FiEdit size={14} />
                            </button>
                            <button
                              onClick={() => openConfirmDeleteModal(req)}
                              className="text-error hover:text-error/80 p-1 rounded border border-transparent hover:border-error/20 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="grid grid-cols-3 gap-2 mb-3 p-2 border border-border rounded-lg bg-light">
                          <div className="text-center border-r border-border last:border-r-0">
                            <div className="border border-primary/20 rounded-md p-1 bg-primary/5">
                              <div className="text-lg font-bold text-primary">{req.applicantCount || 0}</div>
                            </div>
                            <div className="text-xs text-text-light mt-1">Applicants</div>
                          </div>
                          <div className="text-center border-r border-border last:border-r-0">
                            <div className={`border rounded-md p-1 ${req.interviewStatus === 'SCHEDULED' ? 'border-success/20 bg-success/5' : 'border-border bg-surface'}`}>
                              <div className={`text-lg font-bold ${req.interviewStatus === 'SCHEDULED' ? 'text-success' : 'text-text'}`}>
                                {req.interviewStatus === 'SCHEDULED' ? 'Yes' : 'No'}
                              </div>
                            </div>
                            <div className="text-xs text-text-light mt-1">Interviews</div>
                          </div>
                          <div className="text-center border-r border-border last:border-r-0">
                            <div className={`border rounded-md p-1 ${req.applicationStatus === 'HIRED' ? 'border-accent/20 bg-accent/5' : 'border-border bg-surface'}`}>
                              <div className={`text-lg font-bold ${req.applicationStatus === 'HIRED' ? 'text-accent' : 'text-text'}`}>
                                {req.applicationStatus === 'HIRED' ? 'Yes' : 'No'}
                              </div>
                            </div>
                            <div className="text-xs text-text-light mt-1">Hired</div>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-1 p-2 border border-border rounded-lg bg-light">
                          <button
                            onClick={() => handleViewApplicants(req.id)}
                            className="flex items-center px-2 py-1 text-xs border border-primary/20 bg-primary/5 text-primary rounded hover:bg-primary/10 transition-colors"
                          >
                            <FiEye size={12} className="mr-1" />
                            View Applicants
                          </button>
                          <button
                            onClick={() => handleScheduleInterview(req.id)}
                            className="flex items-center px-2 py-1 text-xs border border-secondary/20 bg-secondary/5 text-secondary rounded hover:bg-secondary/10 transition-colors"
                          >
                            <FiCalendar size={12} className="mr-1" />
                            Schedule
                          </button>
                          <button
                            onClick={() => handleSendEmail(req.id)}
                            className="flex items-center px-2 py-1 text-xs border border-accent/20 bg-accent/5 text-accent rounded hover:bg-accent/10 transition-colors"
                          >
                            <FiMail size={12} className="mr-1" />
                            Email
                          </button>
                          <button
                            onClick={() => handlePostToExternalPlatform(req.id)}
                            className="flex items-center px-2 py-1 text-xs border border-success/20 bg-success/5 text-success rounded hover:bg-success/10 transition-colors"
                          >
                            <FiShare2 size={12} className="mr-1" />
                            Post Job
                          </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-2 pt-2 border-t border-border">
                          <div className="flex flex-wrap gap-2 text-xs">
                            <div className="border border-border rounded-md px-2 py-1 bg-surface">
                              <span className="text-text-light">Req: </span>
                              <span className="font-medium text-text">{req.requisitionCode}</span>
                            </div>
                            <div className="border border-border rounded-md px-2 py-1 bg-surface">
                              <span className="text-text-light">Manager: </span>
                              <span className="font-medium text-text">{req.hiringManager}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bulk Actions */}
                {selectedRequisitions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    <button
                      onClick={handleBulkDelete}
                      className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-error text-surface hover:bg-error/90 transition-colors border border-error/20"
                    >
                      <FiTrash2 size={14} className="mr-2" />
                      Delete Selected ({selectedRequisitions.length})
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-primary text-surface hover:bg-secondary transition-colors border border-primary/20"
                    >
                      <FiDownload size={14} className="mr-2" />
                      Export CSV
                    </button>
                  </div>
                )}

                {/* General Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <button
                    onClick={handleRefreshData}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-primary text-surface hover:bg-secondary transition-colors border border-primary/20"
                  >
                    <FiRefreshCw size={14} className="mr-2" />
                    Refresh
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-primary text-surface hover:bg-secondary transition-colors border border-primary/20"
                  >
                    <FiBarChart2 size={14} className="mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Recommended Candidates - Takes 1/3 on large screens */}
          <div className="xl:col-span-1">
            <JobRecommendationCard
              recommendedCandidates={recommendedCandidates}
              loading={recommendationLoading}
              error={recommendationError}
              onCandidateClick={handleRecommendedCandidateClick}
            />
          </div>
        </div>
      </div>

      {/* Create/Edit Job Requisition Modal */}
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
            <div className="fixed inset-0 bg-dark bg-opacity-40" />
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
                <Dialog.Panel className="w-full max-w-3xl professional-card p-6">
                  <Dialog.Title as="h3" className="text-xl font-bold text-text mb-4 flex items-center border-b border-border pb-3">
                    <FiPlus className="mr-2 text-primary" size={20} />
                    {currentJobRequisition ? 'Edit Job Requisition' : 'Create New Job Requisition'}
                  </Dialog.Title>
                  <form onSubmit={handleCreateEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="requisitionCode" className="block text-sm font-medium text-text mb-1">Req. Code</label>
                      <input
                        type="text"
                        name="requisitionCode"
                        id="requisitionCode"
                        value={formData.requisitionCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-text mb-1">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-text mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="numberOfPositions" className="block text-sm font-medium text-text mb-1">Positions</label>
                      <input
                        type="number"
                        name="numberOfPositions"
                        id="numberOfPositions"
                        value={formData.numberOfPositions}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-text mb-1">Priority</label>
                      <select
                        name="priority"
                        id="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="jobType" className="block text-sm font-medium text-text mb-1">Job Type</label>
                      <select
                        name="jobType"
                        id="jobType"
                        value={formData.jobType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      >
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="INTERNSHIP">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="salaryRange" className="block text-sm font-medium text-text mb-1">Salary Range</label>
                      <input
                        type="text"
                        name="salaryRange"
                        id="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        placeholder="e.g., $50,000 - $70,000"
                      />
                    </div>
                    <div>
                      <label htmlFor="postedDate" className="block text-sm font-medium text-text mb-1">Posted Date</label>
                      <input
                        type="date"
                        name="postedDate"
                        id="postedDate"
                        value={formData.postedDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="closingDate" className="block text-sm font-medium text-text mb-1">Closing Date</label>
                      <input
                        type="date"
                        name="closingDate"
                        id="closingDate"
                        value={formData.closingDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                      />
                    </div>
                    <div>
                      <label htmlFor="hiringManager" className="block text-sm font-medium text-text mb-1">Hiring Manager</label>
                      <input
                        type="text"
                        name="hiringManager"
                        id="hiringManager"
                        value={formData.hiringManager}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-text mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="applicationStatus" className="block text-sm font-medium text-text mb-1">App. Status</label>
                      <select
                        name="applicationStatus"
                        id="applicationStatus"
                        value={formData.applicationStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
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
                      <label htmlFor="interviewStatus" className="block text-sm font-medium text-text mb-1">Interview Status</label>
                      <select
                        name="interviewStatus"
                        id="interviewStatus"
                        value={formData.interviewStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      >
                        <option value="NOT_SCHEDULED">Not Scheduled</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="onboardingStatus" className="block text-sm font-medium text-text mb-1">Onboarding Status</label>
                      <select
                        name="onboardingStatus"
                        id="onboardingStatus"
                        value={formData.onboardingStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-text mb-1">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      ></textarea>
                    </div>
                    {error && (
                      <div className="col-span-2 bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg">
                        <strong className="font-medium">Error:</strong> {error}
                      </div>
                    )}
                    <div className="col-span-2 flex justify-end space-x-3 mt-4 pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-text hover:bg-light transition-colors"
                      >
                        <FiX className="mr-2" size={16} />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-primary text-surface rounded-lg hover:bg-secondary focus:ring-primary text-sm transition-colors"
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

      {/* Confirm Delete Modal */}
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
            <div className="fixed inset-0 bg-dark bg-opacity-40" />
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
                <Dialog.Panel className="w-full max-w-sm professional-card p-6">
                  <Dialog.Title as="h3" className="text-xl font-bold text-text flex items-center border-b border-border pb-3">
                    <FiTrash2 className="mr-2 text-error" size={20} />
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-text">
                      Are you sure you want to delete "<strong className="font-semibold">{currentJobRequisition?.jobTitle}</strong>"?
                      This action cannot be undone.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-text hover:bg-light transition-colors"
                      onClick={closeModal}
                    >
                      <FiX className="mr-2" size={16} />
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 bg-error text-surface rounded-lg hover:bg-error/90 focus:ring-error text-sm transition-colors"
                      onClick={handleDeleteJobRequisition}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-surface mr-2"></div>
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

      {/* Schedule Interview Modal */}
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
            <div className="fixed inset-0 bg-dark bg-opacity-40" />
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
                <Dialog.Panel className="w-full max-w-md professional-card p-6">
                  <Dialog.Title as="h3" className="text-xl font-bold text-text mb-4 flex items-center border-b border-border pb-3">
                    <FiCalendar className="mr-2 text-primary" size={20} />
                    Schedule Interview
                  </Dialog.Title>
                  <form onSubmit={(e) => { e.preventDefault(); handleSaveSchedule(); }} className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-text mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={scheduleData.date}
                        onChange={handleScheduleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-text mb-1">Time</label>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={scheduleData.time}
                        onChange={handleScheduleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="interviewer" className="block text-sm font-medium text-text mb-1">Interviewer</label>
                      <input
                        type="text"
                        name="interviewer"
                        id="interviewer"
                        value={scheduleData.interviewer}
                        onChange={handleScheduleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-text mb-1">Notes</label>
                      <textarea
                        name="notes"
                        id="notes"
                        value={scheduleData.notes}
                        onChange={handleScheduleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text"
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-text hover:bg-light transition-colors"
                      >
                        <FiX className="mr-2" size={16} />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-primary text-surface rounded-lg hover:bg-secondary focus:ring-primary text-sm transition-colors"
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