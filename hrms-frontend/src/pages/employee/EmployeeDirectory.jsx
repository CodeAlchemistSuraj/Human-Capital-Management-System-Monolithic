import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiUsers, FiSearch, FiMail, FiUser } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function EmployeeDirectory({ sidebarItems }) {
  const employees = [
    { id: 1, name: 'David Lee', position: 'Software Engineer', department: 'Engineering', email: 'david.l@example.com' },
    { id: 2, name: 'Emily Chen', position: 'Product Manager', department: 'Product', email: 'emily.c@example.com' },
    { id: 3, name: 'Mark Davis', position: 'HR Generalist', department: 'Human Resources', email: 'mark.d@example.com' },
    { id: 4, name: 'Sophia Rodriguez', position: 'Marketing Specialist', department: 'Marketing', email: 'sophia.r@example.com' },
    { id: 5, name: 'Chris Evans', position: 'Sales Representative', department: 'Sales', email: 'chris.e@example.com' },
    { id: 6, name: 'Olivia White', position: 'Data Analyst', department: 'Analytics', email: 'olivia.w@example.com' },
  ];

  return (
    // Pass sidebarItems to DashboardLayout
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Employee Directory" 
      gradient="from-purple-600 to-pink-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiUsers className="text-4xl mr-4 text-purple-600" />
        <h2 className="text-3xl font-extrabold">Employee Directory</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Search and find contact information for all employees within the organization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-semibold">Total Employees</p>
              <h2 className="text-3xl font-bold text-purple-800">150</h2>
            </div>
            <FiUsers className="text-purple-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-semibold">Departments</p>
              <h2 className="text-3xl font-bold text-pink-800">10</h2>
            </div>
            <FiSearch className="text-pink-400 text-4xl" /> {/* Using FiSearch for departments */}
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">New Hires (Last 30 days)</p>
              <h2 className="text-3xl font-bold text-indigo-800">5</h2>
            </div>
            <FiUser className="text-indigo-400 text-4xl" /> {/* Using FiUser for new hires */}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Employee List" className="p-4 overflow-x-auto">
        <div className="custom-table-container">
          <table className="custom-table">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-pink-600 hover:text-pink-900 mr-4 transition-colors flex items-center">
                      <FiUser className="mr-1" /> View Profile
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

export default EmployeeDirectory;