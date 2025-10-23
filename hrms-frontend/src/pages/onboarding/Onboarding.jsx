import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import StatsCard from '../../components/shared/StatsCard';
import { FiUserPlus, FiCheckSquare, FiClipboard, FiList, FiFileText, FiX, FiUpload, FiTrash2, FiEye, FiCalendar, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

function Onboarding({ sidebarItems }) {
  // Enhanced newHires data with more fields for better search
  const [newHires, setNewHires] = useState([
    {
      id: 1,
      name: 'Grace Hopper',
      position: 'Data Scientist',
      department: 'Data Science',
      status: 'Pending Tasks',
      startDate: '2025-07-01',
      email: 'grace.hopper@company.com',
      location: 'New York',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-06-20', comments: 'Done via email' },
        { id: 2, task: 'Upload ID proof', completed: false, due: '2025-06-25', comments: '' },
        { id: 3, task: 'Complete orientation', completed: false, due: '2025-07-02', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'pending', url: '#' },
      ],
    },
    {
      id: 2,
      name: 'Alan Turing',
      position: 'Machine Learning Engineer',
      department: 'AI Research',
      status: 'Completed',
      startDate: '2025-06-15',
      email: 'alan.turing@company.com',
      location: 'London',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-06-01', comments: '' },
        { id: 2, task: 'Upload ID proof', completed: true, due: '2025-06-05', comments: '' },
        { id: 3, task: 'Complete orientation', completed: true, due: '2025-06-16', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'verified', url: '#' },
      ],
    },
    {
      id: 3,
      name: 'Ada Lovelace',
      position: 'Software Developer',
      department: 'Engineering',
      status: 'Pending Documents',
      startDate: '2025-07-10',
      email: 'ada.lovelace@company.com',
      location: 'San Francisco',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-06-28', comments: '' },
        { id: 2, task: 'Upload ID proof', completed: false, due: '2025-07-05', comments: '' },
        { id: 3, task: 'Complete orientation', completed: false, due: '2025-07-11', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'pending', url: '#' },
      ],
    },
    {
      id: 4,
      name: 'Linus Torvalds',
      position: 'Kernel Developer',
      department: 'Systems Engineering',
      status: 'Completed',
      startDate: '2025-06-01',
      email: 'linus.torvalds@company.com',
      location: 'Remote',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-05-20', comments: '' },
        { id: 2, task: 'Upload ID proof', completed: true, due: '2025-05-25', comments: '' },
        { id: 3, task: 'Complete orientation', completed: true, due: '2025-06-02', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'verified', url: '#' },
      ],
    },
  ]);

  const [selectedHire, setSelectedHire] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newDocType, setNewDocType] = useState("");
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [locationFilter, setLocationFilter] = useState("ALL");

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-success/20 text-success border border-success/30';
      case 'Pending Tasks': return 'bg-warning/20 text-warning border border-warning/30';
      case 'Pending Documents': return 'bg-error/20 text-error border border-error/30';
      default: return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Progress calculation
  const getProgress = (hire) => {
    const total = hire.checklist.length;
    const completed = hire.checklist.filter(t => t.completed).length;
    return total ? Math.round((completed / total) * 100) : 0;
  };

  // Filter new hires based on search and filters
  const filteredNewHires = newHires.filter(hire => {
    const matchesSearch = 
      hire.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hire.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hire.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hire.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || hire.status === statusFilter;
    const matchesDepartment = departmentFilter === "ALL" || hire.department === departmentFilter;
    const matchesLocation = locationFilter === "ALL" || hire.location === locationFilter;

    return matchesSearch && matchesStatus && matchesDepartment && matchesLocation;
  });

  // Get unique values for filters
  const departments = [...new Set(newHires.map(hire => hire.department))];
  const locations = [...new Set(newHires.map(hire => hire.location))];
  const statuses = [...new Set(newHires.map(hire => hire.status))];

  // Checklist toggle
  const toggleTask = (hireId, taskId) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === hireId
        ? { ...hire, checklist: hire.checklist.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ) }
        : hire
    ));
  };

  // Update comment
  const updateComment = (hireId, taskId, comment) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === hireId
        ? { ...hire, checklist: hire.checklist.map(task =>
            task.id === taskId ? { ...task, comments: comment } : task
          ) }
        : hire
    ));
  };

  // Add checklist task
  const addTask = () => {
    if (!newTask.trim()) return;
    setNewHires(prev => prev.map(hire =>
      hire.id === selectedHire.id
        ? { ...hire, checklist: [...hire.checklist, { id: Date.now(), task: newTask, completed: false, due: newTaskDue, comments: '' }] }
        : hire
    ));
    setNewTask("");
    setNewTaskDue("");
  };

  // Remove checklist task
  const removeTask = (taskId) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === selectedHire.id
        ? { ...hire, checklist: hire.checklist.filter(task => task.id !== taskId) }
        : hire
    ));
  };

  // Document upload (mock, supports type)
  const handleUpload = (e, hireId) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewHires(prev => prev.map(hire =>
      hire.id === hireId
        ? { ...hire, documents: [...hire.documents, { id: Date.now(), type: newDocType || 'Other', name: file.name, status: 'pending', url: '#' }] }
        : hire
    ));
    setNewDocType("");
  };

  // Approve/Reject document
  const updateDocStatus = (docId, status) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === selectedHire.id
        ? { ...hire, documents: hire.documents.map(doc =>
            doc.id === docId ? { ...doc, status } : doc
          ) }
        : hire
    ));
  };

  // Modal open/close
  const openModal = (hire) => {
    setSelectedHire(hire);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHire(null);
    setNewTask("");
    setNewTaskDue("");
    setNewDocType("");
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setDepartmentFilter("ALL");
    setLocationFilter("ALL");
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="New Hire Onboarding"
      gradient="from-purple-600 to-purple-400"
      className="min-h-screen"
    >
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="professional-card glass-card p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text">New Hire Onboarding</h1>
              <p className="text-text-light mt-1">Streamline the onboarding process for new hires</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            label="Upcoming Hires"
            value={newHires.length}
            color="border-primary"
            icon={FiUserPlus}
          />
          <StatsCard
            label="Pending Checklists"
            value={newHires.reduce((acc, h) => acc + h.checklist.filter(t => !t.completed).length, 0)}
            color="border-secondary"
            icon={FiClipboard}
          />
          <StatsCard
            label="Onboarding Completed"
            value={newHires.filter(h => h.status === 'Completed').length}
            color="border-success"
            icon={FiCheckSquare}
          />
        </div>

        {/* New Hires Progress Card */}
        <DashboardCard 
          title="New Hires Progress" 
          icon={FiList}
          className="professional-card"
        >
          <div className="p-4 space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" />
                  <input
                    type="text"
                    placeholder="Search by name, position, department, or email..."
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
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" />
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                  >
                    <option value="ALL">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                  >
                    <option value="ALL">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-text hover:bg-light transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-text-light">
                Showing {filteredNewHires.length} of {newHires.length} new hires
              </p>
            </div>

            {/* New Hires Grid - No max height, proper scrolling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredNewHires.map((hire) => (
                <div
                  key={hire.id}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-surface"
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="border border-border bg-light rounded-md px-3 py-1">
                            <h3 className="font-semibold text-text text-sm">{hire.name}</h3>
                          </div>
                          <div className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(hire.status)}`}>
                            {hire.status}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="border border-border rounded-md px-2 py-1 bg-surface">
                            <span className="flex items-center gap-1 text-xs text-text-light">
                              <FiUserPlus size={12} />
                              {hire.position}
                            </span>
                          </div>
                          <div className="border border-border rounded-md px-2 py-1 bg-surface">
                            <span className="flex items-center gap-1 text-xs text-text-light">
                              <FiCalendar size={12} />
                              {hire.startDate}
                            </span>
                          </div>
                          <div className="border border-border rounded-md px-2 py-1 bg-surface">
                            <span className="text-xs text-text-light">{hire.department}</span>
                          </div>
                          <div className="border border-border rounded-md px-2 py-1 bg-surface">
                            <span className="text-xs text-text-light">{hire.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => openModal(hire)}
                        className="text-primary hover:text-secondary p-1 rounded border border-transparent hover:border-primary/20 transition-colors"
                        title="View Checklist"
                      >
                        <FiEye size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="grid grid-cols-3 gap-2 mb-3 p-2 border border-border rounded-lg bg-light">
                    <div className="text-center border-r border-border last:border-r-0">
                      <div className="border border-primary/20 rounded-md p-1 bg-primary/5">
                        <div className="text-lg font-bold text-primary">
                          {hire.checklist.filter(t => t.completed).length}/{hire.checklist.length}
                        </div>
                      </div>
                      <div className="text-xs text-text-light mt-1">Tasks</div>
                    </div>
                    <div className="text-center border-r border-border last:border-r-0">
                      <div className="border border-secondary/20 rounded-md p-1 bg-secondary/5">
                        <div className="text-lg font-bold text-secondary">
                          {hire.documents.filter(d => d.status === 'verified').length}/{hire.documents.length}
                        </div>
                      </div>
                      <div className="text-xs text-text-light mt-1">Docs</div>
                    </div>
                    <div className="text-center border-r border-border last:border-r-0">
                      <div className={`border rounded-md p-1 ${getProgress(hire) === 100 ? 'border-success/20 bg-success/5' : 'border-warning/20 bg-warning/5'}`}>
                        <div className={`text-lg font-bold ${getProgress(hire) === 100 ? 'text-success' : 'text-warning'}`}>
                          {getProgress(hire)}%
                        </div>
                      </div>
                      <div className="text-xs text-text-light mt-1">Progress</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-text-light mb-1">
                      <span>Onboarding Progress</span>
                      <span>{getProgress(hire)}%</span>
                    </div>
                    <div className="w-full bg-light rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          getProgress(hire) === 100 ? 'bg-success' : 
                          getProgress(hire) >= 50 ? 'bg-primary' : 'bg-warning'
                        }`}
                        style={{ width: `${getProgress(hire)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-1 p-2 border border-border rounded-lg bg-light">
                    <button
                      onClick={() => openModal(hire)}
                      className="flex items-center px-2 py-1 text-xs border border-primary/20 bg-primary/5 text-primary rounded hover:bg-primary/10 transition-colors"
                    >
                      <FiList size={12} className="mr-1" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleUpload({ target: { files: [new File([], 'document.pdf')] } }, hire.id)}
                      className="flex items-center px-2 py-1 text-xs border border-secondary/20 bg-secondary/5 text-secondary rounded hover:bg-secondary/10 transition-colors"
                    >
                      <FiUpload size={12} className="mr-1" />
                      Upload Doc
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredNewHires.length === 0 && (
              <div className="text-center py-12">
                <FiSearch className="mx-auto text-4xl text-text-light mb-3" />
                <p className="text-text font-medium">No new hires found</p>
                <p className="text-text-light text-sm mt-1">Try adjusting your search criteria or clear filters</p>
              </div>
            )}
          </div>
        </DashboardCard>
      </div>

      {/* Checklist & Document Modal - Fixed with proper overlay behavior */}
      {showModal && selectedHire && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-40 p-4"
          onClick={closeModal} // Close when clicking outside
        >
          <div 
            className="professional-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FiList className="text-primary mr-3" size={24} />
                  <h3 className="text-xl font-bold text-text">{selectedHire.name}'s Onboarding</h3>
                </div>
                <button 
                  className="text-text-light hover:text-text transition-colors p-1 rounded hover:bg-light"
                  onClick={closeModal}
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Candidate Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border border-border rounded-lg bg-light">
                <div>
                  <h4 className="font-semibold text-text mb-2">Candidate Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-light">Position:</span>
                      <span className="text-text font-medium">{selectedHire.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-light">Department:</span>
                      <span className="text-text font-medium">{selectedHire.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-light">Location:</span>
                      <span className="text-text font-medium">{selectedHire.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-light">Email:</span>
                      <span className="text-text font-medium">{selectedHire.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-light">Start Date:</span>
                      <span className="text-text font-medium">{selectedHire.startDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">Progress Overview</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedHire.checklist.filter(t => t.completed).length}</div>
                      <div className="text-sm text-text-light">Tasks Done</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{selectedHire.documents.filter(d => d.status === 'verified').length}</div>
                      <div className="text-sm text-text-light">Docs Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{getProgress(selectedHire)}%</div>
                      <div className="text-sm text-text-light">Overall Progress</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout for Checklist and Documents */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Checklist Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-text flex items-center">
                      <FiCheckSquare className="mr-2 text-primary" />
                      Onboarding Checklist
                    </h4>
                  </div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                    {selectedHire.checklist.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-surface hover:bg-light/50 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={item.completed} 
                          onChange={() => toggleTask(selectedHire.id, item.id)} 
                          className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                        />
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${item.completed ? 'line-through text-text-light' : 'text-text'}`}>
                            {item.task}
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="border border-border rounded-md px-2 py-1 bg-light">
                              <span className="text-xs text-text-light flex items-center gap-1">
                                <FiCalendar size={10} />
                                Due: {item.due}
                              </span>
                            </div>
                            {item.comments && (
                              <div className="border border-border rounded-md px-2 py-1 bg-light">
                                <span className="text-xs text-text-light">Note: {item.comments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={() => removeTask(item.id)}
                          className="text-error hover:text-error/80 p-1 rounded border border-transparent hover:border-error/20 transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Task */}
                  <div className="flex gap-2 mt-4">
                    <input 
                      type="text" 
                      value={newTask} 
                      onChange={e => setNewTask(e.target.value)} 
                      placeholder="New task description" 
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                    />
                    <input 
                      type="date" 
                      value={newTaskDue} 
                      onChange={e => setNewTaskDue(e.target.value)} 
                      className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                    />
                    <button 
                      onClick={addTask}
                      className="flex items-center px-4 py-2 bg-primary text-surface rounded-lg hover:bg-secondary transition-colors text-sm"
                    >
                      <FiPlus size={16} className="mr-1" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Documents Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-text flex items-center">
                      <FiFileText className="mr-2 text-secondary" />
                      Documents
                    </h4>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2 mb-4">
                    {selectedHire.documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface">
                        <div className="flex items-center gap-3">
                          <div className="border border-border rounded-md px-2 py-1 bg-light">
                            <span className="text-xs font-medium text-text">{doc.type}</span>
                          </div>
                          <span className="text-sm text-text">{doc.name}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            doc.status === 'verified' ? 'bg-success/20 text-success border border-success/30' :
                            doc.status === 'pending' ? 'bg-warning/20 text-warning border border-warning/30' :
                            'bg-error/20 text-error border border-error/30'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateDocStatus(doc.id, 'verified')}
                            className="text-success hover:text-success/80 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateDocStatus(doc.id, 'rejected')}
                            className="text-error hover:text-error/80 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upload New Document */}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newDocType} 
                      onChange={e => setNewDocType(e.target.value)} 
                      placeholder="Document type" 
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text text-sm"
                    />
                    <label className="flex items-center px-4 py-2 border border-border rounded-lg hover:bg-light transition-colors cursor-pointer text-sm">
                      <FiUpload className="mr-2 text-text-light" />
                      <span className="text-text">Upload</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={e => handleUpload(e, selectedHire.id)} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Onboarding;