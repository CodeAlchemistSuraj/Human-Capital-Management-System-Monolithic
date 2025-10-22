import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout is in the same directory or adjust path

function TimeAttendance({ sidebarItems }) { // Accept sidebarItems as a prop
  const recentPunches = [
    { id: 1, employee: 'Jane Doe', type: 'Clock In', time: '09:00 AM', date: '2025-06-13' },
    { id: 2, employee: 'John Smith', type: 'Clock Out', time: '05:00 PM', date: '2025-06-12' },
    { id: 3, employee: 'Alice Brown', type: 'Clock In', time: '08:45 AM', date: '2025-06-13' },
    { id: 4, employee: 'Bob White', type: 'Clock Out', time: '04:50 PM', date: '2025-06-12' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle="Time & Attendance" gradient="from-teal-400 to-cyan-500"> {/* Pass sidebarItems to DashboardLayout */}
      <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 p-8 font-inter">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-cyan-500 pb-3 flex items-center">
            <i className="fas fa-clock mr-3 text-cyan-600"></i>
            Time & Attendance
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Monitor employee clock-ins and clock-outs, track working hours, and manage attendance records.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-cyan-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-cyan-600 font-semibold">Employees Clocked In</p>
                <h2 className="text-3xl font-bold text-cyan-800">85</h2>
              </div>
              <i className="fas fa-users text-cyan-400 text-4xl"></i>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-emerald-600 font-semibold">Total Hours (This Week)</p>
                <h2 className="text-3xl font-bold text-emerald-800">4500</h2>
              </div>
              <i className="fas fa-hourglass text-emerald-400 text-4xl"></i>
            </div>
            <div className="bg-lime-50 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
              <div>
                <p className="text-sm text-lime-600 font-semibold">Absent Today</p>
                <h2 className="text-3xl font-bold text-lime-800">5</h2>
              </div>
              <i className="fas fa-user-slash text-lime-400 text-4xl"></i>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-inner p-4 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-gray-200 pb-2 flex items-center">
              <i className="fas fa-list-alt mr-2 text-gray-600"></i>
              Recent Time Punches
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPunches.map((punch) => (
                  <tr key={punch.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{punch.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        punch.type === 'Clock In' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {punch.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{punch.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{punch.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-cyan-600 hover:text-cyan-900 mr-4 transition-colors">Edit</a>
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

export default TimeAttendance;