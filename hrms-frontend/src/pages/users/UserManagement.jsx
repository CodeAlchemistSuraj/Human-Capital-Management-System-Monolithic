import { useState, useEffect } from 'react'
import axios from 'axios'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ username: '', password: '', role: 'EMPLOYEE' })
  const [editingUsername, setEditingUsername] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    } catch (err) {
      setError('Failed to fetch users')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUsername) {
        await axios.put(`/api/users/${editingUsername}`, form)
      } else {
        await axios.post('/api/users', form)
      }
      fetchUsers()
      resetForm()
    } catch (err) {
      setError(editingUsername ? 'Failed to update user' : 'Failed to create user')
    }
  }

  const handleEdit = (user) => {
    setForm({ username: user.username, password: '', role: user.role })
    setEditingUsername(user.username)
  }

  const handleDelete = async (username) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${username}`)
        fetchUsers()
      } catch (err) {
        setError('Failed to delete user')
      }
    }
  }

  const resetForm = () => {
    setForm({ username: '', password: '', role: 'EMPLOYEE' })
    setEditingUsername(null)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingUsername ? 'Edit User' : 'Add User'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={editingUsername}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!editingUsername}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">Role</label>
            <select
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="HR">HR</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingUsername ? 'Update' : 'Create'}
            </button>
            {editingUsername && (
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users List</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Username</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username} className="border-t">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="mr-2 text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.username)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement