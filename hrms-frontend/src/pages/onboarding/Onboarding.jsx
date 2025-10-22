import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { FiUserPlus, FiCheckSquare, FiClipboard, FiList, FiFileText, FiX, FiUpload, FiTrash2 } from 'react-icons/fi';

function Onboarding({ sidebarItems }) {
  // Enhanced newHires data with checklist and documents
  const [newHires, setNewHires] = useState([
    {
      id: 1,
      name: 'Grace Hopper',
      position: 'Data Scientist',
      status: 'Pending Tasks',
      startDate: '2025-07-01',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-06-20', comments: 'Done via email' },
        { id: 2, task: 'Upload ID proof', completed: false, due: '2025-06-25', comments: '' },
        { id: 3, task: 'Complete orientation', completed: false, due: '2025-07-02', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'pending', url: '#' },
      ],
    },
    {
      id: 2,
      name: 'Alan Turing',
      position: 'Machine Learning Engineer',
      status: 'Completed',
      startDate: '2025-06-15',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-06-01', comments: '' },
        { id: 2, task: 'Upload ID proof', completed: true, due: '2025-06-05', comments: '' },
        { id: 3, task: 'Complete orientation', completed: true, due: '2025-06-16', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'verified', url: '#' },
      ],
    },
    {
      id: 3,
      name: 'Ada Lovelace',
      position: 'Software Developer',
      status: 'Pending Documents',
      startDate: '2025-07-10',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-06-28', comments: '' },
        { id: 2, task: 'Upload ID proof', completed: false, due: '2025-07-05', comments: '' },
        { id: 3, task: 'Complete orientation', completed: false, due: '2025-07-11', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'pending', url: '#' },
      ],
    },
    {
      id: 4,
      name: 'Linus Torvalds',
      position: 'Kernel Developer',
      status: 'Completed',
      startDate: '2025-06-01',
      checklist: [
        { id: 1, task: 'Sign offer letter', completed: true, due: '2025-05-20', comments: '' },
        { id: 2, task: 'Upload ID proof', completed: true, due: '2025-05-25', comments: '' },
        { id: 3, task: 'Complete orientation', completed: true, due: '2025-06-02', comments: '' },
      ],
      documents: [
        { id: 1, type: 'ID Proof', name: 'ID Proof.pdf', status: 'verified', url: '#' },
      ],
    },
  ]);

  const [selectedHire, setSelectedHire] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newTaskType, setNewTaskType] = useState("");
  const [newDocType, setNewDocType] = useState("");

  // Helper function for status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending Tasks': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Documents': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Progress calculation
  const getProgress = (hire) => {
    const total = hire.checklist.length;
    const completed = hire.checklist.filter(t => t.completed).length;
    return total ? Math.round((completed / total) * 100) : 0;
  };

  // Checklist toggle
  const toggleTask = (hireId, taskId) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === hireId
        ? { ...hire, checklist: hire.checklist.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ) }
        : hire
    ));
  };

  // Update comment
  const updateComment = (hireId, taskId, comment) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === hireId
        ? { ...hire, checklist: hire.checklist.map(task =>
            task.id === taskId ? { ...task, comments: comment } : task
          ) }
        : hire
    ));
  };

  // Add checklist task
  const addTask = () => {
    if (!newTask.trim()) return;
    setNewHires(prev => prev.map(hire =>
      hire.id === selectedHire.id
        ? { ...hire, checklist: [...hire.checklist, { id: Date.now(), task: newTask, completed: false, due: newTaskDue, comments: '' }] }
        : hire
    ));
    setNewTask("");
    setNewTaskDue("");
  };

  // Remove checklist task
  const removeTask = (taskId) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === selectedHire.id
        ? { ...hire, checklist: hire.checklist.filter(task => task.id !== taskId) }
        : hire
    ));
  };

  // Document upload (mock, supports type)
  const handleUpload = (e, hireId) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewHires(prev => prev.map(hire =>
      hire.id === hireId
        ? { ...hire, documents: [...hire.documents, { id: Date.now(), type: newDocType || 'Other', name: file.name, status: 'pending', url: '#' }] }
        : hire
    ));
    setNewDocType("");
  };

  // Approve/Reject document
  const updateDocStatus = (docId, status) => {
    setNewHires(prev => prev.map(hire =>
      hire.id === selectedHire.id
        ? { ...hire, documents: hire.documents.map(doc =>
            doc.id === docId ? { ...doc, status } : doc
          ) }
        : hire
    ));
  };

  // Modal open/close
  const openModal = (hire) => {
    setSelectedHire(hire);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedHire(null);
    setNewTask("");
    setNewTaskDue("");
    setNewDocType("");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex items-center justify-start text-gray-800 mb-8 ml-2">
        <FiUserPlus className="text-4xl mr-4 text-purple-600 drop-shadow-md" />
        <h2 className="text-3xl font-extrabold tracking-tight">New Hire Onboarding</h2>
      </div>
      <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto text-center">
        Streamline the onboarding process for new hires, ensuring all tasks, documents, and introductions are completed smoothly.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <DashboardCard className="p-6 rounded-2xl shadow-md bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-semibold">Upcoming Hires</p>
              <h2 className="text-3xl font-bold text-purple-800">{newHires.length}</h2>
            </div>
            <FiUserPlus className="text-purple-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6 rounded-2xl shadow-md bg-gradient-to-br from-pink-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-semibold">Pending Checklists</p>
              <h2 className="text-3xl font-bold text-pink-800">{newHires.reduce((acc, h) => acc + h.checklist.filter(t => !t.completed).length, 0)}</h2>
            </div>
            <FiClipboard className="text-pink-400 text-4xl" />
          </div>
        </DashboardCard>
        <DashboardCard className="p-6 rounded-2xl shadow-md bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Onboarding Completed (This Month)</p>
              <h2 className="text-3xl font-bold text-indigo-800">{newHires.filter(h => h.status === 'Completed').length}</h2>
            </div>
            <FiCheckSquare className="text-indigo-400 text-4xl" />
          </div>
        </DashboardCard>
      </div>
      <DashboardCard title="New Hires Progress" className="p-4 overflow-x-auto rounded-2xl shadow-md">
        <div className="custom-table-container">
          <table className="custom-table min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {newHires.map((hire) => (
                <tr key={hire.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{hire.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{hire.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{hire.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(hire.status)}`}>{hire.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full transition-all duration-300" style={{ width: `${getProgress(hire)}%` }}></div>
                    </div>
                    <span className="ml-2 text-xs font-semibold text-gray-700">{getProgress(hire)}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-pink-600 hover:text-pink-900 mr-4 transition-colors flex items-center" onClick={() => openModal(hire)}>
                      <FiList className="mr-1" /> View Checklist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Checklist & Document Modal */}
      {showModal && selectedHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in border border-gray-100">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={closeModal}>
              <FiX size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-pink-600">
              <FiList className="mr-2 text-pink-500" /> {selectedHire.name}'s Checklist
            </h3>
            <ul className="mb-6 space-y-2">
              {selectedHire.checklist.map(item => (
                <li key={item.id} className="flex items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                  <input type="checkbox" checked={item.completed} onChange={() => toggleTask(selectedHire.id, item.id)} className="mr-2 accent-pink-500" />
                  <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.task}</span>
                  <span className="ml-2 text-xs text-gray-500">Due: {item.due}</span>
                  <input type="text" value={item.comments} onChange={e => updateComment(selectedHire.id, item.id, e.target.value)} placeholder="Add comment" className="ml-2 border rounded px-2 py-1 text-xs" />
                  <button onClick={() => removeTask(item.id)} className="ml-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
                </li>
              ))}
            </ul>
            <div className="flex mt-2 mb-6 gap-2">
              <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New task" className="border rounded px-2 py-1 text-xs flex-1" />
              <input type="date" value={newTaskDue} onChange={e => setNewTaskDue(e.target.value)} className="border rounded px-2 py-1 text-xs" />
              <button onClick={addTask} className="bg-pink-500 text-white px-3 py-1 rounded text-xs">Add</button>
            </div>
            <h4 className="text-lg font-semibold mb-2 flex items-center text-indigo-600">
              <FiFileText className="mr-2 text-indigo-500" /> Documents
            </h4>
            <ul className="mb-4 space-y-1">
              {selectedHire.documents.map(doc => (
                <li key={doc.id} className="flex items-center bg-gray-50 rounded px-2 py-1">
                  <span className="text-xs text-gray-500 mr-2">[{doc.type}]</span>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-2 text-sm">{doc.name}</a>
                  <span className={`badge badge-${doc.status} text-xs px-2 py-1 rounded-full mr-2 ${doc.status === 'verified' ? 'bg-green-100 text-green-800' : doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{doc.status}</span>
                  <button onClick={() => updateDocStatus(doc.id, 'verified')} className="text-green-600 ml-2 hover:underline">Approve</button>
                  <button onClick={() => updateDocStatus(doc.id, 'rejected')} className="text-red-600 ml-2 hover:underline">Reject</button>
                </li>
              ))}
            </ul>
            <div className="flex items-center mb-2 gap-2">
              <input type="text" value={newDocType} onChange={e => setNewDocType(e.target.value)} placeholder="Document type (e.g., ID Proof, Offer Letter)" className="border rounded px-2 py-1 text-xs flex-1" />
              <label className="flex items-center cursor-pointer">
                <FiUpload className="mr-2 text-gray-500" />
                <input type="file" className="hidden" onChange={e => handleUpload(e, selectedHire.id)} />
                <span className="text-sm text-gray-700">Upload</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Onboarding;