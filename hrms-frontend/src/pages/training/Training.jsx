import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { FiAward, FiBookOpen, FiClock, FiCheckCircle, FiEye, FiUsers, FiCalendar, FiBarChart, FiPlus, FiDownload, FiFilter, FiPlay, FiPause, FiStar, FiTrendingUp, FiAlertCircle, FiCheckSquare } from 'react-icons/fi';

// Accept sidebarItems as a prop
function Training({ sidebarItems }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
      description: 'Master advanced React patterns, state management, and performance optimization techniques.',
      level: 'Advanced',
      rating: 4.8,
      enrolled: true,
      thumbnail: '🧩',
      skills: ['React', 'State Management', 'Performance'],
      deadline: '2024-03-15'
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
      description: 'Learn essential cybersecurity principles and best practices for modern organizations.',
      level: 'Beginner',
      rating: 4.5,
      enrolled: false,
      thumbnail: '🛡️',
      skills: ['Security', 'Networking', 'Best Practices'],
      deadline: '2024-01-25'
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
      description: 'Develop essential leadership skills for effective team management and organizational growth.',
      level: 'Intermediate',
      rating: 4.9,
      enrolled: true,
      thumbnail: '👑',
      skills: ['Leadership', 'Management', 'Communication'],
      deadline: 'Completed'
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
      description: 'Introduction to cloud computing concepts and major cloud service providers.',
      level: 'Beginner',
      rating: 4.3,
      enrolled: false,
      thumbnail: '☁️',
      skills: ['AWS', 'Azure', 'Cloud Basics'],
      deadline: '2024-02-10'
    },
  ];

  const trainingStats = {
    totalHours: 240,
    completionRate: 78,
    activeLearners: 45,
    certifications: 120,
    upcomingDeadlines: 3,
    averageRating: 4.6
  };

  // Enhanced status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Upcoming': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Completed': return 'bg-green-50 text-green-700 border border-green-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-lg">
              <FiAward className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Employee Training</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Manage and track all employee training programs</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{courses.length} active courses</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-[var(--light)] rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[var(--surface)] shadow-sm' : 'hover:bg-[var(--border)]'}`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
                <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
                <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
                <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
              </div>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[var(--surface)] shadow-sm' : 'hover:bg-[var(--border)]'}`}
            >
              <div className="w-4 h-4 flex flex-col gap-0.5">
                <div className={`h-1 rounded-full ${viewMode === 'list' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
                <div className={`h-1 rounded-full ${viewMode === 'list' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
                <div className={`h-1 rounded-full ${viewMode === 'list' ? 'bg-[var(--primary)]' : 'bg-[var(--text-light)]'}`}></div>
              </div>
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiFilter className="text-sm" />
            Filter
            <span className="bg-[var(--primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiDownload className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            New Course
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard className="professional-card p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="relative z-10">
              <p className="text-sm font-medium text-[var(--text-light)] mb-2">Total Courses</p>
              <h2 className="text-2xl font-bold text-[var(--text)]">25</h2>
              <div className="flex items-center gap-1 mt-2">
                <FiTrendingUp className="text-emerald-500 text-sm" />
                <span className="text-xs text-emerald-600 font-medium">+12% this month</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform">
              <FiBookOpen className="text-xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="relative z-10">
              <p className="text-sm font-medium text-[var(--text-light)] mb-2">Upcoming</p>
              <h2 className="text-2xl font-bold text-[var(--text)]">5</h2>
              <div className="flex items-center gap-1 mt-2">
                <FiAlertCircle className="text-amber-500 text-sm" />
                <span className="text-xs text-amber-600 font-medium">{trainingStats.upcomingDeadlines} deadlines</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg group-hover:scale-110 transition-transform">
              <FiClock className="text-xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="relative z-10">
              <p className="text-sm font-medium text-[var(--text-light)] mb-2">Active Learners</p>
              <h2 className="text-2xl font-bold text-[var(--text)]">{trainingStats.activeLearners}</h2>
              <div className="flex items-center gap-1 mt-2">
                <FiUsers className="text-purple-500 text-sm" />
                <span className="text-xs text-purple-600 font-medium">85% engagement</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg group-hover:scale-110 transition-transform">
              <FiUsers className="text-xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="relative z-10">
              <p className="text-sm font-medium text-[var(--text-light)] mb-2">Completion Rate</p>
              <h2 className="text-2xl font-bold text-[var(--text)]">{trainingStats.completionRate}%</h2>
              <div className="flex items-center gap-1 mt-2">
                <FiStar className="text-green-500 text-sm" />
                <span className="text-xs text-green-600 font-medium">{trainingStats.averageRating}/5 rating</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg group-hover:scale-110 transition-transform">
              <FiBarChart className="text-xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </DashboardCard>
      </div>

      {/* Enhanced Training Progress & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Learning Progress */}
        <div className="xl:col-span-2">
          <DashboardCard 
            title="My Learning Progress" 
            className="professional-card p-6"
            headerAction={
              <button className="text-sm text-[var(--primary)] font-medium hover:text-[var(--secondary)] transition-colors">
                View All
              </button>
            }
          >
            <div className="space-y-4">
              {courses.filter(course => course.status === 'Ongoing').map(course => (
                <div key={course.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[var(--light)] to-transparent rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-all group">
                  <div className="text-2xl">{course.thumbnail}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-[var(--text)] truncate">{course.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeClass(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-light)] mb-2">{course.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 max-w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--text-light)]">Progress</span>
                          <span className="font-semibold text-[var(--text)]">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-[var(--border)] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)]">
                        <FiPlay className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Enhanced Quick Actions */}
        <DashboardCard title="Quick Actions" className="professional-card p-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group hover:shadow-md">
              <div className="p-3 bg-blue-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <FiCalendar className="text-lg" />
              </div>
              <span className="text-sm font-semibold text-[var(--text)]">Schedule</span>
              <span className="text-xs text-[var(--text-light)] mt-1">Plan training</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group hover:shadow-md">
              <div className="p-3 bg-green-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <FiCheckCircle className="text-lg" />
              </div>
              <span className="text-sm font-semibold text-[var(--text)]">Certificates</span>
              <span className="text-xs text-[var(--text-light)] mt-1">View all</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group hover:shadow-md">
              <div className="p-3 bg-purple-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <FiBookOpen className="text-lg" />
              </div>
              <span className="text-sm font-semibold text-[var(--text)]">Resources</span>
              <span className="text-xs text-[var(--text-light)] mt-1">Library</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group hover:shadow-md">
              <div className="p-3 bg-orange-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <FiBarChart className="text-lg" />
              </div>
              <span className="text-sm font-semibold text-[var(--text)]">Reports</span>
              <span className="text-xs text-[var(--text-light)] mt-1">Analytics</span>
            </button>
          </div>
        </DashboardCard>
      </div>

      {/* Enhanced Courses Section with Toggle View */}
      <DashboardCard className="professional-card p-0 overflow-hidden">
        <div className="border-b border-[var(--border)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 pb-0 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">Training Courses</h3>
              <p className="text-sm text-[var(--text-light)] mt-1">
                {filteredCourses.length} of {courses.length} courses
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1 bg-[var(--light)] rounded-lg p-1">
                {['all', 'ongoing', 'upcoming', 'completed'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      activeTab === tab 
                        ? 'bg-[var(--primary)] text-white shadow-sm' 
                        : 'text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--border)]'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-[var(--border)]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-3xl">{course.thumbnail}</div>
                        <div className="flex items-center gap-1">
                          <FiStar className="text-amber-500 text-sm" />
                          <span className="text-xs font-semibold text-[var(--text)]">{course.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-[var(--text)] text-sm mb-1 line-clamp-2">{course.title}</h4>
                      <p className="text-xs text-[var(--text-light)]">{course.instructor}</p>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(course.status)}`}>
                          {course.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeClass(course.level)}`}>
                          {course.level}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-[var(--text-light)]">Duration:</span>
                          <span className="font-medium text-[var(--text)]">{course.duration}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[var(--text-light)]">Participants:</span>
                          <span className="font-medium text-[var(--text)]">{course.participants}</span>
                        </div>
                        {course.deadline && (
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-light)]">Deadline:</span>
                            <span className="font-medium text-[var(--text)]">{course.deadline}</span>
                          </div>
                        )}
                      </div>

                      {course.status === 'Ongoing' && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[var(--text-light)]">Progress</span>
                            <span className="font-semibold text-[var(--text)]">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-[var(--border)] rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(course)}
                          className="flex-1 text-xs bg-[var(--light)] text-[var(--text)] py-2 rounded-lg hover:bg-[var(--border)] transition-colors"
                        >
                          View Details
                        </button>
                        {course.status === 'Upcoming' && !course.enrolled && (
                          <button 
                            onClick={() => handleEnroll(course)}
                            className="flex-1 text-xs bg-[var(--primary)] text-white py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                          >
                            Enroll
                          </button>
                        )}
                        {course.enrolled && (
                          <button className="flex-1 text-xs bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1">
                            <FiCheckSquare className="text-sm" />
                            Enrolled
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
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
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{course.thumbnail}</div>
                            <div>
                              <div className="text-sm font-semibold text-[var(--text)]">{course.title}</div>
                              <div className="text-xs text-[var(--text-light)]">{course.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[var(--text-light)]">{course.instructor}</td>
                        <td className="px-6 py-4 text-sm text-[var(--text-light)]">{course.duration}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(course.status)}`}>
                              {course.status}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeClass(course.level)}`}>
                              {course.level}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-[var(--border)] rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-[var(--text-light)] min-w-8">{course.progress}%</span>
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
            )}
          </div>
        </div>
      </DashboardCard>

      {/* Keep existing modals exactly as they are - preserving all functionality */}
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