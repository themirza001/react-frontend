import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = () => {
    fetch("http://localhost:8081/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = () => {
    if (!name || !email) return;

    fetch("http://localhost:8081/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setEmail("");
        fetchUsers();
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User's Management
        </h2>

        {/* Create User */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={createUser}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* User List */}
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          User List
        </h3>

        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {users.map(user => (
            <li
              key={user.id}
              className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg hover:bg-gray-100"
            >
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
