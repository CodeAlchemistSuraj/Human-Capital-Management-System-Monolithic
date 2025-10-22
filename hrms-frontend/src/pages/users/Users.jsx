import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiUsers, FiUserCheck, FiUserX, FiUser, FiEdit, FiTrash2, FiList } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function Users({ sidebarItems }) {
  const users = [
    { id: 1, name: 'Alice Smith', email: 'alice.s@example.com', role: 'Employee', status: 'Active' },
    { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Employee', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Administrator', status: 'Active' },
    { id: 5, name: 'Eve Adams', email: 'eve.a@example.com', role: 'Employee', status: 'Active' },
    { id: 6, name: 'Frank White', email: 'frank.w@example.com', role: 'Employee', status: 'Inactive' },
  ];

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    // Pass sidebarItems to DashboardLayout
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="User Management" 
      gradient="from-blue-600 to-blue-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiUsers className="text-4xl mr-4 text-blue-600" />
        <h2 className="text-3xl font-extrabold">User Management</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        View, manage, and modify user accounts and roles within the system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-semibold">Total Users</p>
              <h2 className="text-3xl font-bold text-blue-800">150</h2>
            </div>
            <FiUsers className="text-blue-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Active Users</p>
              <h2 className="text-3xl font-bold text-indigo-800">140</h2>
            </div>
            <FiUserCheck className="text-indigo-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-semibold">Admins</p>
              <h2 className="text-3xl font-bold text-purple-800">5</h2>
            </div>
            <FiUser className="text-purple-400 text-4xl" />
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="User List" className="p-4 overflow-x-auto">
        <div className="custom-table-container"> {/* Apply custom-table-container for overflow & border/shadow */}
          <table className="custom-table"> {/* Apply custom-table for base table styles */}
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-4 transition-colors flex items-center">
                      <FiEdit className="mr-1" /> Edit
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-900 transition-colors flex items-center">
                      <FiTrash2 className="mr-1" /> Delete
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

export default Users;