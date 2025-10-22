import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout is in the same directory or adjust path

function Payroll({ sidebarItems }) { // Modified: Accept sidebarItems as a prop
  const payrollSummaries = [
    { id: 1, period: 'June 2025', totalNetPay: '$150,000', status: 'Processed', date: '2025-06-10' },
    { id: 2, period: 'May 2025', totalNetPay: '$148,000', status: 'Processed', date: '2025-05-10' },
    { id: 3, period: 'April 2025', totalNetPay: '$145,000', status: 'Processed', date: '2025-04-10' },
    { id: 4, period: 'July 2025 (Upcoming)', totalNetPay: '$155,000', status: 'Pending', date: '2025-07-10' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle="Payroll Management" gradient="from-emerald-400 to-green-500"> {/* Modified: Pass sidebarItems to DashboardLayout and wrap content */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-green-200 p-8 font-inter">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-green-500 pb-3 flex items-center">
            <i className="fas fa-wallet mr-3 text-green-600"></i>
            Payroll Management
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Manage payroll cycles, view historical data, and ensure accurate and timely compensation for all employees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-green-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-green-600 font-semibold">Next Payroll Date</p>
                <h2 className="text-3xl font-bold text-green-800">Jul 10, 2025</h2>
              </div>
              <i className="fas fa-calendar-day text-green-400 text-4xl"></i>
            </div>
            <div className="bg-lime-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-lime-600 font-semibold">Last Disbursed Amount</p>
                <h2 className="text-3xl font-bold text-lime-800">$150K</h2>
              </div>
              <i className="fas fa-money-bill-wave text-lime-400 text-4xl"></i>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-teal-600 font-semibold">Employees Paid</p>
                <h2 className="text-3xl font-bold text-teal-800">120</h2>
              </div>
              <i className="fas fa-users text-teal-400 text-4xl"></i>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-inner p-4 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-gray-200 pb-2 flex items-center">
              <i className="fas fa-history mr-2 text-gray-600"></i>
              Payroll History
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payroll Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Net Pay
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Processed
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
                {payrollSummaries.map((payroll) => (
                  <tr key={payroll.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payroll.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payroll.totalNetPay}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payroll.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payroll.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payroll.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-green-600 hover:text-green-900 mr-4 transition-colors">View Details</a>
                      <a href="#" className="text-blue-600 hover:text-blue-900 transition-colors">Download Report</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Payroll;