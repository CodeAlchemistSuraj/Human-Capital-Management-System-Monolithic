import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiHelpCircle, FiClock, FiCheckCircle, FiXCircle, FiList } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function EmployeeRequests({ sidebarItems }) {
  const requests = [
    { id: 1, employee: 'Sarah Connor', type: 'IT Support', status: 'Pending', date: '2025-06-12' },
    { id: 2, employee: 'John Rambo', type: 'Supplies Order', status: 'Approved', date: '2025-06-10' },
    { id: 3, employee: 'Ellen Ripley', type: 'Travel Reimbursement', status: 'Rejected', date: '2025-06-08' },
    { id: 4, employee: 'Marty McFly', type: 'Work from Home', status: 'Pending', date: '2025-06-13' },
    { id: 5, employee: 'Leia Organa', type: 'Training Request', status: 'Approved', date: '2025-06-11' },
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
      pageTitle="Employee Requests" 
      gradient="from-red-600 to-orange-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiHelpCircle className="text-4xl mr-4 text-red-600" />
        <h2 className="text-3xl font-extrabold">Employee Requests</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Manage various employee requests, including IT support, supply orders, travel, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-semibold">New Requests</p>
              <h2 className="text-3xl font-bold text-red-800">5</h2>
            </div>
            <FiClock className="text-red-400 text-4xl" /> {/* Using FiClock for new requests */}
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-semibold">Approved Today</p>
              <h2 className="text-3xl font-bold text-orange-800">3</h2>
            </div>
            <FiCheckCircle className="text-orange-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-semibold">Pending Review</p>
              <h2 className="text-3xl font-bold text-yellow-800">7</h2>
            </div>
            <FiList className="text-yellow-400 text-4xl" /> {/* Using FiList for pending review */}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="All Employee Requests" className="p-4 overflow-x-auto">
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
                  Date
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
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.date}</td>
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

export default EmployeeRequests;