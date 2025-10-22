import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiBarChart2, FiDownload, FiEye, FiFileText } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function Reports({ sidebarItems }) {
  const generatedReports = [
    { id: 1, name: 'Monthly Payroll Summary', type: 'Financial', date: '2025-06-01', status: 'Completed' },
    { id: 2, name: 'Employee Performance Metrics Q2', type: 'Performance', date: '2025-05-30', status: 'Completed' },
    { id: 3, name: 'Recruitment Funnel Analysis', type: 'Recruitment', date: '2025-06-10', status: 'Pending' },
    { id: 4, name: 'Leave Trends Last Year', type: 'Attendance', date: '2025-01-05', status: 'Completed' },
    { id: 5, name: 'Department Headcount Report', type: 'General', date: '2025-06-14', status: 'Completed' },
  ];

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    return status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    // Pass sidebarItems to DashboardLayout
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Reports & Analytics" 
      gradient="from-gray-600 to-slate-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiBarChart2 className="text-4xl mr-4 text-gray-600" />
        <h2 className="text-3xl font-extrabold">Reports & Analytics</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Access comprehensive reports and analytics across various HR functions to gain actionable insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Reports Generated</p>
              <h2 className="text-3xl font-bold text-gray-800">50+</h2>
            </div>
            <FiFileText className="text-gray-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-semibold">Pending Reports</p>
              <h2 className="text-3xl font-bold text-slate-800">3</h2>
            </div>
            <FiEye className="text-slate-400 text-4xl" /> {/* Using FiEye for pending reports */}
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-semibold">Downloads (Last 30 days)</p>
              <h2 className="text-3xl font-bold text-blue-800">75</h2>
            </div>
            <FiDownload className="text-blue-400 text-4xl" />
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Generated Reports" className="p-4 overflow-x-auto">
        <div className="custom-table-container">
          <table className="custom-table">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Generated
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
              {generatedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-gray-600 hover:text-gray-900 mr-4 transition-colors flex items-center">
                      <FiEye className="mr-1" /> View
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-900 transition-colors flex items-center">
                      <FiDownload className="mr-1" /> Download
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

export default Reports;