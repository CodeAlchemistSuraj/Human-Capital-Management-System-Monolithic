import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { FiActivity, FiStar, FiFileText, FiCheckCircle, FiCalendar, FiEye } from 'react-icons/fi'; // Added FiEye

// Accept sidebarItems as a prop
function Performance({ sidebarItems }) {
  const performanceReviews = [
    { id: 1, employee: 'John Doe', reviewDate: '2025-05-15', score: '4.5/5', status: 'Completed' },
    { id: 2, employee: 'Jane Smith', reviewDate: '2025-06-01', score: 'N/A', status: 'Pending' },
    { id: 3, employee: 'Peter Jones', reviewDate: '2025-04-20', score: '3.8/5', status: 'Completed' },
    { id: 4, employee: 'Sarah Lee', reviewDate: '2025-06-20', score: 'N/A', status: 'Pending' },
  ];

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    return status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Performance Management"
      gradient="from-yellow-600 to-orange-400"
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiActivity className="text-4xl mr-4 text-yellow-600" />
        <h2 className="text-3xl font-extrabold">Performance Management</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Track employee performance, conduct reviews, and set goals for professional development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-semibold">Upcoming Reviews</p>
              <h2 className="text-3xl font-bold text-yellow-800">7</h2>
            </div>
            <FiCalendar className="text-yellow-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-semibold">Average Score (Q2)</p>
              <h2 className="text-3xl font-bold text-orange-800">4.1/5</h2>
            </div>
            <FiStar className="text-orange-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-semibold">Pending Feedback</p>
              <h2 className="text-3xl font-bold text-red-800">3</h2>
            </div>
            <FiFileText className="text-red-400 text-4xl" />
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Performance Reviews" className="p-4 overflow-x-auto">
        <div className="custom-table-container">
          <table className="custom-table">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{review.reviewDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{review.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-orange-600 hover:text-orange-900 mr-4 transition-colors flex items-center">
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

export default Performance;