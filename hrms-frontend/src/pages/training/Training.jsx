import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { FiAward, FiBookOpen, FiClock, FiCheckCircle, FiEye, FiUsers, FiCalendar, FiBarChart, FiPlus, FiDownload, FiFilter } from 'react-icons/fi';

// Accept sidebarItems as a prop
function Training({ sidebarItems }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const courses = [
    { 
      id: 1, 
      title: 'Advanced React Development', 
      instructor: 'Jane Developer', 
      status: 'Ongoing', 
      participants: 15,
      duration: '8 weeks',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      category: 'Technical',
      progress: 65,
      description: 'Master advanced React patterns, state management, and performance optimization techniques.'
    },
    { 
      id: 2, 
      title: 'Cybersecurity Fundamentals', 
      instructor: 'John Security', 
      status: 'Upcoming', 
      participants: 22,
      duration: '6 weeks',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      category: 'Security',
      progress: 0,
      description: 'Learn essential cybersecurity principles and best practices for modern organizations.'
    },
    { 
      id: 3, 
      title: 'Leadership Skills for Managers', 
      instructor: 'Sarah Leader', 
      status: 'Completed', 
      participants: 10,
      duration: '4 weeks',
      startDate: '2023-11-01',
      endDate: '2023-11-29',
      category: 'Leadership',
      progress: 100,
      description: 'Develop essential leadership skills for effective team management and organizational growth.'
    },
    { 
      id: 4, 
      title: 'Cloud Computing Basics', 
      instructor: 'Mike Cloud', 
      status: 'Upcoming', 
      participants: 18,
      duration: '5 weeks',
      startDate: '2024-02-15',
      endDate: '2024-03-22',
      category: 'Technical',
      progress: 0,
      description: 'Introduction to cloud computing concepts and major cloud service providers.'
    },
  ];

  const trainingStats = {
    totalHours: 240,
    completionRate: 78,
    activeLearners: 45,
    certifications: 120
  };

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]';
      case 'Upcoming': return 'bg-[var(--warning)] bg-opacity-10 text-[var(--warning)]';
      case 'Completed': return 'bg-[var(--success)] bg-opacity-10 text-[var(--success)]';
      default: return 'bg-[var(--border)] text-[var(--text-light)]';
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setShowEnrollModal(true);
  };

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Employee Training" 
      gradient="from-indigo-600 to-purple-450"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FiAward className="text-3xl mr-3 text-[var(--primary)]" />
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)]">Employee Training</h2>
            <p className="text-sm text-[var(--text-light)] mt-1">
              Manage and track all employee training programs and certifications
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] hover:bg-[var(--light)] transition-colors">
            <FiFilter className="text-sm" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] hover:bg-[var(--light)] transition-colors">
            <FiDownload className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors">
            <FiPlus className="text-sm" />
            New Course
          </button>
        </div>
      </div>

      {/* Compact Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Courses</p>
              <h2 className="text-xl font-bold text-[var(--text)]">25</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--primary)] bg-opacity-10">
              <FiBookOpen className="text-[var(--primary)] text-lg" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Upcoming</p>
              <h2 className="text-xl font-bold text-[var(--text)]">5</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--secondary)] bg-opacity-10">
              <FiClock className="text-[var(--secondary)] text-lg" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Active Learners</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{trainingStats.activeLearners}</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--success)] bg-opacity-10">
              <FiUsers className="text-[var(--success)] text-lg" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Completion Rate</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{trainingStats.completionRate}%</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--accent)] bg-opacity-10">
              <FiBarChart className="text-[var(--accent)] text-lg" />
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Training Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="My Learning Progress" className="professional-card p-5">
          <div className="space-y-4">
            {courses.filter(course => course.status === 'Ongoing').map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-[var(--light)] rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[var(--text)]">{course.title}</h4>
                  <p className="text-xs text-[var(--text-light)]">{course.category}</p>
                </div>
                <div className="w-20">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-[var(--border)] rounded-full h-2">
                    <div 
                      className="bg-[var(--primary)] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Quick Actions" className="professional-card p-5">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center p-4 bg-[var(--light)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all group">
              <FiCalendar className="text-lg mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Schedule</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-[var(--light)] rounded-lg hover:bg-[var(--success)] hover:text-white transition-all group">
              <FiCheckCircle className="text-lg mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Certificates</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-[var(--light)] rounded-lg hover:bg-[var(--secondary)] hover:text-white transition-all group">
              <FiBookOpen className="text-lg mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Resources</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-[var(--light)] rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all group">
              <FiBarChart className="text-lg mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Reports</span>
            </button>
          </div>
        </DashboardCard>
      </div>

      {/* Training Courses Table with Tabs */}
      <DashboardCard className="professional-card p-0 overflow-hidden">
        <div className="border-b border-[var(--border)]">
          <div className="flex justify-between items-center p-6 pb-0">
            <h3 className="text-lg font-semibold text-[var(--text)]">Training Courses</h3>
            <div className="flex gap-1 bg-[var(--light)] rounded-lg p-1">
              {['all', 'ongoing', 'upcoming', 'completed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === tab 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'text-[var(--text-light)] hover:text-[var(--text)]'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--light)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-[var(--light)] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text)]">{course.title}</div>
                      <div className="text-xs text-[var(--text-light)]">{course.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-light)]">{course.instructor}</td>
                  <td className="px-6 py-4 text-sm text-[var(--text-light)]">{course.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[var(--border)] rounded-full h-2">
                        <div 
                          className="bg-[var(--primary)] h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-[var(--text-light)]">{course.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(course)}
                        className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors flex items-center"
                      >
                        <FiEye className="mr-1" /> View
                      </button>
                      {course.status === 'Upcoming' && (
                        <button 
                          onClick={() => handleEnroll(course)}
                          className="text-xs text-[var(--success)] hover:text-[var(--success)] transition-colors flex items-center"
                        >
                          <FiPlus className="mr-1" /> Enroll
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Course Details Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text)]">{selectedCourse.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mt-1">{selectedCourse.category} • {selectedCourse.instructor}</p>
                </div>
                <button 
                  onClick={() => setShowCourseModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)]"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Status</label>
                  <p className="text-sm text-[var(--text)]">{selectedCourse.status}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Duration</label>
                  <p className="text-sm text-[var(--text)]">{selectedCourse.duration}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Start Date</label>
                  <p className="text-sm text-[var(--text)]">{selectedCourse.startDate}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Participants</label>
                  <p className="text-sm text-[var(--text)]">{selectedCourse.participants}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-[var(--text-light)]">Description</label>
                <p className="text-sm text-[var(--text)] mt-1">{selectedCourse.description}</p>
              </div>
              
              {selectedCourse.status === 'Ongoing' && (
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Progress</label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 bg-[var(--border)] rounded-full h-2">
                      <div 
                        className="bg-[var(--primary)] h-2 rounded-full"
                        style={{ width: `${selectedCourse.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">{selectedCourse.progress}%</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3">
              <button 
                onClick={() => setShowCourseModal(false)}
                className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-lg hover:bg-[var(--light)] transition-colors"
              >
                Close
              </button>
              {selectedCourse.status === 'Upcoming' && (
                <button 
                  onClick={() => {
                    setShowCourseModal(false);
                    handleEnroll(selectedCourse);
                  }}
                  className="px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      {showEnrollModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-[var(--border)]">
              <h3 className="text-lg font-bold text-[var(--text)]">Enroll in Course</h3>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-[var(--text)] mb-4">
                You are about to enroll in <strong>{selectedCourse.title}</strong> taught by {selectedCourse.instructor}.
              </p>
              <p className="text-xs text-[var(--text-light)]">
                Duration: {selectedCourse.duration} • Start Date: {selectedCourse.startDate}
              </p>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3">
              <button 
                onClick={() => setShowEnrollModal(false)}
                className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-lg hover:bg-[var(--light)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle enrollment logic here
                  setShowEnrollModal(false);
                  alert(`Successfully enrolled in ${selectedCourse.title}`);
                }}
                className="px-4 py-2 text-sm bg-[var(--success)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Training;