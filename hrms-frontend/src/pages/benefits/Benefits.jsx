import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout is in the same directory or adjust path

function Benefits({ sidebarItems }) { // Accept sidebarItems as a prop
  const benefitsPlans = [
    { id: 1, name: 'Medical & Dental Plan', coverage: 'Full', status: 'Active', enrolled: 95 },
    { id: 2, name: '401k Retirement Plan', coverage: 'Employer Match', status: 'Active', enrolled: 80 },
    { id: 3, name: 'Paid Time Off (PTO)', coverage: 'Standard Policy', status: 'Active', enrolled: 100 },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle="Employee Benefits" gradient="from-green-400 to-blue-500"> {/* Pass sidebarItems to DashboardLayout */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8 font-inter">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500 pb-3 flex items-center">
            <i className="fas fa-hand-holding-heart mr-3 text-blue-600"></i>
            Employee Benefits
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Overview of all employee benefits, plans, and enrollment status.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-blue-600 font-semibold">Total Plans</p>
                <h2 className="text-3xl font-bold text-blue-800">12</h2>
              </div>
              <i className="fas fa-list-alt text-blue-400 text-4xl"></i>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-teal-600 font-semibold">Employees Enrolled</p>
                <h2 className="text-3xl font-bold text-teal-800">110</h2>
              </div>
              <i className="fas fa-users text-teal-400 text-4xl"></i>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-purple-600 font-semibold">Upcoming Enrollment</p>
                <h2 className="text-3xl font-bold text-purple-800">Next Month</h2>
              </div>
              <i className="fas fa-calendar-plus text-purple-400 text-4xl"></i>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-inner p-4 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-gray-200 pb-2 flex items-center">
              <i className="fas fa-file-contract mr-2 text-gray-600"></i>
              Active Benefits Plans
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coverage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled Employees
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {benefitsPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.coverage}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.enrolled}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">View Details</a>
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

export default Benefits;