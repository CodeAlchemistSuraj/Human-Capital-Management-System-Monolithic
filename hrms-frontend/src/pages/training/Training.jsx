import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { FiAward, FiBookOpen, FiClock, FiCheckCircle, FiEye } from 'react-icons/fi'; // Added FiEye

// Accept sidebarItems as a prop
function Training({ sidebarItems }) {
  const courses = [
    { id: 1, title: 'Advanced React Development', instructor: 'Jane Developer', status: 'Ongoing', participants: 15 },
    { id: 2, title: 'Cybersecurity Fundamentals', instructor: 'John Security', status: 'Upcoming', participants: 22 },
    { id: 3, title: 'Leadership Skills for Managers', instructor: 'Sarah Leader', status: 'Completed', participants: 10 },
    { id: 4, title: 'Cloud Computing Basics', instructor: 'Mike Cloud', status: 'Upcoming', participants: 18 },
  ];

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Employee Training" 
      gradient="from-indigo-600 to-purple-450"
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiAward className="text-4xl mr-4 text-indigo-600" />
        <h2 className="text-3xl font-extrabold">Employee Training</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Manage and track all employee training programs, courses, and certifications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Total Courses</p>
              <h2 className="text-3xl font-bold text-indigo-800">25</h2>
            </div>
            <FiBookOpen className="text-indigo-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-semibold">Upcoming Sessions</p>
              <h2 className="text-3xl font-bold text-purple-800">5</h2>
            </div>
            <FiClock className="text-purple-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-semibold">Certifications Earned</p>
              <h2 className="text-3xl font-bold text-pink-800">120</h2>
            </div>
            <FiCheckCircle className="text-pink-400 text-4xl" />
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Training Courses" className="p-4 overflow-x-auto">
        <div className="custom-table-container">
          <table className="custom-table">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{course.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{course.participants}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-purple-600 hover:text-purple-900 mr-4 transition-colors flex items-center">
                      <FiEye className="mr-1" /> View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
}

export default Training;