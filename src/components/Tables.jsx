import React, { useState } from 'react';

const tableData = [
  { id: '1', name: 'John', email: 'john121@gmail.com', role: 'Admin1', status: 'Active' },
  { id: '2', name: 'Smith', email: 'smith57@gmail.com', role: 'User', status: 'Inactive' },
  { id: '3', name: 'Rohit', email: 'rohit090@gmail.com', role: 'User', status: 'Busy' },
  { id: '4', name: 'Virat', email: 'virat18@gamil.com', role: 'Moderator', status: 'Active' },
  { id: '5', name: 'Anandi', email: 'anandi123@gmail.com', role: 'User', status: 'Active' },
  { id: '6', name: 'Amit', email: 'amit.kumar@gmail.com', role: 'Admin2', status: 'Inactive' },
  { id: '7', name: 'Neha', email: 'neha.verma@gmail.com', role: 'User', status: 'Active' },
  { id: '8', name: 'Raj', email: 'raj.malhotra@gmail.com', role: 'User', status: 'Inactive' },
  { id: '9', name: 'Sneha', email: 'sneha.mishra@gmail.com', role: 'Moderator', status: 'Active' },
  { id: '10', name: 'Rohit', email: 'Rohit.singh@gmail.com', role: 'User', status: 'Active' },
  { id: '11', name: 'Priya', email: 'priya.sharma@gmail.com', role: 'User', status: 'Inactive' },
  { id: '12', name: 'Rahul', email: 'rahul.patil@gmail.com', role: 'Admin3', status: 'Active' },
  { id: '13', name: 'Pooja', email: 'pooja.rana@gmail.com', role: 'User', status: 'Active' },
  { id: '14', name: 'Suyash', email: 'suyash.nair@gmail.com', role: 'User', status: 'Busy' },
  { id: '15', name: 'Divya', email: 'divya.kapoor@gmail.com', role: 'Moderator', status: 'Active' },
];


const Tables = () => {
  const [search, setSearch] = useState('');
  const filtered = tableData.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    d.role.toLowerCase().includes(search.toLowerCase()) ||
    d.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg" aria-label="Users table with search" role="region">
      <h2 className="text-2xl font-bold text-purple-600 dark:text-teal-400 mb-4">Users Table</h2>
      <input
        type="search"
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search users in table"
        className="mb-4 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-purple-600 dark:text-teal-400">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.status}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 dark:text-gray-400 py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Tables;
