import React from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout'; // Assuming DashboardLayout path
import DashboardCard from '../../components/shared/DashboardCard'; // Assuming DashboardCard path
import { FiUser, FiInfo, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCalendar, FiSliders, FiEdit } from 'react-icons/fi'; // Import icons

// Accept sidebarItems as a prop
function Profile({ sidebarItems }) {
  const userProfile = {
    name: 'Lena Miller',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    email: 'lena.m@example.com',
    phone: '+1 234 567 8900',
    address: '123 Tech Lane, Silicon Valley, CA',
    startDate: '2020-03-01',
    status: 'Active',
    skills: ['React', 'JavaScript', 'CSS', 'Tailwind CSS', 'Node.js', 'Git'],
    bio: "Lena is a highly skilled Senior Frontend Developer with a passion for creating intuitive and visually appealing user interfaces. She specializes in modern web technologies and enjoys contributing to open-source projects in her spare time.",
  };

  return (
    // Pass sidebarItems to DashboardLayout
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="My Profile" 
      gradient="from-pink-600 to-rose-400" // Consistent gradient
    >
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiUser className="text-4xl mr-4 text-pink-600" />
        <h2 className="text-3xl font-extrabold">My Profile</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start mb-8 border-b-4 border-rose-500 pb-5">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-rose-400 shadow-md mb-4 md:mb-0 md:mr-6"
          src="https://placehold.co/128x128/FFD1DC/FF4081?text=LM" // Placeholder image
          alt="User Avatar"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{userProfile.name}</h1>
          <p className="text-xl text-rose-600 font-semibold">{userProfile.position}</p>
          <p className="text-md text-gray-600">{userProfile.department}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start mt-3 text-gray-700 gap-x-4">
            <span className="flex items-center"><FiMail className="mr-2" /> {userProfile.email}</span>
            <span className="flex items-center"><FiPhone className="mr-2" /> {userProfile.phone}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> {/* Changed gap to 6 from 8 for consistency */}
        <DashboardCard title="Personal Information" className="p-6">
          <p className="text-gray-700 mb-2 flex items-center"><span className="font-semibold mr-2"><FiMapPin /></span> Address: {userProfile.address}</p>
          <p className="text-gray-700 flex items-center"><span className="font-semibold mr-2"><FiInfo /></span> Employment Status:
            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              userProfile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {userProfile.status}
            </span>
          </p>
        </DashboardCard>

        <DashboardCard title="Employment Details" className="p-6">
          <p className="text-gray-700 mb-2 flex items-center"><span className="font-semibold mr-2"><FiCalendar /></span> Start Date: {userProfile.startDate}</p>
          <p className="text-gray-700 flex items-center"><span className="font-semibold mr-2"><FiBriefcase /></span> Manager: David Green</p>
        </DashboardCard>
      </div>

      <DashboardCard title="About Me" className="p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          {userProfile.bio}
        </p>
      </DashboardCard>

      <DashboardCard title="Skills" className="p-6">
        <div className="flex flex-wrap gap-2">
          {userProfile.skills.map((skill, index) => (
            <span key={index} className="bg-rose-100 text-rose-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
}

export default Profile;