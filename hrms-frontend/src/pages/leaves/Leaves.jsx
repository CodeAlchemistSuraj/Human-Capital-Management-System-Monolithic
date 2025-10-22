import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiSend, FiCalendar, FiXCircle, FiList, FiCheckCircle } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function Leaves({ sidebarItems }) {
  const leaveRequests = [
    { id: 1, employee: 'Michael Scott', type: 'Sick Leave', startDate: '2025-06-15', endDate: '2025-06-16', status: 'Pending' },
    { id: 2, employee: 'Pam Beesly', type: 'Vacation', startDate: '2025-07-01', endDate: '2025-07-05', status: 'Approved' },
    { id: 3, employee: 'Dwight Schrute', type: 'Personal Leave', startDate: '2025-06-10', endDate: '2025-06-10', status: 'Rejected' },
    { id: 4, employee: 'Jim Halpert', type: 'Vacation', startDate: '2025-08-01', endDate: '2025-08-07', status: 'Pending' },
  ];

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    // Pass sidebarItems to DashboardLayout
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Leave Management" 
      gradient="from-orange-600 to-red-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiSend className="text-4xl mr-4 text-orange-600" />
        <h2 className="text-3xl font-extrabold">Leave Management</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Manage and track all employee leave requests, ensuring compliance and efficient scheduling.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-semibold">Pending Requests</p>
              <h2 className="text-3xl font-bold text-orange-800">12</h2>
            </div>
            <FiCalendar className="text-orange-400 text-4xl" /> {/* Using FiCalendar for pending */}
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-semibold">Approved Leaves (This Month)</p>
              <h2 className="text-3xl font-bold text-green-800">25</h2>
            </div>
            <FiCheckCircle className="text-green-400 text-4xl" /> {/* Using FiCheckCircle for approved */}
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-semibold">Rejected Leaves (YTD)</p>
              <h2 className="text-3xl font-bold text-red-800">5</h2>
            </div>
            <FiXCircle className="text-red-400 text-4xl" /> {/* Using FiXCircle for rejected */}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Recent Leave Requests" className="p-4 overflow-x-auto">
        <div className="custom-table-container">
          <table className="custom-table">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
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
              {leaveRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-orange-600 hover:text-orange-900 mr-4 transition-colors flex items-center">
                      <FiList className="mr-1" /> Review
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

export default Leaves;