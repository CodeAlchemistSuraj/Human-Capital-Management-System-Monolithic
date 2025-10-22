import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiSettings, FiGlobe, FiMail, FiShield, FiKey, FiLock } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function Settings({ sidebarItems }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    // Pass sidebarItems to DashboardLayout
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Settings" 
      gradient="from-indigo-600 to-blue-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiSettings className="text-4xl mr-4 text-indigo-600" />
        <h2 className="text-3xl font-extrabold">Settings</h2>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Customize your dashboard experience and manage your account preferences.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="General Preferences" className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <span className="text-lg text-gray-700">Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <span className="text-lg text-gray-700">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={darkModeEnabled}
                  onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Email Preferences" className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <span className="text-lg text-gray-700">Receive Email Updates</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={emailUpdates}
                  onChange={() => setEmailUpdates(!emailUpdates)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Manage the types of email communications you receive.</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Security" className="p-6 col-span-full">
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors flex items-center">
              <FiKey className="mr-2" /> Change Password
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors flex items-center">
              <FiLock className="mr-2" /> Setup Two-Factor Authentication
            </button>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}

export default Settings;